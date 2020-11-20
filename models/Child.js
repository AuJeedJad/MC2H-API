module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define(
    'Child',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      idCard: {
        type: DataTypes.INTEGER(13),
      },
    },
    {
      tableName: 'childs',
      timestamps: true,
    }
  );

  Child.associate = (models) => {
    Child.hasMany(models.PregnantHistory, { foreignKey: 'childId' });
    Child.belongsTo(models.FatherProfile, { foreignKey: 'fatherId' });
    Child.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId' });
  };

  return Child;
};
