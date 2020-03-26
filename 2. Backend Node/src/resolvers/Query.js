const feed = (parent, args, context, info) => {
  return context.prisma.links();
};

export { feed };
