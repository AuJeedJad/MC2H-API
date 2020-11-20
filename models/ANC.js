module.exports = (sequelize, DataTypes) => {
  const ANC = sequelize.define(
    'ANC',
    {
      weight: {
        type: DataTypes.INTEGER,
      },
      urineTest: {
        type: DataTypes.STRING,
      },
      bloodPressure: {
        type: DataTypes.STRING,
      },
      uterusSize: {
        type: DataTypes.STRING,
      },
      childPosture: {
        type: DataTypes.STRING,
      },
      heartSound: {
        type: DataTypes.STRING,
      },
      childMove: {
        type: DataTypes.STRING,
      },
      gaByLmp: {
        type: DataTypes.INTEGER,
      },
      gaByUs: {
        type: DataTypes.INTEGER,
      },
      physicalExamination: {
        type: DataTypes.STRING,
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
      },
      examBy: {
        type: DataTypes.STRING,
      },
      nutritionEvaResult: {
        type: DataTypes.ENUM('ปรกติ', 'ผิดปรกติ', 'การรักษาเพิ่มเติม', 'ภาวะเครียด'),
      },
      nippleExam: {
        type: DataTypes.ENUM('ปรกติ', 'สั้น', 'บุ๋ม', 'บอด'),
      },
    },
    {
      tableName: 'ancs',
      timestamps: true,
      createAt: 'examDate',
      updateAt: 'lastEdit',
    }
  );

  ANC.associate = (models) => {
    ANC.hasMany(models.UltrasoundResult, { foreignKey: 'ancId' });
    ANC.hasMany(models.PeriodCheck, { foreignKey: 'ancId' });
    ANC.hasMany(models.SpecialExamination, { foreignKey: 'ancId' });
    ANC.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId' });
    ANC.belongsTo(models.Hospital, { foreignKey: 'checkHospitalId' });
    ANC.belongsTo(models.Hospital, { foreignKey: 'nextHospitalId' });
  };

  return ANC;
};
