const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { saveContact } = require('../helpers/validateContact');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         favoriteColor:
 *           type: string
 *           example: Blue
 *         birthday:
 *           type: string
 *           format: date
 *           example: 1990-01-01
 */

/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: API for managing contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Retrieve all contacts
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags: [Contacts]
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Validation error
 */
router.post('/', saveContact, contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     tags: [Contacts]
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Contact not found
 */
router.put('/:id', saveContact, contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;