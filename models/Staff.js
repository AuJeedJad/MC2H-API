module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    'Staff',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'staffs',
      timestamps: true,
    }
  );

  Staff.associate = (models) => {
    Staff.belongsTo(models.Hospital, { foreignKey: 'hospitalId' });
  };

  return Staff;
};
