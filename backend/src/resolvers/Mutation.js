const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const Mutation = {
	signup: async (parent, { name, email, password }, ctx) => {
		const hashedPassword = await hash(password, 10);
		const user = await ctx.prisma.createUser({
			name,
			email,
			password: hashedPassword,
		});
		return {
			token: sign({ userId: user.id }, APP_SECRET),
			user,
		};
	},
	login: async (parent, { email, password }, ctx) => {
		const user = await ctx.prisma.user({ email });
		if (!user) {
			throw new Error(`No user with email:${email}`);
		}
		const validPassword = await compare(password, user.password);
		if (!validPassword) {
			throw new Error('Invalid password');
		}
		return {
			token: sign({ userId: user.id }, APP_SECRET),
			user,
		};
	},
	createPost: async (parent, { title, content }, ctx) => {
		const userId = await getUserId(ctx);
		return ctx.prisma.createPost({
			title,
			content,
			author: { connect: { id: userId } },
		});
	},
	updatePost: async (parent, args, ctx) => {
		const updates = { ...args };
		delete updates.id;
		return ctx.prisma.updatePost({
			data: updates,
			where: { id: args.id },
		});
	},
	deletePost: async (parent, { id }, ctx) => {
		return ctx.prisma.deletePost({ id });
	},
	createTrack: async (parent, { name }, ctx) => {
		return ctx.prisma.createTrack({ name });
	},
	createModule: async (parent, args, ctx, info) => {
		return ctx.prisma.createModule({
			name: args.name,
			info: args.info,
			track: { connect: { id: args.id } },
		});
	},
};

module.exports = {
	Mutation,
};
