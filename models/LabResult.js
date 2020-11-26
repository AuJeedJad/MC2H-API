module.exports = (sequelize, DataTypes) => {
  const LabResult = sequelize.define(
    'LabResult',
    {
      bloodGroup: {
        type: DataTypes.STRING,
      },
      hctHb: {
        type: DataTypes.STRING,
      },
      ofMcvMch: {
        type: DataTypes.STRING,
      },
      dcip: {
        type: DataTypes.STRING,
      },
      hbTyping: {
        type: DataTypes.STRING,
      },
      pcr: {
        type: DataTypes.STRING,
      },
      hepatitisBVirus: {
        type: DataTypes.STRING,
      },
      syphilis: {
        type: DataTypes.STRING,
      },
      hiv: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(['mother', 'father']),
      },
    },
    {
      tableName: 'lab_results',
      timestamps: true,
    }
  );

  LabResult.associate = (models) => {
    LabResult.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId', allowNull: false });
  };

  return LabResult;
};
