import { CreateCommentService } from "../../services/comments/CreateCommentService.js";

class CreateCommentController {
	async handle(req, res) {
		const { title, rating, description, product_id, user_id, images } = req.body;

		const createCommentService = new CreateCommentService();
		try {
			const comment = await createCommentService.execute({
				title,
				rating,
				description,
				product_id,
				user_id,
				images,
			});
			return res.json(comment);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

export { CreateCommentController };
