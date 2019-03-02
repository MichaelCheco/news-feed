const Track = {
	posts: ({ id }, args, ctx) => {
		return ctx.prisma.track({ id }).tracks();
	},
	// friends: ({ id }, args, ctx) => {
	//   return ctx.prisma.user({ id }).friends()
	// }
	// comments: ({ id }, args, ctx) => {
	//   return ctx.prisma.user({ id }).comments()
	// }
};

module.exports = {
	Track,
};
