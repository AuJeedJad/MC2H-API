module.exports = (sequelize, DataTypes) => {
    const StaticPeriodCheck = sequelize.define(
      'StaticPeriodCheck',
      {
        gestationalAge: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        checkList: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        tableName: 'static_period_checks',
        timestamps: false,
      }
    );
  
    return StaticPeriodCheck;
  };
  