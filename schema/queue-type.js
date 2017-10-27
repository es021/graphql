const DB = require('../model/DB.js');

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
    getByStudent(id, status) {
        var sql = `select * from in_queues q where q.student_id = ${id}`;
        return DB.con.query(sql).then(function (res) {
            return res;
        });
    }
}

QueueExec = new QueueExec();
module.exports = {QueueType, QueueExec};


