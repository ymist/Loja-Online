"use client";
import Head from "next/head";
import { Box, useMediaQuery } from "@mui/material";
import { Card, Skeleton } from "@nextui-org/react";
import Header from "@/components/Header/NavBar";
import CarouselBanner from "@/components/Swipper/CarouselBanner";
import Footer from "@/components/Footer";
import useStore from "@/data/global_states/useProducts";
import { CarouselCardsProducts } from "@/components/products/Carousel";

// Componente para exibir esqueletos de carregamento
const ProductSkeleton = ({ skeletonNumber }) => {
	return (
		<div className="flex flex-wrap gap-6 justify-center lg:w-10/12">
			{Array.from({ length: skeletonNumber }).map((_, index) => (
				<Card className="w-[250px] space-y-5 p-6 shadow-xl" key={index} radius="lg">
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
	);
};

// Componente para exibir produtos de uma marca específica
const BrandProducts = ({ brand, products }) => {
	const filterProducts = products.filter((product) => product.brand.id === brand.id);
	if (filterProducts.length === 0) return null;

	return (
		<div className="flex items-center justify-center w-[100%] flex-col">
			<h3 className="tracking-widest pt-6 text-3xl font-medium">{brand.name}</h3>
			<CarouselCardsProducts products={filterProducts} />
		</div>
	);
};

// Componente para exibir a lista de produtos por marca
const ProductList = ({ brands, products }) => {
	return brands.map((brand, index) => <BrandProducts key={index} brand={brand} products={products} />);
};

export default function Page() {
	const skeletonNumber = useMediaQuery("(min-width: 600px)") ? 8 : 4;
	const brands = useStore((state) => state.brands);
	const products = useStore((state) => state.products);

	return (
		<div className="min-h-screen w-screen flex flex-col justify-between">
			<Head>
				<title>uShop</title>
			</Head>
			<Header />
			<main className="flex flex-col min-h-[800px] w-full">
				<Box sx={{ display: "flex", justifyContent: "center", padding: "3% 0%" }}>
					<CarouselBanner />
				</Box>
				<Box sx={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", paddingBottom: "2em" }}>
					<Box sx={{ display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap", gap: "2em" }}>
						{products.length !== 0 ? <ProductList brands={brands} products={products} /> : <ProductSkeleton skeletonNumber={skeletonNumber} />}
					</Box>
				</Box>
			</main>
			<Footer />
		</div>
	);
}
