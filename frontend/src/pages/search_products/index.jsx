import Header from "@/components/Header/NavBar";
import { RadioLayout } from "@/components/ui/radiolayout";
import useStore from "@/data/global_states/useProducts";
import { Button, Divider, Select, SelectItem, Spinner } from "@nextui-org/react";
import { LayoutGrid, LayoutList, LayoutPanelLeft } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function SearchProducts() {
	const products = useStore((state) => state.products);
	const [selectedLayout, setSelectedLayout] = useState("2");
	const [selectedFilter, setSelectedFilter] = useState(new Set(["popular"]));

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
		<div className="h-screen flex flex-col items-center">
			<Head>
				<title>Produtos - uShop</title>
			</Head>
			<Header />
			{products ? (
				<main className="flex justify-center flex-col w-full lg:w-3/5 p-4">
					<h1 className="text-2xl tracking-widest text-palette-base-gray-900 flex justify-center items-center gap-3 font-semibold">PRODUTOS</h1>
					<div className="flex">
						{/* Drawer (lateral esquerda) */}
						<div className="w-1/4 bg-palette-base-gray-600 p-4">
							<div>Item da lateral direita</div>
						</div>

						{/* Área principal */}
						<div className="flex flex-col flex-grow">
							{/* Header (topo) */}
							<div className="w-full gap-3 bg-gray-300 p-4 bg-palette-base-gray-400 flex flex-row-reverse items-center">
								<Select size="sm" onSelectionChange={setSelectedFilter} selectedKeys={selectedFilter} className="w-[125px] text-sm">
									{filters.map((item) => (
										<SelectItem key={item.value}>{item.label}</SelectItem>
									))}
								</Select>
								<Divider orientation="vertical" />
								<RadioLayout value={selectedLayout} setValue={setSelectedLayout} />
								<Divider orientation="vertical" />
								<span className="text-palette-base-gray-900 text-sm font-normal">
									<b>{products.length}</b> Produtos
								</span>
							</div>

							{/* Conteúdo (Produtos) */}
							<div className="flex-grow p-4">
								<div>Produtos</div>
							</div>
						</div>
					</div>
				</main>
			) : (
				<div className="flex justify-center items-center">
					<Spinner color="success" />
				</div>
			)}
		</div>
	);
}
