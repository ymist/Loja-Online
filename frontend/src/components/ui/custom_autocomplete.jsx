import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Image from "next/image";

export default function CustomAutocomplete({ products }) {
	return (
		<Autocomplete
			aria-label="Pesquisar"
			defaultItems={products}
			variant="flat"
			size="sm"
			placeholder="O que você procura?"
			labelPlacement="inside"
			className="max-w-full m-0 ">
			{(product) => {
				return (
					<AutocompleteItem key={product.id} textValue={product.name}>
						<div className="flex gap-6 items-center h-32  ">
							<Image
								src={"/tmp_products/" + product.banner[0]}
								width={100}
								height={100}
							/>
							<div className="flex flex-col">
								<span className="text-small">
									{product.name}
								</span>
								<span className="text-tiny text-default-400">
									{product.brand.name}
								</span>
								<span className="text-tiny text-default-400">
									{product.category.name}
								</span>
							</div>
						</div>
					</AutocompleteItem>
				);
			}}
		</Autocomplete>
	);
}
