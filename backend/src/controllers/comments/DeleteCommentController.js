import { DeleteCommentService } from "../../services/comments/DeleteCommentService.js";

class DeleteCommentController {
	async handle(req, res) {
		const { id } = req.body;

		const deleteCommentService = new DeleteCommentService();
		try {
			await deleteCommentService.execute(id);
			return res.json({ message: "Comentário deletado com sucesso" });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

export { DeleteCommentController };
