const User = {
    posts: ({ id }, args, ctx) => {
      return ctx.prisma.user({ id }).posts()
    },   
    comments: ({ id }, args, ctx) => {
      return ctx.prisma.user({ id }).comments()
    }
  }
  
  module.exports = {
    User,
  }