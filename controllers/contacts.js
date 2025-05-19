const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('Contacts').find();
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('Contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
      if (contacts.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDatabase().collection('Contacts').insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDatabase().collection('Contacts').replaceOne({ _id: contactId }, contact);

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Contacto actualizado exitosamente' });
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('Contacts').deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Contacto eliminado exitosamente' });
      
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};