/**
 * Created by Administrator on 2017/12/19 0019.
 */
var { sequelize } = require("../config/db");
var user = sequelize.import('../models/users');

// 添加用户
/*var saveUser = {
    user_name:'admin2',
    password:'666',
    indentity:1
};
*/
user.findAll({
    where:{
        user_name:{
            $like:'%admin%'
        }
    }
}).then(function(result){
    console.log('query all users');
    for (var i = 0, usr; usr = result[i++];) {
        console.log('nae=' + usr.user_name + ', password=' + usr.password + ', mail=' + usr.indentity);
    }
});
var saveUser = {
    password:'66655',
    indentity:2
};
user.update({
    password:'66655',
    indentity:2
},{
    where:{
        user_name:'admin2'
    }
}).then(function(result){
    console.log('updated user');
    console.log(result);
});