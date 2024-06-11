import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CustomAutocomplete({ products }) {
	const router = useRouter();
	return (
		<Autocomplete
			aria-label="Pesquisar"
			defaultItems={products}
			variant="flat"
			size="sm"
			placeholder="O que você procura?"
			labelPlacement="inside"
			className="max-w-full m-0 ">
			{(product, index) => {
				return (
					<AutocompleteItem key={product.id} textValue={product.name} onClick={() => router.push(`/product/${product.id}`)}>
						<div className="flex gap-6 items-center h-32  ">
							<Image
								// src={"/tmp_products/" + product.banner[0]}
								src={"/produto-de-beleza-e-cosmeticos-com-tons-rosados-suaves.png"}
								width={100}
								height={100}
							/>
							<div className="flex flex-col">
								<span className="text-small">{"Produto " + product?.id.split("-")[2].toUpperCase()}</span>
								<span className="text-tiny text-default-400">{"Marca" + index + 1}</span>
								<span className="text-tiny text-default-400">{"Categoria" + index + 1}</span>
							</div>
						</div>
					</AutocompleteItem>
				);
			}}
		</Autocomplete>
	);
}
