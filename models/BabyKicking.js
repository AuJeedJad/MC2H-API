module.exports = (sequelize, DataTypes) => {
  const Babykicking = sequelize.defind(
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
  return Babykicking;
};
