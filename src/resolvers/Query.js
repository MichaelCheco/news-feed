const { getUserId } = require('../utils')

const Query = {
    me: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user({ id: userId})
    },
    feed: (parent, args, ctx) => {
        return ctx.prisma.posts()
    }
}

module.exports = {
    Query
}