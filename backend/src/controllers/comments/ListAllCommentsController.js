import { ListAllCommentsService } from "../../services/comments/ListAllCommentsService.js";

class ListAllCommentsController {
	async handle(req, res) {
		const product_id = req.product_id;

		const listComments = new ListAllCommentsService();

		const comments = await listComments.execute({ product_id });

		return res.json(comments);
	}
}

export { ListAllCommentsController };
