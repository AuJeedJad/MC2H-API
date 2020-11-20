module.exports = (sequelize, DataTypes) => {
  const ultrasoundImage = sequelize.define(
    'UltrasoundImage',
    {
      ultrasoundImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'ultrasound_images',
      timestamps: true,
      createAt: 'examDate',
      updateAt: false,
    }
  );
  UltrasoundImage.associate = models => {
    UltrasoundImage.belongsTo(models.UltrasoundResult, { foreignKey: "usResultId" });
  };
  return ultrasoundImage;
};
