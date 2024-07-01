import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomAutocomplete({ products }) {
	const router = useRouter();

	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();

			router.push({
				pathname: "/search_products",
				query: {
					searchQuery: inputValue,
				},
			});
		}
	};

	return (
		<Autocomplete
			aria-label="Pesquisar"
			defaultItems={products}
			variant="flat"
			size="sm"
			placeholder="O que você procura?"
			labelPlacement="inside"
			className="max-w-full m-0 "
			value={inputValue}
			onValueChange={setInputValue}
			scrollShadowProps={{
				isEnabled: false,
			}}
			onKeyDown={handleKeyDown}>
			{(product, index) => {
				return (
					<AutocompleteItem
						key={product.id}
						textValue={`${product.name}, ${product.categories.map((category) => category.name + ", ")} ${product.brand.name}`}
						onClick={() => router.push(`/product/${product.id}`)}>
						<div className="flex gap-6 items-center h-32  ">
							<Image
								src={"/tmp_products/" + product.banner[0]}
								// src={"/produto-de-beleza-e-cosmeticos-com-tons-rosados-suaves.png"}
								width={100}
								height={100}
							/>
							<div className="flex flex-col">
								{/* <span className="text-small">{"Produto " + product?.id.split("-")[2].toUpperCase()}</span> */}
								{/* <span className="text-tiny text-default-400">{"Marca" + 1}</span>
								<span className="text-tiny text-default-400">{"Categoria" + 1}</span> */}
								<span className="text-small">{product.name}</span>

								{product?.categories?.slice(0, 2).map((category, index) => (
									<span className="text-tiny text-default-400">{category.name}</span>
								))}
								<span className="text-tiny text-default-400">{product.brand.name}</span>
							</div>
						</div>
					</AutocompleteItem>
				);
			}}
		</Autocomplete>
	);
}
