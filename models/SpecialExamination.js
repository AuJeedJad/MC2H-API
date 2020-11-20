module.exports = (sequelize, DataTypes) => {
    const specialExamination = sequelize.define(
      'SpecialExamination',
      {
        examination: {
          type: DataTypes.STRING,
          allowNull: false
        },
        result: {
          type: DataTypes.STRING
        },
      },
      {
        tableName: 'special_examinations',
        timestamps: true,
        createAt: 'examDate',
        updateAt: 'lastEdit',
      }
    );
  
    return specialExamination;
  };
  