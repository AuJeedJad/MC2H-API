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

  DrugAllergy.association = (models) => {
    DrugAllergy.belongsTo(models.MotherMedicalHistory, { foreignKey: 'motherMedHistoryId' });
  };

  return DrugAllergy;
};
