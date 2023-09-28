function validateCancionData(data) {
    const { titulo, duracion, genero, nombreArtista, apellidoArtista, album } = data;

    const errors = [];

    if (!titulo) {
        errors.push('El título es obligatorio');
    }

    if (!duracion) {
        errors.push('La duración es obligatoria');
    } else if (isNaN(parseInt(duracion))) {
        errors.push('La duración debe ser un número válido');
    }

    if (!genero) {
        errors.push('El género es obligatorio');
    }

    if (!nombreArtista || !apellidoArtista) {
        errors.push('El nombre y apellido del artista son obligatorios');
    }

    if (!album) {
        errors.push('El nombre del álbum es obligatorio');
    }

    return errors;
}

module.exports = {
    validateCancionData,
};
