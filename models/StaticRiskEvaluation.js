module.exports = (sequelize, DataTypes) => {
  const StaticRiskEvaluation = sequelize.define(
    'StaticRiskEvaluation',
    {
      checkList: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'static_risk_evaluations',
      timestamps: false,
    }
  );

  StaticRiskEvaluation.associate = (models) => {
    StaticRiskEvaluation.belongsTo(models.RiskEvaluation);
  };

  return StaticRiskEvaluation;
};
