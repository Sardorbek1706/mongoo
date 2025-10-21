import Customer from '../models/Customer.js';

export const createCustomer = async (req, res) => {
  try {
    const c = new Customer(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('region');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('region');
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Customer not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const removed = await Customer.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
