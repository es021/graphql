const DB = require('./DB.js');

class UserQuery {
    constructor() {
        this.FIRST_NAME = "first_name";
        this.LAST_NAME = "last_name";
        this.COMPANY_ID = "rec_company";
        this.ROLE = "wp_cf_capabilities";

        this.ROLE_STUDENT = "student";
    }

    selectRole(user_id, meta_key, as) {
        return `(select SUBSTRING_INDEX(SUBSTRING_INDEX((${this.selectMetaMain(user_id, meta_key)}),'\"',2),'\"',-1)) as ${as}`;
    }

    selectMetaMain(user_id, meta_key) {
        return `select m.meta_value from wp_cf_usermeta m where m.user_id = ${user_id} and m.meta_key = '${meta_key}'`;
    }

    selectMeta(user_id, meta_key, as) {
        as = (typeof as === "undefined") ? meta_key : as;

        if (meta_key === this.ROLE) {
            return this.selectRole(user_id, meta_key, as);
        }

        return `(${this.selectMetaMain(user_id, meta_key)}) as ${as}`;
    }

    getUser(id, role, page, offset) {
        var id_condition = (typeof id !== "undefined") ? `u.ID = ${id}` : `1=1`;
        var role_condition = (typeof role !== "undefined") ? `(${this.selectMetaMain("u.ID", this.ROLE)}) LIKE '%${role}%' ` : `1=1`;

        var limit = DB.prepareLimit(page, offset);

        var sql = `SELECT u.* 
           ,${this.selectMeta("u.ID", this.FIRST_NAME)}
           ,${this.selectMeta("u.ID", this.LAST_NAME)}
           ,${this.selectMeta("u.ID", this.ROLE, "role")}
           ,${this.selectMeta("u.ID", this.COMPANY_ID, "company_id")}
           FROM wp_cf_users u WHERE 1=1 AND ${id_condition} AND ${role_condition} ${limit}`;

        return sql;
    }
}
UserQuery = new UserQuery();


class UserExec {

    getUserHelper(type, params, discard = []) {

        const {CompanyExec} = require('./company-query.js');
        const {QueueExec} = require('./queue-query.js');

        var isSingle = (type === "single");
        var sql = "";
        if (isSingle) {
            sql = UserQuery.getUser(params.ID);
        } else {
            sql = UserQuery.getUser(undefined, params.role, params.page, params.offset);
        }

        var toRet = DB.con.query(sql).then(function (res) {
            for (var i in res) {
                if (discard.indexOf("users") <= -1) {
                    var user_id = res[i]["ID"];
                    res[i]["queues"] = QueueExec.queues({student_id: user_id}, ["users"]);
                }

                var company_id = res[i]["company_id"];
                res[i]["company"] = CompanyExec.company(company_id);
            }

            if (type === "single") {
                return res[0];
            } else {
                return res;
            }

        });

        return toRet;
    }

    user(params, discard) {
        return this.getUserHelper("single", params, discard);
    }

    users(params) {
        return this.getUserHelper(false, params);
    }
}
UserExec = new UserExec();

module.exports = {UserExec};