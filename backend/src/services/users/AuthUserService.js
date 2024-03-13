import prismaClient from "../../prisma/index.js";
import { compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken/index.js";

class AuthUserService {
	async execute({ email, password }) {
		const { sign } = jsonwebtoken;
		const user = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new Error("Email/Password Incorreta!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email/Password Incorreta!");
		}

		const token = sign(
			{
				name: user.name,
				email: user.email,
				isAdmin: user.is_admin,
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: "30d",
			},
		);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token: token,
		};
	}
}

export { AuthUserService };
