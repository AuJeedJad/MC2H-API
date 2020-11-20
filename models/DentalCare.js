module.exports = (sequelize, DataTypes) => {
  const Dentalcare = sequelize.define(
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
  return Dentalcare;
};
