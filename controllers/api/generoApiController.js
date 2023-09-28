const { generos, canciones } = require('../../database/models');

// Obtener todos los géneros con sus canciones
async function getGeneros(req, res) {
    try {
        const generosConCanciones = await generos.findAll({
            include: [{
                model: canciones,
                attributes: {
                    exclude: ["duracion", "genero_id", "album_id", "artista_id"]
                },
            }],


        });

        res.json({
            generos: generosConCanciones,
        });
    } catch (error) {
        console.error('Error al obtener géneros con canciones:', error);
        res.status(500).json({
            error: 'Ha ocurrido un error al obtener géneros con canciones',
        });
    }
}

// Obtener genero por id
async function getGeneroId(req, res) {
    const { id } = req.params;
    try {
        const genero = await generos.findByPk(id, {
            include: [{
                model: canciones,
                attributes: {
                    exclude: ["duracion", "genero_id", "album_id", "artista_id"]
                },
            }],
        });

        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        const cancionesDelGenero = genero.canciones;

        res.json({
            genero: genero.nombre,
            canciones: cancionesDelGenero,
        });
    } catch (error) {
        console.error('Error al obtener canciones por género:', error);
        res.status(500).json({
            error: 'Ha ocurrido un error al obtener canciones por género',
        });
    }
}



module.exports = {
    getGeneros,
    getGeneroId,
};
