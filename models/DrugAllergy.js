module.exports = (sequelize, DataTypes) => {
  const DrugAllergy = sequelize.define(
    'DrugAllergy',
    {
      drugName: {
        type: DataTypes.STRING,
      },
      symptom: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'drug_allergies',
      timestamps: true,
    }
  );

  DrugAllergy.associate = (models) => {
    DrugAllergy.belongsTo(models.MotherMedicalHistory, { foreignKey: 'motherMedHistoryId', allowNull: false });
  };

  return DrugAllergy;
};
