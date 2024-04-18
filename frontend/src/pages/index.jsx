"use client";
import Head from "next/head";
import React, { useEffect } from "react";
//images and styles

//components
import Header from "@/components/Header/NavBar";
import { Box, useMediaQuery } from "@mui/material";
import { CarouselCardsProducts } from "@/components/products/Carousel";

import { apiClient } from "@/services/apiClient";
import Footer from "@/components/Footer";
import useStore from "@/data/global_states/useProducts";
import CarouselBanner from "@/components/Swipper/CarouselBanner";

export default function Page() {
	const skeletonNumber = useMediaQuery("(min-width: 450px)") ? 4 : 1;
	const categoriesMenu = useStore((state) => state.categories);
	const brands = useStore((state) => state.brands);
	const products = useStore((state) => state.products);
	console.log(products);

	return (
		<>
			<div>
				<Head>
					<title>Brisa</title>
				</Head>
				<Header />
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
						{products?.length !== 0 ? (
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
								{Array.from({ length: skeletonNumber }).map(
									(_, index) => (
										<div
											key={index}
											className="flex flex-col gap-4 w-48 pt-4">
											<div className="skeleton bg-neutral-content h-32 w-full"></div>
											<div className="skeleton bg-neutral-content h-4 w-28"></div>
											<div className="skeleton bg-neutral-content h-4 w-full"></div>
											<div className="skeleton bg-neutral-content h-4 w-full"></div>
										</div>
									),
								)}
							</div>
						)}
					</Box>
				</Box>

				<Footer />
			</div>
		</>
	);
}
