import { EditAddressService } from "../../services/address/EditAddressService.js";

class EditAddressController {
	async handle(req, res) {
		const {
			id,
			street,
			number,
			neighborhood,
			city,
			state,
			complement,
			country,
			zipcode,
			name,
		} = req.body;

		const editAddressService = new EditAddressService();

		const address = await editAddressService.execute({
			id,
			street,
			number,
			neighborhood,
			city,
			state,
			complement,
			country,
			zipcode,
			name,
		});

		return res.json(address);
	}
}

export { EditAddressController };
