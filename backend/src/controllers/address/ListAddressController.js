import { ListAddressService } from "../../services/address/ListAddressService.js";

class ListAddressController {
	async handle(req, res) {
		const user_id = req.body.user_id;

		const listAddressService = new ListAddressService();

		const addresses = await listAddressService.execute({ user_id });
		console.log(addresses);
		return res.json(addresses);
	}
}

export { ListAddressController };
