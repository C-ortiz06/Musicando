module.exports = (sequelize, DataTypes) => {
    const alias = 'albumes';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'albumes',
        timestamps: false
    };

    const albumes = sequelize.define(alias, cols, config);

    albumes.associate = (models) => {
        albumes.hasMany(models.canciones, { foreignKey: 'album_id' });
    };

    return albumes;
};
