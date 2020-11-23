module.exports = (sequelize, DataTypes) => {
  const RiskEvaluation = sequelize.define(
    'RiskEvaluation',
    {
      isCheck: {
        type: DataTypes.BOOLEAN,
      },
      examBy: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'risk_evaluations',
      timestamps: true,
      createdAt: 'examDate',
      updatedAt: false,
    }
  );

  RiskEvaluation.associate = (models) => {
    RiskEvaluation.hasMany(models.StaticRiskEvaluation, { foreignKey: 'riskEvaId' });
    RiskEvaluation.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId' });
  };

  return RiskEvaluation;
};
