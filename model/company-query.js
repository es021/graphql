const DB = require('./DB.js');
const {QueueQuery} = require('./queue-query.js');
const {PrescreenQuery} = require('./prescreen-query.js');

class CompanyQuery {
    constructor() {
        this.TB = "companies";
        this.ID = "ID";
        this.TYPE = "TYPE";

        this.TYPE_GOLD = 1;
        this.TYPE_SILVER = 2;
        this.TYPE_BRONZE = 3;
        this.TYPE_NORMAL = 4;
    }

    getById(id) {
        return `select * from ${this.TB} where ${this.ID} = ${id}`;
    }

    getAll(params) {
        var type_where = (typeof params.type === "undefined") ? "1=1" : `${this.TYPE} LIKE '%${params.type}%'`;
        return `select * from ${this.TB} where 1=1 and ${type_where}`;
    }
}
CompanyQuery = new CompanyQuery();


class CompanyExec {
    getCompanyHelper(type, params) {

        const {QueueExec} = require('./queue-query.js');
        const {PrescreenExec} = require('./prescreen-query.js');

        var isSingle = (type === "single");
        var sql = "";
        if (isSingle) {
            sql = CompanyQuery.getById(params.id);
        } else {
            sql = CompanyQuery.getAll(params);
        }

        return DB.con.query(sql).then(function (res) {

            for (var i in res) {

                var company_id = res[i]["ID"];
                
                res[i]["active_queues"] = QueueExec.queues({
                    company_id: company_id
                    , status: QueueQuery.STATUS_QUEUING
                    , order_by: `${QueueQuery.CREATED_AT} DESC`
                }, ["company"]);

                res[i]["active_prescreens"] = PrescreenExec.prescreens({
                    company_id: company_id
                    , status: PrescreenQuery.STATUS_APPROVED
                    , order_by: `${PrescreenQuery.CREATED_AT} DESC`
                }, ["company"]);

            }

            if (type === "single") {
                return res[0];
            } else {
                return res;
            }
        });
    }

    company(id) {
        return this.getCompanyHelper("single", {id: id});

    }

    companies(type) {
        return this.getCompanyHelper(false, {type: type});
    }
}
CompanyExec = new CompanyExec();

module.exports = {CompanyExec, CompanyQuery};
