/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('send_order', {
    send_id: {
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
      allowNull: false
    },
    start_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_phone: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    start_idcard: {
      type: DataTypes.STRING(250),
      allowNull: false
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
    order_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_pay: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    send_status: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    com_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    start_id: {
      type: DataTypes.INTEGER(50),
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    send_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'send_order'
  });
};
