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
  }
};
