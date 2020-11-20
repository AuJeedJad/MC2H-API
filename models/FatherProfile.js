module.exports = (sequelize, DataTypes) => {
  const FatherProfile = sequelize.define('FatherProfile', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    idCard: {
      type: DataTypes.INTEGER(13)
    },
    birthDate: {
      type: DataTypes.DATEONLY
    },
    email: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.INTEGER(10)
    }
  }, {
    tableName: 'father_profiles',
    timestamps: true
  });

  FatherProfile.associate = models => {
    FatherProfile.hasOne(models.Child, { foreignKey: 'fatherId' });
  }

  return FatherProfile;
};