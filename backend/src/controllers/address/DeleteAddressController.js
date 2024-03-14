import { DeleteAddressService } from "../../services/address/DeleteAddressService.js";

class DeleteAddressController {
	async handle(req, res) {
		const id = req.body.id;

		const deleteAddress = new DeleteAddressService();

		const address = await deleteAddress.execute(id);

		return res.json(address);
	}
}
export { DeleteAddressController };
