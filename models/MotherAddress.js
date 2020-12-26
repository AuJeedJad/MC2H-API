module.exports = (sequelize, DataTypes) => {
  const MotherAddress = sequelize.define(
    'MotherAddress',
    {
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      road: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
    },
    {
      tableName: 'mother_addresses',
      timestamps: false,
    }
  );

  MotherAddress.associate = (models) => {
    MotherAddress.belongsTo(models.MotherProfile, { foreignKey: 'motherId', allowNull: true });
  };

  return MotherAddress;
};
