var express = require('express');
var router = express.Router();
// var datatypes = require('DataTypes');
// var models = require("../models");
var http = require('http');
var { sequelize } = require("../config/db");
var user = sequelize.import('../models/users');
var send = sequelize.import('../models/send_order');
var get = sequelize.import('../models/get_order');
var storage = sequelize.import("../models/storage");
var company = sequelize.import("../models/company");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 注册
router.post('/user/add',function(req,res,next){
    var saveUser = {
        user_name:req.body.username,
        password:req.body.pwd,
        indentity:req.body.indentity,
        created_time:Date.now()
    };

    user.create(saveUser)
        .then(function(result){
            res.json('注册成功');
        }).catch(function(err){
            console.log("发生错误：" + err);
        });
});
// test
//
router.post('/user/query',function(req,res,next){
    user.findAll({

    })
        .then(function(result){
            res.json({
                'result':0,
                'msg':'创建成功',
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});

//登陆
router.post('/login',function(req,res){
        user.findOne({ where: { user_name: req.body.username } })
            .then(function(user){
                if (user.dataValues === null) { //username does not exist
                    res.json('用户不存在');
                    console.log('does not exist');
                } else if (user.dataValues.password === req.body.pwd) {
                    if(user.dataValues.indentity === 1){
                        res.json({
                            username: user.user_name,
                            'result':0,
                            'indentity':1
                        });
                    }else if(user.dataValues.indentity === 0){
                        res.json({
                            username: user.user_name,
                            'result':0,
                            'indentity':0
                        });
                    }
                } else {
                    res.json('密码错误');
                    console.log('password wrong');
                }
            }).catch(function(err){
            console.log("发生错误：" + err);
        });
});
//创建新的寄件单
router.post('/send/add',function(req,res,next){
    var sendOrder = {
        order_num:req.body.order_num,
        start_address:req.body.start_address,
        start_name:req.body.start_name,
        start_phone:req.body.start_phone,
        start_idcard:req.body.start_idcard,
        end_address:req.body.end_address,
        end_name:req.body.end_name,
        end_phone:req.body.end_phone,
        order_type:req.body.order_type,
        is_pay:req.body.is_pay,
        send_status:req.body.send_status,
        com_id:req.body.com_id,
        start_id:req.body.start_id,
        created_time:Date.now()
    };

    send.create(sendOrder)
        .then(function(result){
            res.json({
                'result':0,
                'msg':'创建成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
//获取所有寄件信息
router.post('/send/search',function(req,res,next){
    send.findAll({
        where:{
            start_name:{
                $like:'%'+req.body.name+'%'
            },
            start_phone:{
                $like:'%'+req.body.phone+'%'
            }
        }
    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
//获取所有寄件信息
router.post('/send/personal',function(req,res,next){
    send.findAll({
        where:{
            start_name:req.body.name
        }
    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/send/query',function(req,res){
    send.findAll({

    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/send/sign',function(req,res,next){
    send.update({
        send_status:1,
        send_time:Date.now(),
    },{
        where:{
            send_id:req.body.send_id,
        }
    }).then(function(result){
        res.json({
            'result':0,
            'msg':'寄件成功'});
    }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
//创建新的收件单
router.post('/get/add',function(req,res,next){
    var Order = {
        order_num:req.body.order_num,
        start_address:req.body.start_address,
        start_name:req.body.start_name,
        start_phone:req.body.start_phone,
        start_idcard:req.body.start_idcard,
        end_address:req.body.end_address,
        end_name:req.body.end_name,
        end_phone:req.body.end_phone,
        storage_id:req.body.storage_id,
        // get_time:req.body.get_time,
        get_status:req.body.get_status,
        com_id:req.body.com_id,
        created_time:Date.now()
    };

    get.create(Order)
        .then(function(result){
            res.json({
                'result':0,
                'msg':'创建成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/get/query',function(req,res,next){
    get.findAll({

    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/get/search',function(req,res,next){
    get.findAll({
        where:{
            end_name:{
                $like:'%'+req.body.name+'%'
            },
            end_phone:{
                $like:'%'+req.body.phone+'%'
            }
        }
    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/get/personal',function(req,res,next){
    get.findAll({
        where:{
            end_name:req.body.name
        }
    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
// 取件成功
router.post('/get/sign',function(req,res,next){
    get.update({
        get_status:1,
        get_time:Date.now(),
        storage_id:null
    },{
        where:{
            get_id:req.body.get_id,
        }
    }).then(function(result){
            res.json({
                'result':0,
                'msg':'签收成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
//创建新的货柜
router.post('/storage/add',function(req,res,next){
    var Order = {
        store_type:req.body.store_type,
        area_code:req.body.area_code,
        frame_number:req.body.frame_number,
        layer_number:req.body.layer_number,
        store_number:req.body.store_number,
        is_full:req.body.is_full
    };

    storage.create(Order)
        .then(function(result){
            res.json({
                'result':0,
                'msg':'创建成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
// 更新货柜
router.post('/storage/update',function(req,res,next){
    storage.update({
        store_type:req.body.store_type,
        area_code:req.body.area_code,
        frame_number:req.body.frame_number,
        layer_number:req.body.layer_number,
    },{
        where:{
            storage_id:req.body.storage_id,
        }
    }).then(function(result){
            res.json({
                'result':0,
                'msg':'更新成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/storage/query',function(req,res,next){
    storage.findAll({

    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
//更新公司信息

router.post('/company/update',function(req,res,next){
    company.update({
        com_name:req.body.com_name,
        com_phone:req.body.com_phone,
        com_time:req.body.com_time,
    },{
        where:{
            com_id:req.body.com_id,
        }
    }).then(function(result){
            res.json({
                'result':0,
                'msg':'更新成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
//创建新的快递公司信息

router.post('/company/add',function(req,res,next){
    var Order = {
        com_name:req.body.com_name,
        com_phone:req.body.com_phone,
        com_time:req.body.com_time,
    };

    company.create(Order)
        .then(function(result){
            res.json({
                'result':0,
                'msg':'创建成功'});
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
router.post('/company/query',function(req,res,next){
    company.findAll({

    })
        .then(function(result){
            res.json({
                'result':0,
                'data':result
            });
        }).catch(function(err){
        console.log("发生错误：" + err);
    });
});
module.exports = router;
