const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Post } = require('./Post')
const { User } = require('./User')
const { Subscription } = require('./Subscription')
const { Comment } = require('./Comment')

const resolvers = {
    Query,
    Mutation,
    Post,
    User,
    Subscription,
    // Comment
}

module.exports = {
    resolvers
}