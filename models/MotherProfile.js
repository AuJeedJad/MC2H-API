module.exports = (sequelize, DataTypes) => {
  const MotherProfile = sequelize.define(
    'MotherProfile',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCard: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      email: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'mother_profiles',
      timestamps: true,
    }
  );

  MotherProfile.associate = (models) => {
    MotherProfile.hasOne(models.MotherAddress, { foreignKey: 'motherId' });
    MotherProfile.hasOne(models.MotherMedicalHistory, { foreignKey: 'motherId' });
    MotherProfile.hasMany(models.PregnantHistory, { foreignKey: 'motherId' });
    MotherProfile.hasMany(models.CurrentPregnancy, { foreignKey: 'motherId' });
  };

  return MotherProfile;
};
