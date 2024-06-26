import useStore from "@/data/global_states/useProducts";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";

export const FlyoutItems = ({ category }) => {
	const brands = useStore((state) => state.brands);
	const router = useRouter();

	const filters = [
		{
			label: "Popular",
			value: "popular",
		},
		{
			label: "Novidades",
			value: "news",
		},
		{
			label: "A-Z",
			value: "az",
		},
		{
			label: "Menor Preço",
			value: "lowprice",
		},
		{
			label: "Maior Preço",
			value: "highprice",
		},
	];
	return (
		<Tooltip
			showArrow={true}
			placement="bottom"
			content={
				<div className="w-[600px] min-h-[150px] p-8 flex gap-4 flex-1">
					<div className="flex flex-col flex-1 gap-4">
						<h2 className="text-palette-primary-main tracking-widest font-bold ">Marcas</h2>
						{brands?.map((brand) => (
							<span
								key={brand.id}
								onClick={() =>
									router.push({
										pathname: "/search_products",
										query: {
											category: category.name,
											brand: brand.name,
										},
									})
								}
								className="font-medium  tracking-widest text-palette-base-gray-900 cursor-pointer hover:underline">
								{brand.name.toUpperCase()}
							</span>
						))}
					</div>
					<div className="flex flex-col flex-1 gap-4">
						<h2 className="text-palette-primary-main tracking-widest font-bold ">Filtros</h2>

						{filters?.map((filter) => (
							<span
								key={filter.value}
								className="font-medium  tracking-widest text-palette-base-gray-900 cursor-pointer hover:underline"
								onClick={() =>
									router.push({
										pathname: "/search_products",
										query: {
											category: category.name,
											filter: filter.value,
										},
									})
								}>
								{filter.label}
							</span>
						))}
					</div>
				</div>
			}>
			<span key={category.id}>{category.name.toUpperCase()}</span>
		</Tooltip>
	);
};
