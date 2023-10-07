import { PrismaClient } from "@prisma/client";
import { RegisterRequest, RegisterResponse } from "../type/User";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

type RegisterErrorsResponse = {
  field: string;
  message: string;
};

type UserResponse = {
  errors?: RegisterErrorsResponse[];
  user?: RegisterResponse;
};

export async function createUser(
  request: RegisterRequest
): Promise<UserResponse> {
  try {
    const { body } = request;
    const hashedPassword = await Bun.password.hash(body.password);

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (body.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "username length must be greater than 2",
          },
        ],
      };
    }

    if (body.email.length <= 4) {
      return {
        errors: [
          {
            field: "email",
            message: "email length must be greater than 4 characters",
          },
        ],
      };
    } else {
      if (!emailRegex.test(body.email)) {
        return {
          errors: [
            {
              field: "email",
              message: "please type a valid email",
            },
          ],
        };
      }
    }

    if (body.password.length <= 8) {
      return {
        errors: [
          {
            field: "username",
            message: "password length must be greater than 8",
          },
        ],
      };
    }

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });

    const simplifiedUser = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    };

    return {
      user: {
        status: 201,
        body: simplifiedUser,
      },
    };
  } catch (error) {
    return {
      user: {
        status: 500,
        body: { error: "Internal Server Error" },
      },
    };
  }
}
