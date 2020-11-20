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
      tableName: 'drug_allergy',
      timestamps: true,
    }
  );

  DrugAllergy.association = (models) => {
    DrugAllergy.belongsTo(models.MotherMedicalHistory);
  };

  return DrugAllergy;
};
