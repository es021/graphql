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
        var sql = QueueQuery.getByStudentIdStatus(student_id,status);
        return DB.con.query(sql).then(function (res) {
            return res;
        });
    }
}

QueueExec = new QueueExec();
module.exports = {QueueType, QueueExec};


