const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const Mutation = {
  signup: async (parent, { name, email, password }, ctx) => {
    const hashedPassword = await hash(password, 10);
    const user = await ctx.prisma.createUser({
      name,
      email,
      password: hashedPassword
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },
  login: async (parent, { email, password }, ctx) => {
      const user = await ctx.prisma.user({ email });
      if(!user) {
          throw new Error(`No user with email:${email}`)
      }
      const validPassword = await compare(password, user.password)
      if(!validPassword) {
          throw new Error('Invalid password')
      }
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user
      }
  }
};

module.exports = {
    Mutation
}
