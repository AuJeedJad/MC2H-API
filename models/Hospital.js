module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    'Hospital',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subDistrict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'hospitals',
      timestamps: false,
    }
  );

  Hospital.associate = (models) => {
    Hospital.hasMany(models.Staff, { foreignKey: 'hospitalId' });
    Hospital.hasMany(models.ANC, { foreignKey: 'checkHospitalId' });
    Hospital.hasMany(models.ANC, { foreignKey: 'nextHospitalId' });
  };

  return Hospital;
};
