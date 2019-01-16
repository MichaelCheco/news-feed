const User = {
    posts: ({ id }, args, ctx) => {
      return ctx.prisma.user({ id }).posts()
    },   
    // friends: ({ id }, args, ctx) => {
    //   return ctx.prisma.user({ id }).friends()
    // }
    // comments: ({ id }, args, ctx) => {
    //   return ctx.prisma.user({ id }).comments()
    // }
  }
  
  module.exports = {
    User,
  }