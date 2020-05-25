
/*
快递查询
 */

const CONAME = "Xiao";

var PostModel = {

    getPostInfo(PostCompanyName,PostNum){

        if(!PostCompanyName || !PostNum){
            return ;
        }

        let url = "https://m.kuaidi100.com/app/query/?com="+PostCompanyName+"quanfengkuaidi&nu="+PostNum+"&coname="+CONAME;
    },
}

module.exports = PostModel;