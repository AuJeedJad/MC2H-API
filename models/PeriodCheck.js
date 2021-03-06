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
    PeriodCheck.belongsTo(models.StaticPeriodCheck, { foreignKey: 'staticPeriodCheckId', allowNull: false });
  };

  return PeriodCheck;
};
