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
        type: DataTypes.STRING(13),
      },
    },
    {
      tableName: 'childs',
      timestamps: true,
    }
  );

  Child.associate = (models) => {
    Child.belongsTo(models.PregnantHistory, { foreignKey: 'pregHistoryId', allowNull: false });
  };

  return Child;
};
