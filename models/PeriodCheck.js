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

  return PeriodCheck;
};
