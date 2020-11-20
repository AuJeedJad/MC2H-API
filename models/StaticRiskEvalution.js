module.exports = (sequelize, DataTypes) => {
  const Staticriskevalution = sequelize.define(
    'StaticRiskEvalution',
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

  StaticRiskEvalution.associate = (models) => {
    Staticriskevalution.belongsTo(models.RiskEvaluation);
  };

  return Staticriskevalution;
};
