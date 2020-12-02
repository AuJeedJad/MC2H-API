module.exports = (sequelize, DataTypes) => {
  const inactiveDate = new Date();
  inactiveDate.setDate(inactiveDate.getDate() + 330);

  const CurrentPregnancy = sequelize.define(
    'CurrentPregnancy',
    {
      dateByUltrasound: {
        type: DataTypes.DATEONLY,
      },
      dateByLMP: {
        type: DataTypes.DATEONLY,
      },
      dateByPV: {
        type: DataTypes.DATEONLY,
      },
      dateByUtSize: {
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
      beforePregWeight: {
        type: DataTypes.DOUBLE,
      },
      beforePregHeight: {
        type: DataTypes.DOUBLE,
      },
      downsyndromeScreen: {
        type: DataTypes.BOOLEAN,
      },
      riskEvaluate: {
        type: DataTypes.ENUM(['Low', 'High']),
      },
      amniocentesis: {
        type: DataTypes.STRING,
      },
      otherLabResult: {
        type: DataTypes.STRING,
      },
      coupleCounselingDate1: {
        type: DataTypes.DATEONLY,
      },
      coupleCounselingDate2: {
        type: DataTypes.DATEONLY,
      },
      parentSchoolDate1: {
        type: DataTypes.DATEONLY,
      },
      parentSchoolDate2: {
        type: DataTypes.DATEONLY,
      },
      inactiveDate: {
        type: DataTypes.DATEONLY,
        defaultValue: inactiveDate,
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'current_pregnancies',
      timestamps: true,
    }
  );

  CurrentPregnancy.associate = (models) => {
    CurrentPregnancy.belongsTo(models.FatherProfile, { foreignKey: 'fatherId' });
    CurrentPregnancy.belongsTo(models.MotherProfile, { foreignKey: 'motherId', allowNull: false });
    CurrentPregnancy.hasOne(models.Contraception, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasOne(models.DentalExam, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasOne(models.PregnantHistory, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasOne(models.Vaccine, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasMany(models.ANC, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasMany(models.LabResult, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasMany(models.RiskEvaluation, { foreignKey: 'curPregId' });
    CurrentPregnancy.hasMany(models.BabyKicking, { foreignKey: 'curPregId' });
  };

  return CurrentPregnancy;
};
