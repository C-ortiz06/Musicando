let {canciones } = require("../../database/models");

module.exports = {
  getAll: async (req, res) => {
    try {
      // Consulta la base de datos para obtener todas las canciones
       canciones = await canciones.findAll({
        raw: true,
      });

      // Construye la respuesta JSON
      const response = {
        count: canciones.length,
        canciones: canciones.map((cancion) => ({
          id: cancion.id,
          titulo: cancion.titulo,
          duracion: cancion.duracion,
          genero: cancion.genero_id,
          album: cancion.album_id,
          artista: cancion.artista_id,
        })),
      }; 

      // Envía la respuesta JSON
      res.json(response);
    } catch (error) {
      console.error("Error al obtener todas las canciones:", error);

      // Proporciona una respuesta de error más específica
      res.status(500).json({
        error: "Ha ocurrido un error al obtener todas las canciones",
      });
    }
  },
};