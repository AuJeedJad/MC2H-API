module.exports = (sequelize, DataTypes) => {
  const Riskevaluation = sequelize.define(
    'RiskEvaluation',
    {
      isCheck: {
        type: DataTypes.BOOLEAN,
      },
      name: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'risk_evaluations',
      timestamps: false,
    }
  );

  RiskEvaluation.associate = (models) => {
    RiskEvaluation.hasMany(models.Staticriskevalution);
  };

  return Riskevaluation;
};
