module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'staffs',
    allowNull: false,
    timestamps: true
  });

  return Staff;
}