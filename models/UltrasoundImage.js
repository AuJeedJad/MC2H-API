module.exports = (sequelize, DataTypes) => {
  const UltrasoundImage = sequelize.define(
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
      createdAt: 'examDate',
      updatedAt: false,
    }
  );

  UltrasoundImage.associate = (models) => {
    UltrasoundImage.belongsTo(models.UltrasoundResult, { foreignKey: 'usResultId' });
  };

  return UltrasoundImage;
};
