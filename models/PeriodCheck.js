module.exports = (sequelize, DataTypes) => {
    const periodCheck = sequelize.define(
      'PeriodCheck',
      {
        plan: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: 'period_checks',
        timestamps: false,
      }
    );
  
    return periodCheck;
  };
  