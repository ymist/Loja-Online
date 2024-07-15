import { UpdateCommentService } from "../../services/comments/UpdateCommentService.js";

class UpdateCommentController {
	async handle(req, res) {
		const { id, title, rating, description, images } = req.body;

		const updateCommentService = new UpdateCommentService();
		try {
			const comment = await updateCommentService.execute({
				id,
				title,
				rating,
				description,
				images,
			});
			return res.json(comment);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

export { UpdateCommentController };
