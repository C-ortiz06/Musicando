let { canciones, artistas, albumes, generos } = require("../../database/models");

async function toltalCanciones(req, res) {
  try {
    const cancionesConNombres = await canciones.findAll({
      include: [
        { model: artistas},
        { model: albumes },
        { model: generos},
      ],
    });

    const response = {
      count: cancionesConNombres.length,
      canciones: cancionesConNombres.map((cancion) => ({
        id: cancion.id,
        titulo: cancion.titulo,
        duracion: cancion.duracion,
        genero: cancion.genero.name, 
        album: cancion.albume.nombre, 
        artista: `${cancion.artista.nombre} ${cancion.artista.apellido}`, 
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error al obtener todas las canciones:", error);

    res.status(500).json({
      error: "Ha ocurrido un error al obtener todas las canciones",
    });
  }
}

async function cancionesId(req, res) {
  const { id } = req.params; 
  try {
    const cancion = await canciones.findByPk(id, {
      include: [
        { model: artistas, attributes: ["nombre", "apellido"] },
        { model: albumes, attributes: ["nombre"] },
        { model: generos, attributes: ["name"] },
      ],
    });

    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    // Construye la respuesta JSON
    const response = {
      id: cancion.id,
      titulo: cancion.titulo,
      duracion: cancion.duracion,
      genero: cancion.genero.name, 
      album: cancion.albume.nombre, 
      artista: `${cancion.artista.nombre} ${cancion.artista.apellido}`, 
    };

    res.json(response);
  } catch (error) {
    console.error("Error al obtener la canción por ID:", error);
    res.status(500).json({
      error: "Ha ocurrido un error al obtener la canción por ID",
    });
  }
}

module.exports = {
  toltalCanciones,
  cancionesId,
};
