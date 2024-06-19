import Header from "@/components/Header/NavBar";
import CardProduct from "@/components/products/card";
import { AccordionList } from "@/components/ui/accordion_list";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { RadioLayout } from "@/components/ui/radiolayout";
import useStore from "@/data/global_states/useProducts";
import { Divider, Select, SelectItem, Spinner, useDisclosure } from "@nextui-org/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function SearchProducts() {
	const products = useStore((state) => state.products);
	const categories = useStore((state) => state.categories);
	const brands = useStore((state) => state.brands);
	const [selectedLayout, setSelectedLayout] = useState("2");
	const [selectedFilter, setSelectedFilter] = useState(new Set(["popular"]));
	const [activeCategoryFilters, setActiveCategoryFilters] = useState(new Set());
	const [activeBrandFilters, setActiveBrandFilters] = useState(new Set());
	const [filteredProducts, setFilteredProducts] = useState(products);
	const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onClose: onCloseModalAdd } = useDisclosure();
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
	const [info, setInfo] = useState({});
	console.log(filteredProducts);
	useEffect(() => {
		applyFilters();
	}, [activeCategoryFilters, activeBrandFilters, products]);

	const toogleBrandFilter = (brand) => {
		const newFilters = new Set(activeBrandFilters);
		if (newFilters.has(brand)) {
			newFilters.delete(brand);
		} else {
			newFilters.add(brand);
		}
		console.log(newFilters);
		setActiveBrandFilters(newFilters);
	};

	const toogleCategoryFilter = (category) => {
		const newFilters = new Set(activeCategoryFilters);
		if (newFilters.has(category)) {
			newFilters.delete(category);
		} else {
			newFilters.add(category);
		}
		console.log(newFilters);
		setActiveCategoryFilters(newFilters);
	};

	const applyFilters = () => {
		let filtered = products;

		if (activeCategoryFilters.size > 0) {
			filtered = filtered.filter((product) => activeCategoryFilters.has(product.category.name));
		}
		if (activeBrandFilters.size > 0) {
			filtered = filtered.filter((product) => activeBrandFilters.has(product.brand.name));
		}

		setFilteredProducts(filtered);
	};

	const handleOpen = (stock, product_id) => {
		setInfo({
			stock: Number(stock),
			product_id: product_id,
		});
		onOpenModalAdd();
	};

	return (
		<div className="min-h-screen flex flex-col items-center">
			<Head>
				<title>Produtos - uShop</title>
			</Head>
			<Header />
			{products.length > 0 ? (
				<main className="flex justify-center flex-col w-full gap-4 lg:w-3/5 p-4">
					<h1 className="text-2xl tracking-widest text-palette-base-gray-900 flex justify-center items-center gap-3 font-semibold">PRODUTOS</h1>
					<div className="flex flex-col">
						<div className="w-full">
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
									<b>{filteredProducts.length}</b> Produtos
								</span>
							</div>
						</div>
						<div className="flex flex-grow">
							<div className="w-1/4">
								<AccordionList
									toogleCategoryFilter={toogleCategoryFilter}
									toogleBrandFilter={toogleBrandFilter}
									categories={categories}
									brands={brands}
								/>
							</div>
							<div className="flex-grow p-4 flex flex-wrap">
								{filteredProducts.map((product) => (
									<span className="my-4 mx-3">
										<CardProduct product={product} handleOpen={handleOpen} />
									</span>
								))}
							</div>
						</div>
					</div>
					{isOpenModalAdd && <ModalAddQuantity info={info} onClose={onCloseModalAdd} isOpen={isOpenModalAdd} />}
				</main>
			) : (
				<div className="h-screen flex justify-center items-center">
					<Spinner color="success" />
				</div>
			)}
		</div>
	);
}
