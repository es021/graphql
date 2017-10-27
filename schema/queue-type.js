const DB = require('../model/DB.js');
const QueueQuery = require('../model/queue-query');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const QueueType = new GraphQLObjectType({
    name: 'Queue',
    fields: () => ({
            ID: {type: GraphQLInt},
            company_id: {type: GraphQLInt},
            status: {type: GraphQLString},
            created_at: {type: GraphQLString}
        })
});

class QueueExec {
    
    queues(student_id, status = '') {
        
        
        const {UserExec} = require('./user-type.js');
        UserExec.setFrom("queues");

        var sql = QueueQuery.getByStudentIdStatus(student_id, status);
        return DB.con.query(sql).then(function (res) {
            for (var i in res) {
                var student_id = res[i]["student_id"];
                res[i]["student"] = UserExec.user(student_id);
            }

            return res;
        });
    }
}

QueueExec = new QueueExec();
module.exports = {QueueType, QueueExec};


