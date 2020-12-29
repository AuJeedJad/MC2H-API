module.exports = (sequelize, DataTypes) => {
  const DentalExam = sequelize.define(
    'DentalExam',
    {
      toothDecay: {
        type: DataTypes.INTEGER,
      },
      gingivitis: {
        type: DataTypes.BOOLEAN,
      },
      calculus: {
        type: DataTypes.BOOLEAN,
      },
      other: {
        type: DataTypes.STRING,
      },
      examBy: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'dental_exams',
      timestamps: false,
    }
  );

  DentalExam.associate = (models) => {
    DentalExam.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId', allowNull: false });
    DentalExam.hasMany(models.DentalAppointment, { foreignKey: 'dentalExamId' });
    DentalExam.hasOne(models.DentalCare, { foreignKey: 'dentalExamId' });
  };

  return DentalExam;
};
