const DB = require('../model/DB.js');
const UserQuery = require('../model/user-query.js');
//const {QueueType, QueueExec} = require('./queue-type.js');
const {QueueExec} = require('./queue-type.js');
const {CompanyType, CompanyExec} = require('./company-type.js');

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
            //queues: {type: new GraphQLList(QueueType)},
            role: {type: GraphQLString},
            company_id: {type: GraphQLInt},
            company: {type: CompanyType}
        })
});


class UserExec {
    
    //to avoid recursive
    setFrom(from) {
        this.from = from;
    }

    getUserHelper(type, params) {
        var obj = this;
        
        
        var isSingle = (type === "single");
        var sql = "";
        if (isSingle) {
            sql = UserQuery.getUser(params.id);
        } else {
            sql = UserQuery.getUser(undefined, params.role);
        }

        return DB.con.query(sql).then(function (res) {
            for (var i in res) {

                if (obj.from !== "queues") {
                    var user_id = res[i]["ID"];
                    res[i]["queues"] = QueueExec.queues(user_id);
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
    }

    user(id) {
        return this.getUserHelper("single", {id: id});
    }

    users(role) {
        return this.getUserHelper(false, {role: role});
    }
}

UserExec = new UserExec();

module.exports = {UserType, UserExec};


