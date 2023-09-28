const express = require('express');
const generoController = require('../../controllers/api/generoApiController');

const router = express.Router();

// Ruta para obtener todos los géneros con sus canciones
router.get('/', generoController.getGeneros);

// Ruta para obtener todas las canciones de un género específico
router.get('/:id', generoController.getGeneroId);


module.exports = router;
