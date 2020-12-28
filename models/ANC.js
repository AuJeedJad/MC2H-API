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
        type: DataTypes.INTEGER,
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
      isChecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'ancs',
      timestamps: true,
      createdAt: 'examDate',
      updatedAt: 'lastEdit',
    }
  );

  ANC.associate = (models) => {
    ANC.belongsTo(models.CurrentPregnancy, {
      foreignKey: { name: 'curPregId', allowNull: false },
      onDelete: 'CASCADE',
    });
    ANC.belongsTo(models.Hospital, { foreignKey: { name: 'checkHospitalId', allowNull: false }, onDelete: 'CASCADE' });
    ANC.belongsTo(models.Hospital, { foreignKey: { name: 'nextHospitalId', allowNull: false }, onDelete: 'CASCADE' });
    ANC.hasMany(models.UltrasoundResult, { foreignKey: 'ancId' });
    ANC.hasMany(models.PeriodCheck, { foreignKey: 'ancId' });
    ANC.hasMany(models.SpecialExamination, { foreignKey: 'ancId' });
  };

  return ANC;
};
