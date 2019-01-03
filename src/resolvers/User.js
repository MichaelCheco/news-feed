const User = {
    posts: ({ id }, args, ctx) => {
      return ctx.prisma.user({ id }).posts()
    },   
  }
  
  module.exports = {
    User,
  }