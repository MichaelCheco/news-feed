const { getUserId } = require("../utils");

const Query = {
  me: (parent, args, ctx) => {
    const userId = getUserId(ctx);
    return ctx.prisma.user({ id: userId });
  },
  users: (parent, args, ctx) => {
    return ctx.prisma.users();
  },
  feed: (parent, { skip, first }, ctx) => {
    return ctx.prisma.posts({
      skip,
      first
    });
  },
  post: (parent, { id }, ctx) => {
    return ctx.prisma.post({ id });
  },
  filterPosts: (parent, { searchString }, ctx) => {
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
    });
  },
  tracks: (parent, args, ctx)  => {
      return ctx.prisma.tracks()
  },
  track: (parent, { id }, ctx, info) => {
    return ctx.prisma.track({ id })
  }
};

module.exports = {
  Query
};
