module.exports = (sequelize, DataTypes) => {
    const MotherAddress = sequelize.define('MotherAddress', {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        subDistrict: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        district: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        zipCode: {
            type: DataTypes.STRING(5),
            allowNull: false,
        }
    },
    {
        tableName: 'mother_addresses',
        timestamps: true,
    });

    return MotherAddress;
}