import AddressModel from '../models/address.model.js';
import { ApiError } from '../helper/errorMessage.js';
export const AddressController = {
  getAll: async (req, res, next) => {
    try {
      const model = AddressModel;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const skip = (page - 1) * limit;
      const fields = Object.keys(model.schema.paths).filter(
        (f) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(f),
      );
      const query = search
        ? {
            $or: fields.map((field) => ({
              [field]: { $regex: search, $options: 'i' },
            })),
          }
        : {};
      if (req.user.role !== 'admin') {
        query.customer_id = req.user.id;
      }
      const [data, total] = await Promise.all([
        model
          .find({ ...query})
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        model.countDocuments(query),
      ]);
      return res.status(200).json({
        success: true,
        message: `RETRIEVED ALL DATA SUCCESSFULLY!`,
        data,
        total,
        limit,
        page,
      });
    } catch (error) {
      return next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const { id } = req.params;
      const data = await model.findOne({ _id: id, customer_id: req.user.id });
      if (!data) {
        return next(new ApiError(404, `NOT FOUND SUCH AN ID!`));
      }
      return res.status(200).json({
        success: true,
        message: `RETRIEVED ONE FROM DATA SUCCESSFULLY!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },

  createOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const body = req.validatedData;
      const data = await model.create(body);
      return res.status(201).json({
        success: true,
        message: `created succesfully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const { id } = req.params;
      const body = req.validatedData;
      const data = await model.findByIdAndUpdate(id, body, { new: true });
      if (!data) {
        return next(new ApiError(404, `not found such an id!`));
      }
      return res.status(200).json({
        success: true,
        message: `updated succesfully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const { id } = req.params;
      const data = await model.findByIdAndDelete({ _id: id });
      if (!data) {
        return next(new ApiError(404, `not found such an id!`));
      }
      return res.status(200).json({
        success: true,
        message: `deleted successfully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
};