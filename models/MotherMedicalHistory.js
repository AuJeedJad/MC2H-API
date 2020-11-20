module.exports = (sequelize, DataTypes) => {
    const MotherMedicalHistory = sequelize.define('MotherMedicalHistory', {
        isDiabetes: {
            type: DataTypes.BOOLEAN,
        }
        isHypertension: {
            type: DataTypes.BOOLEAN,
        }
        isHeartDisease: {
            type: DataTypes.BOOLEAN,
        }
        isThyroid: {
            type: DataTypes.BOOLEAN,
        }
        isAnemia: {
            type: DataTypes.BOOLEAN,
        }
        otherDisease: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: 'mother_medical_histories',
        timestamps: true,
    });

    MotherMedicalHistory.association = models => {
        MotherMedicalHistory.belongsTo(models.MotherProfile, {foreignKey: "motherId"});
    }

    return MotherMedicalHistory;
}