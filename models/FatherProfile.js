module.exports = (sequelize, DataTypes) => {
  const FatherProfile = sequelize.define(
    'FatherProfile',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      idCard: {
        type: DataTypes.STRING(13),
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      email: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      tableName: 'father_profiles',
      timestamps: false,
    }
  );

  FatherProfile.associate = (models) => {
    FatherProfile.hasMany(models.CurrentPregnancy, { foreignKey: 'fatherId' });
  };

  return FatherProfile;
};
