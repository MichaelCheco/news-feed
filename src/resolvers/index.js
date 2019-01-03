const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Post } = require('./Post')
const { User } = require('./User')

const resolvers = {
    Query,
    Mutation,
    Post,
    User
}

module.exports = {
    resolvers
}