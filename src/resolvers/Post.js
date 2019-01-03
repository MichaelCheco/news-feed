const Post = {
    author: ({ id }, args, ctx) => {
        return ctx.prisma.post({ id }).author()
    }
}

module.exports = {
    Post
}