
/*
微信sdk调用
 */

const APPID = "wxc51c06438fce4cb4";
const SECRET = "e2fdb5175ec18157e6524fe2926ae031";

var WXSDK = {

    login(code,response){
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response = xhr.responseText;

                let resData = JSON.parse(response.data);

                let loginData = {};
                loginData.status        = 1;
                loginData.openid        = resData.openid;           //用户唯一标示码
                loginData.session_key   = resData.session_key;      //回话id
                loginData.unionid       = resData.unionid;          //平台唯一id
                response.end(JSON.stringify(loginData) );

            }else{

                let loginData = {};
                loginData.status        = 0;
                response.end(JSON.stringify(loginData) );
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
};

module.exports = WXSDK;