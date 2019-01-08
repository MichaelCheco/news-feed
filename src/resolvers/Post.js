const Post = {
  author: ({ id }, args, ctx) => {
    return ctx.prisma.post({ id }).author();
  },
  comments: ({ id }, args, ctx) => {
    return ctx.prisma.post({ id }).comments();
  }
};

module.exports = {
  Post
};
