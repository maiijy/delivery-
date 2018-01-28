/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    com_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    com_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    com_phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    com_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'company'
  });
};
