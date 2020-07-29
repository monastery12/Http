
//数据库表
const Goods     = require("./table/Goods");
const Infos     = require("./table/Infos");
const Order     = require("./table/Orders");
const ShopCars  = require("./table/ShopCars");
const Notices   = require("./table/Notices");

//微信sdk
const WXSDK     = require("./WXSDK");

const ResponseManager = {

    _goodsInfo:"goods",
    _register:"register",
    _order:"order",
    _orderAll:"orderAll",
    _login:"login",
    _buy:"buy",
    _carInfo:"carInfo",
    _addCar:"addCar",
    _wxLogin:"wxLogin",
    _goodsInfoDetail:"goodsInfoDetail",
    _notice:"notices",
    
    checkType(res,response){

        if(!res || !res.type){
            response.end("0");
        }

        let type = res.type;

        //获取物品信息
        if(type == this._goodsInfo){
            Goods.findData(null,null,response);
        }

        //注册账号
        else if(type == this._register){

            let userName = res.userName;
            let userAccount = res.userAccount;
            let userPassword = res.userPassword;
            let userAddress = res.userAddress;

            Infos.registerInfo(userName,userAccount,userPassword,userAddress,response);
        }

        //获取指定账户订单
        else if(type == this._order){

            let orderPhone = res.orderPhone;
            Order.findData(orderPhone,response);
        }

        //获取指定数量订单
        else if(type == this._orderAll){
            let num = res.num;
            Order.findAllData(num,response);
        }

        //登陆
        else if(type == this._login){

            let userAccount = res.userAccount;
            let userPassword = res.userPassword;
            Infos.checkLogin(userAccount,userPassword,response);
        }

        //购买物品，生成订单
        else if(type == this._buy){

            let orderName = res.orderName;
            let orderNum = parseInt(res.orderNum) ;
            let orderGoods = res.orderGoods ;
            let orderPhone = res.orderPhone ;
            let orderDes = res.orderDes;
            let orderAddress = res.orderAddress;
            let orderCode = res.orderCode;
            Order.addDataOrder(orderName,orderNum,orderGoods,orderPhone,orderDes,orderAddress,orderCode,response);
        }

        //获取购物车信息
        else if(type == this._carInfo){

            let shopUserAccount = res.shopUserAccount;
            ShopCars.findData(shopUserAccount,response);
        }

        //添加购物车数据
        else if(type == this._addCar){

            let shopGoodsName = res.shopGoodsName;
            let shopGoodsCode = res.shopGoodsCode;
            let shopGoodsNum = res.shopGoodsNum;
            let shopUserName = res.shopUserName;
            let shopUserAccount = res.shopUserAccount;
            let shopGoodsUrl = res.shopGoodsUrl;
            let shopGoodsPrice = res.shopGoodsPrice;

            ShopCars.changeData(shopGoodsName,shopGoodsCode,shopGoodsNum,shopUserName,shopUserAccount,shopGoodsUrl,shopGoodsPrice,response);
        }

        //公告
        else if(type == this._notice ){
            Notices.findData(response);
        }

        //微信登陆
        else if(type == this._wxLogin){
            let code = res.code;
            WXSDK.login(code,response);
        }

        //根据code查询商品
        else if(type == this._goodsInfoDetail){
            let goodsCode = res.goodsCode;
            Goods.findDataByCode(goodsCode,response);
        }

        else {
            response.end({state:0});
        }

    },

}

module.exports = ResponseManager;