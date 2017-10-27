const DB = require('../model/DB.js');
const CompanyQuery = require('../model/company-query');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
            ID: {type: GraphQLInt},
            name: {type: GraphQLString},
            tagline: {type: GraphQLString},
            img_url: {type: GraphQLString},
            img_size: {type: GraphQLString},
            img_position: {type: GraphQLString}
        })
});

class CompanyExec {
    getCompanyHelper(type, params) {
        var isSingle = (type === "single");
        var sql = "";
        if (isSingle) {
            sql = CompanyQuery.getById(params.id);
        } else {
            sql = CompanyQuery.getAll(params.type);
        }

        return DB.con.query(sql).then(function (res) {

            if (type === "single") {
                return res[0];
            } else {
                return res;
            }
        });
    }

    company(id) {
        return this.getCompanyHelper("single", {id: id});

    }

    companies(type) {
        return this.getCompanyHelper(false, {type: type});
    }
}

CompanyExec = new CompanyExec();
module.exports = {CompanyType, CompanyExec};


