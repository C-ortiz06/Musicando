module.exports = (sequelize, DataType) => {
    const alias = 'artistas';

    const cols={
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false
        },
        apellido: {
            type: DataType.STRING,
            allowNull: false
        }
    }
    const config = {
        tableName: 'artistas',
        timestamps: false
    };
    const artistas = sequelize.define(alias,cols,config)

    artistas.associate = (models) => {
        artistas.hasMany(models.canciones, { foreignKey: 'artista_id' });
    };

    return artistas
}