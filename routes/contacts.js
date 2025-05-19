const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Obtener todos los contactos
 *     description: Retorna una lista de todos los contactos almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de contactos obtenida exitosamente
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Obtener un contacto por ID
 *     description: Retorna un contacto específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contacto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto encontrado exitosamente
 *       404:
 *         description: Contacto no encontrado
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Crear un nuevo contacto
 *     description: Crea un nuevo contacto con los datos enviados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Actualizar un contacto por ID
 *     description: Actualiza los datos de un contacto existente mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contacto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado exitosamente
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Eliminar un contacto por ID
 *     description: Elimina un contacto existente mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contacto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto eliminado exitosamente
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;