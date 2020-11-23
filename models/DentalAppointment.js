module.exports = (sequelize, DataTypes) => {
  const DentalAppointment = sequelize.define(
    'DentalAppointment',
    {
      date: {
        type: DataTypes.DATEONLY,
      },
      dentist: {
        type: DataTypes.STRING,
      },
      details: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'dental_appointment',
      timestamps: false,
    }
  );

  DentalAppointment.associate = (models) => {
    DentalAppointment.belongsTo(models.DentalExam, { foreignKey: 'dentalExamId' });
  };

  return DentalAppointment;
};
