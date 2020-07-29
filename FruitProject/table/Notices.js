

const Sequelize = require('sequelize');

var Notices = {

    _noticeTable:null,

    init(sequelize){
        this._noticeTable = sequelize.define("DSNotices", {

            noticeTitle: Sequelize.STRING,
            noticeDes: Sequelize.STRING,
            noticeUrl: Sequelize.STRING,
        });
    },

    findData(response){
        let table = this._noticeTable;
        let tableInfoInfoArr = [];

        (async () => {
            let tableInfo = await table.findAll();

            for(let i = 0 ; i < tableInfo.length ; i++){
                tableInfoInfoArr.push(tableInfo[i].dataValues);
            }

            let noticesData = {};
            if(tableInfoInfoArr.length > 0){
                noticesData.status = 1;
            }else {
                noticesData.status = 0;
            }
            noticesData.data = tableInfoInfoArr;

            response.end(JSON.stringify(noticesData));

        })();
    },

};

module.exports = Notices;