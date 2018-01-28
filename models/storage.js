/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('storage', {
    storage_id: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    store_type: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    area_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    frame_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    layer_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    store_number: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    is_full: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'storage'
  });
};
