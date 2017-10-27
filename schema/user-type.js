const DB = require('../model/DB.js');
const UserQuery = require('../model/user-query.js');
const {QueueType, QueueExec} = require('./queue-type.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
            ID: {type: GraphQLInt},
            user_email: {type: GraphQLString},
            first_name: {type: GraphQLString},
            last_name: {type: GraphQLString},
            queues: {type: new GraphQLList(QueueType)},
            role: {type: GraphQLString}
        })
});


class UserExec {
    user(id) {
        var sql = UserQuery.getUser(id);
        return DB.con.query(sql).then(function (res) {
            var user_id = res[0]["ID"];
            res[0]["queues"] = QueueExec.getByStudent(user_id);
            return res[0];
        });
    }

    users(role) {
        var sql = UserQuery.getUser(undefined,role);
        
        return DB.con.query(sql).then(function (res) {

            for (var i in res) {
                var user_id = res[i]["ID"];
                res[i]["queues"] = QueueExec.getByStudent(user_id);
            }

            return res;
        });
    }
}

UserExec = new UserExec();

module.exports = {UserType, UserExec};


