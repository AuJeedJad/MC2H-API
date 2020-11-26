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

  BabyKicking.associate = (models) => {
    BabyKicking.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId', allowNull: false });
  };

  return BabyKicking;
};
