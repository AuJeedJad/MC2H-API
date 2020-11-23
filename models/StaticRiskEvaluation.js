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
      tableName: 'static_risk_evalutions',
      timestamps: false,
    }
  );

  StaticRiskEvaluation.associate = (models) => {
    StaticRiskEvaluation.belongsTo(models.RiskEvaluation, { foreignKey: 'riskEvaId' });
  };

  return StaticRiskEvaluation;
};
