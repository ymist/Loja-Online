import prismaClient from "../../prisma/index.js";
import { hash } from "bcrypt";

class CreateAdminService {
	async execute({ name, email, password }) {
		if (!email) {
			throw new Error("Email Incorreto");
		}
		const emailAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});
		if (emailAlreadyExists) {
			throw new Error("Este email já está sendo utilizado!");
		}

		const passwordHash = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: passwordHash,
				is_admin: true,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
		console.log(user);
		return { user };
	}
}

export { CreateAdminService };
