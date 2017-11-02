'use strict';

//import all type
const {UserType
    , CompanyType
    , QueueType
} = require('./all-type.js');

//import all action for type
const {UserExec} = require('../model/user-query.js');
const {QueueExec} = require('../model/queue-query.js');
const {CompanyExec} = require('../model/company-query.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');



//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                ID: {type: GraphQLInt}
            },
            resolve(parentValue, arg) {
                return UserExec.user(arg);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                role: {type: GraphQLString},
                page: {type: GraphQLInt},
                offset: {type: GraphQLInt}
            },
            resolve(parentValue, arg) {
                return UserExec.users(arg);
            }
        },
        queues: {
            type: new GraphQLList(QueueType),
            args: {
                student_id: {type: GraphQLInt},
                status: {type: GraphQLString}
            },
            resolve(parentValue, arg) {
                return QueueExec.queues(arg);
            }
        },
        company: {
            type: CompanyType,
            args: {
                ID: {type: GraphQLInt}
            },
            resolve(parentValue, arg) {
                return CompanyExec.company(arg.ID);
            }
        },
        companies: {
            type: new GraphQLList(CompanyType),
            args: {
                type: {type: GraphQLInt}
            },
            resolve(parentValue, arg) {
                return CompanyExec.companies(arg.type);
            }
        }

    }
});

/*
 //Mutations
 const mutation = new GraphQLObjectType({
 name: "Mutation",
 fields: {
 addCustomer: {
 type: CustomerType,
 args: {
 name: {type: new GraphQLNonNull(GraphQLString)},
 email: {type: new GraphQLNonNull(GraphQLString)},
 age: {type: new GraphQLNonNull(GraphQLInt)}
 },
 resolve(parentValue, args) {
 return axios.post(jsonServer + "/customers", {
 name: args.name,
 email: args.email,
 age: args.age
 }).then(res => res.data);
 }
 },
 editCustomer: {
 type: CustomerType,
 args: {
 id: {type: new GraphQLNonNull(GraphQLString)},
 name: {type: GraphQLString},
 email: {type: GraphQLString},
 age: {type: GraphQLInt}
 },
 resolve(parentValue, args) {
 return axios.patch(jsonServer + "/customers/" + args.id, args)
 .then(res => res.data);
 }
 },
 deleteCustomer: {
 type: CustomerType,
 args: {
 id: {type: new GraphQLNonNull(GraphQLString)}
 },
 resolve(parentValue, args) {
 return axios.delete(jsonServer + "/customers/" + args.id).then(res => res.data);
 }
 }
 }
 });
 */


//exports.. not export
module.exports = new GraphQLSchema({
    query: RootQuery
            //,mutation: mutation
});