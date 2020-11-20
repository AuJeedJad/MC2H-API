module.exports = (sequelize, DataTypes) => {
  const CurrentPregnancy = sequelize.define(
    'CurrentPregnancy',
    {
      dateByUltrasound: {
        type: DataTypes.DATEONLY,
      },
      dataByLMP: {
        type: DataTypes.DATEONLY,
      },
      dateBuPV: {
        type: DataTypes.DATEONLY,
      },
      correctedBy: {
        type: DataTypes.ENUM(['LMP', 'PV', 'Ut Size', 'U/S']),
      },
      giveBirthAt: {
        type: DataTypes.STRING,
      },
      giveBirthBy: {
        type: DataTypes.ENUM(['แพทย์', 'พยาบาล', 'อื่นๆ']),
      },
      birthAtGA: {
        type: DataTypes.INTEGER,
      },
      deliveryMethod: {
        type: DataTypes.STRING,
      },
      complicationAtBirth: {
        type: DataTypes.BOOLEAN,
      },
      complicationAfterBirth: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'current_pregnancies',
      timestamps: true,
    }
  );

  CurrentPregnancy.associate = (models) => {
    CurrentPregnancy.hasMany(models.Child, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasOne(models.Contraception, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasMany(models.RiskEvaluation, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasMany(models.BabyKicking);
    CurrentPregnancy.hasOne(models.DentalExam);
  };

  return CurrentPregnancy;
};
