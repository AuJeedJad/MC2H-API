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
      tableName: 'cesarean_sections',
      timestamps: true,
    }
  );

  CesareanSection.associate = (models) => {
    CesareanSection.belongsTo(models.MotherMedicalHistory, { foreignKey: 'motherMedHistoryId', allowNull: false });
  };

  return CesareanSection;
};
