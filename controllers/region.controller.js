import Region from '../models/Region.js';

export const createRegion = async (req, res) => {
  try {
    const r = new Region(req.body);
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) return res.status(404).json({ message: 'Region not found' });
    res.json(region);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRegion = async (req, res) => {
  try {
    const updated = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Region not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRegion = async (req, res) => {
  try {
    const removed = await Region.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Region not found' });
    res.json({ message: 'Region deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
