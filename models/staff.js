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
    }
  }, {
    tableName: 'staffs',
    timestamps: true
  });

  return Staff;
}