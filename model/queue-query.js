const DB = require('./DB.js');

class QueueQuery {
    constructor() {
        this.STUDENT_ID = "student_id";
    }

    getByStudentIdStatus(student_id, status) {
        return `select * from in_queues q where q.student_id = ${student_id} and q.status like '%${status}%' `;
    }
}
QueueQuery = new QueueQuery();

class QueueExec {
    queues(student_id, status = '', discard = []) {
        var {UserExec} = require('./user-query.js');

        var sql = QueueQuery.getByStudentIdStatus(student_id, status);

        var toRet = DB.con.query(sql).then(function (res) {
            for (var i in res) {

                if (discard.indexOf("users") <= -1) {
                    var student_id = res[i]["student_id"];
                    res[i]["student"] = UserExec.user(student_id, undefined, ["queues"]);
                }
            }

            return res;
        });

        return toRet;
    }
}
QueueExec = new QueueExec();

module.exports = {QueueExec};


