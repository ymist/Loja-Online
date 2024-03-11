import prismaClient from "../../prisma/index.js";

class DeleteAddressService {
	async execute(id) {
		const address = await prismaClient.address.delete({
			where: {
				id: id,
			},
		});
		return address;
	}
}

export { DeleteAddressService };
