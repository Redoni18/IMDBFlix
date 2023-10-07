import { PrismaClient } from "@prisma/client";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../type/User";

const prisma = new PrismaClient();

type RegisterErrorsResponse = {
  field: string;
  message: string;
};

type UserResponse = {
  errors?: RegisterErrorsResponse[];
  user?: RegisterResponse | LoginResponse;
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
            field: "Username",
            message: "Username length must be greater than 2",
          },
        ],
      };
    }

    if (body.email.length <= 4) {
      return {
        errors: [
          {
            field: "Email",
            message: "Email length must be greater than 4 characters",
          },
        ],
      };
    } else {
      if (!emailRegex.test(body.email)) {
        return {
          errors: [
            {
              field: "Email",
              message: "Please type a valid email",
            },
          ],
        };
      }
    }

    if (body.password.length <= 8) {
      return {
        errors: [
          {
            field: "Password",
            message: "Password length must be greater than 8",
          },
        ],
      };
    }

    const role = body.email.includes("@imdb") ? 'ADMIN' : 'USER';

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        type: role
      },
    });

    const simplifiedUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        type: newUser.type,
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


export async function loginUser(
    request: LoginRequest
): Promise<UserResponse> {
    try {
        const { body } = request

        const currentUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if(!currentUser) {
            return {
                errors: [{
                    field: "Email",
                    message: "Email does not exist",
                }],
            }
        }

        const userWithoutPassword = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            type: currentUser.type,
        };

        const validPassword = await Bun.password.verify(body.password, currentUser.password)

        if(!validPassword) {
            return {
                errors: [{
                    field: "Password",
                    message: "Password is incorrect"
                }]
            }
        }

        return {
            user: {
                status: 200,
                body: userWithoutPassword
            }
        }
    } catch (error) {
        return {
            user: {
                status: 500,
                body: {error: "Internal Server Error"}
            }
        }
    }
}