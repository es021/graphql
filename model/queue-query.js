const DB = require('./DB.js');

class QueueQuery {
    constructor() {
        this.STUDENT_ID = "student_id";
    }

    getByStudentIdStatus(student_id, status) {
        var sid_condition = (typeof student_id === "undefined") ? "1=1" : `q.student_id = ${student_id}`;
        var status_condition = (typeof status === "undefined") ? "1=1" : `q.status like '%${status}%'`;
        return `select * from in_queues q where ${sid_condition} and ${status_condition}`;
        
    }
}
QueueQuery = new QueueQuery();

class QueueExec {
    
    queues(params, discard = []) {
        var {UserExec} = require('./user-query.js');

        var sql = QueueQuery.getByStudentIdStatus(params.student_id, params.status);
        var toRet = DB.con.query(sql).then(function (res) {
            for (var i in res) {

                if (discard.indexOf("users") <= -1) {
                    var student_id = res[i]["student_id"];
                    res[i]["student"] = UserExec.user({ID: student_id}, ["queues"]);
                }
            }

            return res;
        });

        return toRet;
    }
}
QueueExec = new QueueExec();

module.exports = {QueueExec};


