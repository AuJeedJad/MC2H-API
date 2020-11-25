module.exports = (sequelize, DataTypes) => {
  const StaticRiskEvaluation = sequelize.define(
    'StaticRiskEvaluation',
    {
      checkList: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(['History', 'Present', 'Medicine']),
      },
    },
    {
      tableName: 'static_risk_evaluations',
      timestamps: false,
    }
  );

  StaticRiskEvaluation.associate = (models) => {
    StaticRiskEvaluation.hasMany(models.RiskEvaluation, { foreignKey: 'staticRiskEvaId' });
  };

  return StaticRiskEvaluation;
};
