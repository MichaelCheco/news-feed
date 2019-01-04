const { getUserId } = require('../utils')

const Query = {
    me: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user({ id: userId})
    },
    users: (parent, args, ctx) => {
        return ctx.prisma.users()
    },
    feed: (parent, args, ctx) => {
        return ctx.prisma.posts()
    },
    filterPosts: (parent,{ searchString }, ctx) => {
        return ctx.prisma.posts({
            where: {
                OR: [
                    {
                        title_contains: searchString
                    },
                    {
                        content_contains: searchString
                    }
                ]
            }
        })
    }
}

module.exports = {
    Query
}