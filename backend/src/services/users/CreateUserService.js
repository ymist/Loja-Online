import prismaClient from "../../prisma/index.js";
import { hash } from "bcrypt";

class CreateUserService {
	async execute({ name, email, password }) {
		if (!email) {
			return { error: "Insira um email correto" };
		}
		const emailAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});
		if (emailAlreadyExists) {
			return { error: "Este Email já está sendo utilizado." };
		}

		const passwordHash = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: passwordHash,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
		return { user };
	}
}

export { CreateUserService };
