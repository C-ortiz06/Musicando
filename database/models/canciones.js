module.exports = (sequelize, DataTypes) => {
    const alias = 'canciones'; 

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genero_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        artista_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'canciones',
        timestamps: false
    };

    const canciones = sequelize.define(alias, cols, config);

    canciones.associate = (models) => {
        canciones.belongsTo(models.artistas, { foreignKey: 'artista_id' });
        canciones.belongsTo(models.albumes, { foreignKey: 'album_id' });
        canciones.belongsTo(models.generos, { foreignKey: 'genero_id' });
    }

    return canciones;
};
