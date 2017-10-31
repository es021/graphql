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
            role: {type: GraphQLString},
            company_id: {type: GraphQLInt},
            company: {type: CompanyType}
        })
});

const QueueType = new GraphQLObjectType({
    name: 'Queue',
    fields: () => ({
            ID: {type: GraphQLInt},
            student_id: {type: GraphQLInt},
            student: {type: UserType},
            company_id: {type: GraphQLInt},
            status: {type: GraphQLString},
            created_at: {type: GraphQLString}
        })
});

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


module.exports = {UserType
    , CompanyType
    , QueueType
};