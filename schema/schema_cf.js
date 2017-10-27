//const axios = require('axios');
//const jsonServer = "http://localhost:3000";
var DB = require('../model/DB.js');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
            ID: {type: GraphQLInt},
            user_login: {type: GraphQLString},
            user_email: {type: GraphQLString}
        })
});


function dbSuccessHandler(res) {
    console.log(res[0]);
    console.log();

    for (var i in res) {

    }
    return res[0];
}

function dbErrorHandler(err) {
    console.log(err);
    return err;

}

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                ID: {type: GraphQLInt}
            },
            //resolve the response
            resolve(parentValue, args) {
                var sql = "SELECT * FROM wp_cf_users WHERE ID = " + args.ID;
                return DB.con.query(sql).then(res => res[0]);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                var sql = "SELECT * FROM wp_cf_users";
                return DB.con.query(sql).then(res => res);
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