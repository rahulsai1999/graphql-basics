import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET, getUserId } from "../utils";

const signup = (parent, args, context, info) => {
  const password = bcrypt.hash(args.password, 10);
  const user = context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return { token, user };
};

const login = (parent, args, context, info) => {
  const user = context.prisma.user({ email: args.email });
  if (!user) console.log("No such user found");
  const valid = bcrypt.compare(args.password, user.password);
  if (!valid) console.log("Invalid password");
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const post = (parent, args, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
};

export { signup, login, post };
