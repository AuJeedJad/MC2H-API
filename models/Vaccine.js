module.exports = (sequelize, DataTypes) => {
  const Vaccine = sequelize.define(
    'Vaccine',
    {
      tetanusCountBefore: {
        type: DataTypes.INTERGER,
      },
      lastTetanusHxDate: {
        type: DataTypes.DATEONLY,
      },
      tetausDosePefered: {
        type: DataTypes.ENUM(['3Does', 'BootsDose', 'NoNeed']),
      },
      firstTetanusDate: {
        type: DataTypes.DATEONLY,
      },
      secondTetanusDate: {
        type: DataTypes.DATEONLY,
      },
      thirdTetanusDate: {
        type: DataTypes.DATEONLY,
      },
      influenzaDate: {
        type: DataTypes.DATEONLY,
      },
      firstTDPType: {
        type: DataTypes.ENUM(['TT', 'dT', 'Tdap']),
      },
      secondTDPType: {
        type: DataTypes.ENUM(['TT', 'dT', 'Tdap']),
      },
      thirdTDPType: {
        type: DataTypes.ENUM(['TT', 'dT', 'Tdap']),
      },
    },
    {
      tableName: 'vaccines',
    }
  );
  Vaccine.associate = (models) => {
    Vaccine.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId', allowNull: false });
  };
};
