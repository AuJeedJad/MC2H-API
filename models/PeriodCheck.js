module.exports = (sequelize, DataTypes) => {
    const periodCheck = sequelize.define(
      'PeriodCheck',
      {
        plan: {
          type: DataTypes.STRING,
        },
        isChecked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
      },
      {
        tableName: 'period_checks',
        timestamps: false,
      }
    );
  
    return periodCheck;
  };
  