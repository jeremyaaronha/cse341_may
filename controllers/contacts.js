const Contact = require('../models/contacts');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

const getSingle = async (req, res) => {
  const contactId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json({ id: savedContact._id, message: 'Contact created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create contact', details: err.message });
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update contact', details: err.message });
  }
};

const deleteContact = async (req, res) => {
  const contactId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};