module.exports = (sequelize, DataTypes) => {
  const Dantalexam = sequelize.define(
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
      tableName: 'dental_exam',
      timestamps: false,
    }
  );
  return Dantalexam;
};
