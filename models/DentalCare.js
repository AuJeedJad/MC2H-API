module.exports = (sequelize, DataTypes) => {
  const DentalCare = sequelize.define(
    'DentalCare',
    {
      isMouthCare: {
        type: DataTypes.BOOLEAN,
      },
      isBrushPractice: {
        type: DataTypes.BOOLEAN,
      },
      isDryedBrush: {
        type: DataTypes.BOOLEAN,
      },
      isFloss: {
        type: DataTypes.BOOLEAN,
      },
      other: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'dental_care',
      timestamps: false,
    }
  );

  DentalCare.associate = (models) => {
    DentalCare.belongsTo(models.DentalExam, { foreignKey: 'dentalExamId', allowNull: false });
  };

  return DentalCare;
};
