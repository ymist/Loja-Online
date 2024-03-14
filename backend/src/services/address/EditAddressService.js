import prismaClient from "../../prisma/index.js";
class EditAddressService {
	async execute({
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
	}) {
		const address = await prismaClient.address.findUnique({
			where: {
				id: id,
			},
		});

		if (!address) {
			return { err: "Endereco nao encontrado" };
		}

		const updAddress = await prismaClient.address.update({
			where: {
				id: id,
			},
			data: {
				street: street || address.street,
				number: number || address.number,
				neighborhood: neighborhood || address.neighborhood,
				city: city || address.city,
				state: state || address.state,
				complement: complement || address.complement,
				country: country || address.country,
				zipcode: zipcode || address.zipcode,
				name: name || address.name,
			},
		});

		return updAddress;
	}
}

export { EditAddressService };
