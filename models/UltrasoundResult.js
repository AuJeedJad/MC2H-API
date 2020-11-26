module.exports = (sequelize, DataTypes) => {
  const UltrasoundResult = sequelize.define(
    'UltrasoundResult',
    {
      BPD: {
        type: DataTypes.FLOAT,
      },
      FL: {
        type: DataTypes.FLOAT,
      },
      HC: {
        type: DataTypes.FLOAT,
      },
      AC: {
        type: DataTypes.FLOAT,
      },
      AFI: {
        type: DataTypes.FLOAT,
      },
      placenta: {
        type: DataTypes.STRING,
      },
      EFW: {
        type: DataTypes.INTEGER,
      },
      gestationalAge: {
        type: DataTypes.INTEGER,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
      },
      note: {
        type: DataTypes.STRING,
      },
      risk: {
        type: DataTypes.STRING,
      },
      examBy: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'ultrasound_results',
      timestamps: true,
      createdAt: 'examDate',
      updatedAt: 'lastEdit',
    }
  );

  UltrasoundResult.associate = (models) => {
    UltrasoundResult.belongsTo(models.ANC, { foreignKey: 'ancId', allowNull: false });
    UltrasoundResult.hasMany(models.UltrasoundImage, { foreignKey: 'usResultId' });
  };

  return UltrasoundResult;
};
