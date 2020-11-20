module.exports = (sequelize, DataTypes) => {
  const CesareanSection = sequelize.define(
    'CesareanSection',
    {
      year: {
        type: DataTypes.INTEGER(4),
      },
      hospital: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'cesarean_section',
      timestamps: true,
    }
  );

  CesareanSection.association = (models) => {
    CesareanSection.belongsTo(models.MotherMedicalHistory);
  };

  return CesareanSection;
};
