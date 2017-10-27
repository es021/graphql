//const axios = require('axios');
//const jsonServer = "http://localhost:3000";
'use strict';
var DB = require('../model/DB.js');
var UserQuery = require('../model/user-query.js');
const {UserType, UserExec} = require('./user-type.js');
var QueueType = require('./user-type.js');

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
               return UserExec.user(arg.ID);
            }   
        },
        users: {
            type: new GraphQLList(UserType),
            args: {
                role: {type: GraphQLString}
            },
            resolve(parentValue, arg) {
                return UserExec.users(arg.role);
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