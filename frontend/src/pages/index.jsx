"use client";
import Head from "next/head";
//images and styles

//components
import Header from "@/components/Header/NavBar";
import { CarouselCardsProducts } from "@/components/products/Carousel";
import { Box, useMediaQuery } from "@mui/material";

import Footer from "@/components/Footer";
import CarouselBanner from "@/components/Swipper/CarouselBanner";
import useStore from "@/data/global_states/useProducts";
import { Card, Skeleton } from "@nextui-org/react";

export default function Page() {
	const skeletonNumber = useMediaQuery("(min-width: 600px)") ? 8 : 4;
	const brands = useStore((state) => state.brands);
	const products = useStore((state) => state.products);
	console.log(products);

	return (
		<div className="min-h-screen w-screen flex flex-col justify-between">
			<Head>
				<title>uShop</title>
			</Head>
			<Header />
			<main className="flex flex-col min-h-[800px] w-full">
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
									const filterProducts = products.filter((product) => product.brand.id === brand.id);
									if (filterProducts.length > 0) {
										return (
											<div key={index} className="flex items-center justify-center w-[100%] flex-col">
												<h3 className=" tracking-widest pt-6 text-3xl font-medium">
													{brand.name}
													{/* {"Marca " + (index + 1)} */}
												</h3>
												<CarouselCardsProducts products={filterProducts} />
											</div>
										);
									}
								})}
							</>
						) : (
							<div className="flex flex-wrap gap-6 justify-center lg:w-10/12">
								{Array.from({ length: skeletonNumber }).map((_, index) => (
									// <div key={index} className="flex flex-col gap-4 w-48 pt-4">
									// 	<div className="skeleton bg-neutral-content h-32 w-full"></div>
									// 	<div className="skeleton bg-neutral-content h-4 w-28"></div>
									// 	<div className="skeleton bg-neutral-content h-4 w-full"></div>
									// 	<div className="skeleton bg-neutral-content h-4 w-full"></div>
									// </div>
									<Card className="w-[250px]  space-y-5 p-6 shadow-xl" key={index} radius="lg">
										<Skeleton isLoaded={true} className="rounded-lg">
											<div className="h-24 rounded-lg bg-palette-base-gray-600/60"></div>
										</Skeleton>
										<div className="space-y-3">
											<Skeleton isLoaded={true} className="w-3/5 rounded-lg">
												<div className="h-3 w-full rounded-lg bg-palette-base-gray-600/60"></div>
											</Skeleton>
											<Skeleton isLoaded={true} className="w-4/5 rounded-lg">
												<div className="h-3 w-full rounded-lg bg-palette-base-gray-600/60"></div>
											</Skeleton>
											<Skeleton isLoaded={true} className="w-2/5 rounded-lg">
												<div className="h-3 w-full rounded-lg bg-palette-base-gray-600/60"></div>
											</Skeleton>

											<Skeleton isLoaded={true} className="w-3/5 rounded-lg">
												<div className="h-3 w-full rounded-lg bg-palette-base-gray-600/60"></div>
											</Skeleton>
											<Skeleton isLoaded={true} className="w-4/5 rounded-lg">
												<div className="h-3 w-full rounded-lg bg-palette-base-gray-600/60"></div>
											</Skeleton>
										</div>
									</Card>
								))}
							</div>
						)}
					</Box>
				</Box>
			</main>

			<Footer />
		</div>
	);
}
