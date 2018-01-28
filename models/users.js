/* jshint indent: 2 */
module.exports = function(sequelize,DataTypes){
    var User = sequelize.define('user',{
        user_id: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        indentity: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        created_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id_crad: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
    },{
        //sequelize默认会自动为其添加 createdAt 和updatedAt
        timestamps: false,
        tableName: 'users'
    });
    return User;
};
exports.addUser =  function(userName) {
    return this.findAll({
        where:{
            name:{
                $like:'%'+userName+'%'
            }
        }
    })
};
//静态方法
const classMethods = {
    //根据id查询
    getUserById: function(id) {
        return this.findById(id);
    },
    //获取所有
    getUsers: function(options) {
        return this.findAll(options);
    },
    //根据id更新数据
    updateUserById: function(values, id) {
        return this.update(values, {
            where: {
                user_id: id
            }
        });
    },
    //根据id删除数据
    deleteById: function(id) {
        return this.destroy({
            where: {
                user_id: id
            }
        })
    },
};