
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env";
import {
  findUserByEmail,
  createUser,
} from "../persistence/users.repository";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let user;

try {
  user = await createUser(name, email, passwordHash);
} catch (error) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  ) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  throw error;
}

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}
