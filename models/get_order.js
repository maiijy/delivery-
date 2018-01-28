/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('get_order', {
    get_id: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_num: {
      type: DataTypes.INTEGER(250),
      allowNull: false
    },
    start_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_phone: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    start_idcard: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    end_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    end_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    end_phone: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    storage_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    get_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    get_status: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    com_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'get_order'
  });
};
