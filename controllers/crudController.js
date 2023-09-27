
const { canciones, artistas, albumes, generos } = require("../database/models");
const cancionesModel = require('../database/models/canciones');

// Muestra la lista de todas las canciones
async function obtenerCanciones(req, res) {
  try {
    const cancionesEncontradas = await canciones.findAll({
      include: [
        { model: artistas },
        { model: albumes },
        { model: generos },
      ],
    });
    res.render('crud', { canciones: cancionesEncontradas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al obtener las canciones' });
  }
}

// Renderiza la vista de crear
async function getCrear(req, res) {
  try {
    const generosList = await generos.findAll();
    const artistasList = await artistas.findAll();
    const albumesList = await albumes.findAll();
    res.render('crear.ejs', { title: 'Crear Nueva Canción', generos: generosList, artistas: artistasList, albumes: albumesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al obtener la vista de creación' });
  }
}

// funcion de crear
async function crearCancion(req, res) {
  const { titulo, duracion, artista, album, genero } = req.body;

  try {
    const artistaExistente = await artistas.findByPk(artista);
    const albumExistente = await albumes.findByPk(album);
    const generoExistente = await generos.findByPk(genero);

    if (!artistaExistente) {
      return res.status(404).json({
        message: 'No se encontró el artista especificado.',
      });
    }

    if (!generoExistente) {
      return res.status(404).json({
        message: 'No se encontró el género especificado.',
      });
    }

    const nuevaCancion = await canciones.create({
      titulo,
      duracion,
      artista_id: artista,
      album_id: album,
      genero_id: genero,
    });

    if (nuevaCancion) {
      return res.status(201).json({
        message: 'Canción creada correctamente',
        data: nuevaCancion,
      });
    } else {
      return res.status(500).json({
        message: 'No se pudo crear la canción. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  } catch (error) {
    console.error(error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'Ya existe una canción con ese título en el álbum especificado.',
      });
    }

    return res.status(500).json({
      message: 'Error al crear la canción',
      error: error.message,
    });
  }
}

async function editCancion(req, res) {
  try {
    const cancionId = req.params.id;

    const cancion = await canciones.findByPk(cancionId, {
      include: [{ model: artistas }],
    });

    if (!cancion) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    const generosList = await generos.findAll();
    const artistasList = await artistas.findAll();
    const albumesList = await albumes.findAll();
    res.render('editar', { title: 'Crear Nueva Canción', cancion, generos: generosList, artistas: artistasList, albumes: albumesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al cargar la canción para editar' });
  }
}

async function actCancion(req, res) {
  console.log(req.body); // Verifica qué valores se están recibiendo

  const newValues = {
    id: req.body.id,
    titulo: req.body.titulo,
    duracion: req.body.duracion,
    artista_id: req.body.artista,
    album_id: req.body.album,
    genero_id: req.body.genero,
  };


  try {
    await canciones.update(newValues, {
      where: {
        id: req.body.id
      }
    });

    res.redirect('/');
  } catch (error) {
    res.send('No se pudo actualizar!');
    console.log(error);
  }
}
async function deleteCancion(req, res) {
  try {
    const cancionId = req.params.id;

    // Busca la canción por su ID
    const cancion = await canciones.findByPk(cancionId);

    if (!cancion) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    // Elimina la canción
    await cancion.destroy();

    // Redirige o responde de acuerdo a tus necesidades
    res.redirect('/'); // Por ejemplo, redirige a la página principal
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar la canción' });
  }
}




module.exports = {
  obtenerCanciones,
  crearCancion,
  getCrear,
  editCancion,
  actCancion,
  deleteCancion
};