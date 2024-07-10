import Footer from "@/components/Footer";
import Header from "@/components/Header/NavBar";
import CardProduct from "@/components/products/card";
import CardProductMobile from "@/components/products/card/cardMobile";
import { AccordionList } from "@/components/ui/accordion_list";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { RadioLayout } from "@/components/ui/radiolayout";
import useStore from "@/data/global_states/useProducts";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { Button, Divider, Input, Pagination, Select, SelectItem, Spinner, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { ChevronLeft, Filter, InboxIcon, MailIcon } from "lucide-react";

export default function SearchProducts() {
	const products = useStore((state) => state.products);
	const router = useRouter();
	const { category, brand, searchQuery, filter } = router.query;
	const [selectedLayout, setSelectedLayout] = useState("2");
	const [selectedFilter, setSelectedFilter] = useState(new Set(["popular"]));
	const [activeCategoryFilters, setActiveCategoryFilters] = useState(category ? new Set([category]) : new Set([]));

	const [activeBrandFilters, setActiveBrandFilters] = useState(new Set());
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [value, setValue] = useState({ min: 0, max: 0 });
	const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onClose: onCloseModalAdd } = useDisclosure();
	const [info, setInfo] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16;
	const [search, setSearch] = useState(searchQuery || "");
	const isMobile = useMediaQuery("(max-width:1023px)");
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

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

	const indexOfLastProduct = currentPage * itemsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	const handlePageChange = (page) => {
		window.scrollTo({
			top: "selectedFrame.offsetTop",
			left: 0,
			behavior: "smooth",
		});
		setCurrentPage(page);
	};

	useEffect(() => {
		setCurrentPage(1);

		applyFilters();
	}, [activeCategoryFilters, activeBrandFilters, products, value, selectedFilter, search]);

	useEffect(() => {
		// Atualize os filtros de categoria e marca com base em router.query
		if (category) {
			setActiveCategoryFilters(new Set([category]));
		}
		if (brand) {
			setActiveBrandFilters(new Set([brand]));
		}
		if (filter) {
			setSelectedFilter(new Set([filter]));
		}
		setSearch(searchQuery || "");
		applyFilters();
	}, [router.query]);

	const toogleBrandFilter = (brand) => {
		const newFilters = new Set(activeBrandFilters);
		if (newFilters.has(brand)) {
			newFilters.delete(brand);
		} else {
			newFilters.add(brand);
		}
		setActiveBrandFilters(newFilters);
	};

	const toogleCategoryFilter = (category) => {
		const newFilters = new Set(activeCategoryFilters);
		if (newFilters.has(category)) {
			newFilters.delete(category);
		} else {
			newFilters.add(category);
		}
		setActiveCategoryFilters(newFilters);
	};

	const applyFilters = () => {
		let filtered = products;

		if (selectedFilter.has("az")) {
			filtered = [...filtered].sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return -1;
				}
				if (a.name.toLowerCase() > b.name.toLowerCase()) {
					return 1;
				}
				return 0;
			});
		} else if (selectedFilter.has("lowprice")) {
			filtered = [...filtered].sort((a, b) => {
				const priceA = Number(a.price.replace(",", "."));
				const priceB = Number(b.price.replace(",", "."));
				return priceA - priceB;
			});
		} else if (selectedFilter.has("highprice")) {
			filtered = [...filtered].sort((a, b) => {
				const priceA = Number(a.price.replace(",", "."));
				const priceB = Number(b.price.replace(",", "."));
				return priceB - priceA;
			});
		} else if (selectedFilter.has("news")) {
			filtered = [...filtered].sort((a, b) => {
				const dateA = new Date(a.created_at);
				const dateB = new Date(b.created_at);
				return dateB - dateA; // Ordena do mais novo para o mais antigo
			});
		} else if (selectedFilter.has("popular")) {
			filtered = [...filtered].sort((a, b) => {
				return a.stock - b.stock;
			}); // Ordenação aleatória
		}

		if (activeCategoryFilters.size > 0) {
			filtered = filtered.filter((product) => product.categories.some((category) => activeCategoryFilters.has(category.name)));
		}
		if (activeBrandFilters.size > 0) {
			filtered = filtered.filter((product) => activeBrandFilters.has(product.brand.name));
		}

		if (value.min !== 0) {
			filtered = filtered.filter((product) => Number(product.price.replace(",", ".")) >= value.min);
		}

		if (value.max !== 0) {
			filtered = filtered.filter((product) => Number(product.price.replace(",", ".")) <= value.max);
		}

		if (search) {
			const searchLower = search.toLowerCase();
			filtered = filtered.filter((product) => {
				const newSearch = (product.name + product.categories.map((category) => category.name + ", ") + product.brand.name).toLowerCase();
				return newSearch.includes(searchLower);
			});
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

	const DrawerList = (
		<Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)}>
			<List className="flex flex-col gap-2">
				<div
					className="h-full w-max p-1 flex items-center rounded-full duration-300 cursor-pointer hover:bg-palette-base-gray-500"
					onClick={() => {
						toggleDrawer(false);
					}}>
					<ChevronLeft size={24} />
				</div>
				<div className="py-2 px-2 flex items-center justify-between">
					<div className="flex items-center gap-2 ">
						<Filter size={16} strokeWidth={1.25} absoluteStrokeWidth />
						<h2 className="text-xl font-semibold text-palette-base-gray-900 tracking-wide">FILTROS</h2>
					</div>
					<h2 className="text-xl font-semibold">{filteredProducts.length}</h2>
				</div>
				<Divider />
				<div className="flex gap-3 px-3 py-2 w-11/12 items-center">
					<Select
						size="md"
						variant="faded"
						label={<h2 className="text-md">Organizar Por:</h2>}
						labelPlacement="outside"
						aria-label="select-filters"
						onSelectionChange={setSelectedFilter}
						selectedKeys={selectedFilter}
						className="w-full text-sm">
						{filters.map((item) => (
							<SelectItem key={item.value}>{item.label}</SelectItem>
						))}
					</Select>
				</div>
				<Divider />
				<AccordionList
					toogleCategoryFilter={toogleCategoryFilter}
					toogleBrandFilter={toogleBrandFilter}
					value={value}
					setValue={setValue}
					activeBrandFilters={activeBrandFilters}
					activeCategoryFilters={activeCategoryFilters}
				/>
			</List>
		</Box>
	);

	if (isMobile) {
		return (
			<div className="min-h-screen grid">
				<Head>
					<title>Produtos - uShop</title>
				</Head>
				<Header />
				<main className="flex flex-col w-full min-h-full justify-self-center gap-4 lg:w-full py-4">
					<div className="flex flex-col gap-3">
						<div className="w-screen px-5 py-5 flex border-b-1 border-palette-base-gray-600 flex-row-reverse justify-between shadow-md sticky top-0 z-50 bg-palette-base-gray-500">
							<Button isIconOnly variant="faded" className="shadow-sm" color="success" onClick={toggleDrawer(true)}>
								<MenuRoundedIcon />
							</Button>
							<h1 className="text-2xl tracking-widest text-palette-base-gray-900 flex justify-center items-center font-semibold">PRODUTOS</h1>
						</div>
						<div className="flex flex-grow">
							<div className="flex flex-col gap-2 w-full">
								{filteredProducts.length !== 0 ? (
									<>
										<div className={`flex-grow p-2 grid gap-3 gap-y-8 grid-cols-2 `}>
											{currentProducts.map((product) => (
												<div key={product.id} className="">
													<CardProductMobile product={product} handleOpen={handleOpen} />
												</div>
											))}
										</div>
										<div className="w-full flex justify-center">
											<Pagination
												isCompact
												color="success"
												showControls
												total={Math.ceil(filteredProducts.length / itemsPerPage)}
												initialPage={1}
												onChange={handlePageChange}
											/>
										</div>
									</>
								) : (
									<motion.div
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5 }}
										className="flex flex-col gap-6 my-32 items-center">
										<Image src="/assets/images/search_not_found.png" alt="search_not_found" width={220} height={220} />
										<h2 className="font-medium tracking-widest text-palette-base-gray-900 text-xl">Busca Não Encontrada</h2>
									</motion.div>
								)}
							</div>
						</div>
					</div>
					<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
						{DrawerList}
					</Drawer>
					{isOpenModalAdd && <ModalAddQuantity info={info} onClose={onCloseModalAdd} isOpen={isOpenModalAdd} />}
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen grid">
			<Head>
				<title>Produtos - uShop</title>
			</Head>
			<Header />
			<main className="flex flex-col w-full min-h-full justify-self-center gap-4 lg:w-[95%] p-4">
				<h1 className="text-2xl tracking-widest text-palette-base-gray-900 flex justify-center items-center gap-3 font-semibold">PRODUTOS</h1>
				<div className="flex flex-col">
					<div className="w-full flex flex-row-reverse justify-between items-center bg-palette-base-gray-400 p-4">
						<div className="w-full gap-3 bg-gray-300 flex flex-row-reverse items-center">
							<Select
								size="sm"
								aria-label="select-filters"
								onSelectionChange={setSelectedFilter}
								selectedKeys={selectedFilter}
								className="w-[125px] text-sm">
								{filters.map((item) => (
									<SelectItem key={item.value}>{item.label}</SelectItem>
								))}
							</Select>
							<Divider orientation="vertical" />
							<RadioLayout value={selectedLayout} setValue={setSelectedLayout} />
							<Divider orientation="vertical" />
							<span className="text-palette-base-gray-900 text-sm font-normal">
								<b>{filteredProducts?.length}</b> Produtos
							</span>
						</div>
						<Input
							type="text"
							size="sm"
							label="O que você precisa?"
							className="w-3/5 shadow-xl"
							variant="flat"
							value={search}
							onValueChange={setSearch}
						/>
					</div>
					<div className="flex flex-grow">
						<div className="w-1/6">
							<AccordionList
								toogleCategoryFilter={toogleCategoryFilter}
								toogleBrandFilter={toogleBrandFilter}
								value={value}
								setValue={setValue}
								activeBrandFilters={activeBrandFilters}
								activeCategoryFilters={activeCategoryFilters}
							/>
						</div>
						<div className="flex flex-col gap-4 w-full">
							{filteredProducts.length !== 0 ? (
								<>
									<div
										className={`flex-grow p-4 grid gap-4 ${
											selectedLayout === "2" ? "grid-cols-2" : selectedLayout === "3" ? "grid-cols-3" : "grid-cols-4"
										}`}>
										{currentProducts.map((product) => (
											<div key={product.id} className="my-4">
												<CardProduct product={product} handleOpen={handleOpen} />
											</div>
										))}
									</div>
									<div className="w-full flex justify-center">
										<Pagination
											isCompact
											color="success"
											showControls
											total={Math.ceil(filteredProducts.length / itemsPerPage)}
											initialPage={1}
											onChange={handlePageChange}
										/>
									</div>
								</>
							) : (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
									className="flex flex-col gap-6 my-32 items-center">
									<Image src="/assets/images/search_not_found.png" alt="search_not_found" width={220} height={220} />
									<h2 className="font-medium tracking-widest text-palette-base-gray-900 text-xl">Busca Não Encontrada</h2>
								</motion.div>
							)}
						</div>
					</div>
				</div>
				{isOpenModalAdd && <ModalAddQuantity info={info} onClose={onCloseModalAdd} isOpen={isOpenModalAdd} />}
			</main>

			<Footer />
		</div>
	);
}
