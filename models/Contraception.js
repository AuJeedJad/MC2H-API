module.exports = (sequelize, DataTypes) => {
  const Contraception = sequelize.define('Contraception', {
    contraMethod: {
      type: DataTypes.STRING
    },
    contraYear: {
      type: DataTypes.INTEGER(4)
    },
    contraMonth: {
      type: DataTypes.ENUM(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])
    },
    stopContraYear: {
      type: DataTypes.INTEGER(4)
    },
    stopContraMonth: {
      type: DataTypes.INTEGER(2)
    },
    isRegularMensPeriod: {
      type: DataTypes.BOOLEAN
    },
    mensInterval: {
      type: DataTypes.INTEGER
    }

  }, {
    tableName: 'contraception',
    timestamps: true
  });

  return Contraception;
};