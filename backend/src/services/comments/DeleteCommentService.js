import prismaClient from "../../prisma/index.js";

class DeleteCommentService {
	async execute(id) {
		if (!id) {
			throw new Error("ID é obrigatório");
		}

		const comment = await prismaClient.comments.findUnique({
			where: { id: id },
		});

		if (!comment) {
			throw new Error("Comentário não encontrado");
		}

		await prismaClient.comments.delete({
			where: { id: id },
		});

		return { message: "Comentário deletado com sucesso" };
	}
}

export { DeleteCommentService };
