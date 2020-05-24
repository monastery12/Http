/*
用户信息表
 */
const Sequelize = require('sequelize');
var Infos = {

    _infoTable:null,

    init(sequelize){
        this._infoTable = sequelize.define("infos", {

            userName: Sequelize.STRING,
            userAccount: Sequelize.STRING,
            userPassword: Sequelize.STRING,
            userAddress: Sequelize.STRING,
        });
    },

    //检查登陆
    checkLogin(userAccount,userPassword,response){
        let table = this._infoTable;

        let limitObj = {};

        if(!userAccount || !userPassword){
            let loginData = {};
            loginData.status = 0 ;
            loginData.data = "login fail";
            response.end(JSON.stringify(loginData));
            return ;
        }

        limitObj.userAccount = userAccount;
        limitObj.userPassword = userPassword;

        (async () => {
            let tableInfo = await table.findAll({
                where: limitObj,
            });

            if(tableInfo.length > 0){
                let loginData = {};
                loginData.status = 1 ;
                loginData.data = "login sucess";
            }else {
                let loginData = {};
                loginData.status = 0 ;
                loginData.data = "login fail";
            }
        })();
    },

    //注册账号
    registerInfo(userName,userAccount,userPassword,userAddress,response){

        if(!userName || !userAccount || !userPassword || !userAddress){
            let registerData = {};
            registerData.status = 0 ;
            registerData.data = "register fail";
            return ;
        }

        let table = this._infoTable;

        table.create({
            userName:userName,
            userAccount:userAccount,
            userPassword:userPassword,
            userAddress:userAddress,
        }).then(function (p) {
            let registerData = {};
            registerData.status = 1 ;
            registerData.data = "register sucess";
        }).catch(function (err) {
            let registerData = {};
            registerData.status = 0 ;
            registerData.data = "register fail";
        });
    },

};

module.exports = Infos;