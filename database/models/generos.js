module.exports = (sequelize, DataTypes) => {
    const alias = 'generos';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING, // O el tipo de dato que estés usando
            allowNull: false,
            unique: true, // Esto asegura que los nombres de género sean únicos
        },
    };
    const config = {
        tableName: 'generos',
        timestamps: false
    };

    const generos = sequelize.define(alias, cols, config);

    generos.associate = (models) => {
        generos.hasMany(models.canciones, { foreignKey: 'genero_id' });
    };

    return generos;
};
