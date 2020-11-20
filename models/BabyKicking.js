module.exports = (sequelize, DataTypes) => {
  const BabyKicking = sequelize.define(
    'BabyKicking',
    {
      date: {
        type: DataTypes.DATEONLY,
      },
      count: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'baby_kickings',
      timestamps: false,
    }
  );
  return BabyKicking;
};
