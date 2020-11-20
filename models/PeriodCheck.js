module.exports = (sequelize, DataTypes) => {
  const PeriodCheck = sequelize.define(
    'PeriodCheck',
    {
      plan: {
        type: DataTypes.STRING,
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'period_checks',
      timestamps: false,
    }
  );
  PeriodCheck.associate = (models) => {
    PeriodCheck.belongsTo(models.ANC, { foreignKey: 'ancId' });
  };
  PeriodCheck.associate = (models) => {
    PeriodCheck.belongsTo(models.StaticPeriodCheck, { foreignKey: 'staticPeriodCheckId' });
  };

  return PeriodCheck;
};
