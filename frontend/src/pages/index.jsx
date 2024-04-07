"use client";
import Head from "next/head";
import React, { useEffect } from "react";
//images and styles

//components
import Header from "@/components/Header/NavBar";
import Swipper from "@/components/Swipper/Swipper";
import { Box } from "@mui/material";
import { CarouselCardsProducts } from "@/components/products/Carousel";

import { apiClient } from "@/services/apiClient";
import Footer from "@/components/Footer";
import useProducts from "@/data/global_states/useProducts";
import CarouselBanner from "@/components/Swipper/CarouselBanner";

export default function Page() {
	const categoriesMenu = useProducts((state) => state.categories);
	const setCategoriesMenu = useProducts((state) => state.setCategories);
	const brands = useProducts((state) => state.brands);
	const setBrands = useProducts((state) => state.setBrands);

	const products = useProducts((state) => state.products);
	const setAllProducts = useProducts((state) => state.setProducts);

	useEffect(() => {
		const response = async () => {
			const productsResponse = await apiClient.get("/products");
			const categories = await apiClient.get("/categories");
			const listBrands = await apiClient.get("/brands");
			setBrands(listBrands.data);
			setAllProducts(productsResponse.data);
			setCategoriesMenu(categories.data);
			console.log(brands);
		};
		response();
	}, []);

	return (
		<>
			<div>
				<Head>
					<title>Brisa</title>
				</Head>
				<Header items={categoriesMenu} />
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						padding: "3% 0%",
					}}>
					{/*<Swipper />*/}
					<CarouselBanner />
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						flexDirection: "column",
						alignItems: "center",
						paddingBottom: "2em",
					}}>
					<Box
						sx={{
							display: "flex",
							width: "100%",
							justifyContent: "center",
							flexWrap: "wrap",
							gap: "2em",
						}}>
						{products.length !== 0 ? (
							<>
								{brands?.map((brand, index) => {
									const filterProducts = products.filter(
										(product) =>
											product.brand.id === brand.id,
									);
									if (filterProducts.length > 0) {
										return (
											<div
												key={index}
												className="flex items-center justify-center w-[100%] flex-col">
												<Box
													sx={{
														fontWeight: "200",
														fontSize: "32px",
														paddingTop: "24px",
													}}>
													{brand.name}
												</Box>
												<CarouselCardsProducts
													products={filterProducts}
												/>
											</div>
										);
									}
								})}
							</>
						) : (
							<div className="flex justify-evenly w-11/12">
								{Array.from({ length: 4 }).map((_, index) => (
									<div
										key={index}
										className="flex flex-col gap-4 w-52 pt-4">
										<div className="skeleton bg-neutral-content  h-32 w-full"></div>
										<div className="skeleton bg-neutral-content h-4 w-28"></div>
										<div className="skeleton bg-neutral-content h-4 w-full"></div>
										<div className="skeleton bg-neutral-content h-4 w-full"></div>
									</div>
								))}
							</div>
						)}
					</Box>
				</Box>

				<Footer />
			</div>
		</>
	);
}
