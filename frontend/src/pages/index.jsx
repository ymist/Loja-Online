"use client"
import Head from "next/head";
import React, { FormEvent, useContext, useState, useEffect } from "react";
//images and styles

//components
import Header from "@/components/Header/NavBar";
import Swipper from "@/components/Swipper/Swipper";
import { Box, Stack, Pagination, PaginationItem, colors } from "@mui/material";
import CardProduct from "@/components/products/card";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CarouselCardsProducts } from "@/components/products/Carousel";

import { apiClient } from "@/services/apiClient";
import Footer from "@/components/Footer";
import useProducts from "@/data/global_states/useProducts";
import { useTheme } from "@emotion/react";

export default function Page() {
	const theme = useTheme
	const categoriesMenu = useProducts(state => state.categories)
	const setCategoriesMenu = useProducts(state => state.setCategories)
	
	const products = useProducts(state => state.products);
	const setAllProducts = useProducts(state => state.setProducts)
	
	useEffect(() => {
		const response = async () => {
			
			const productsResponse = await apiClient.get("/products");
			const categories = await apiClient.get("/categories");
			setAllProducts(productsResponse.data)
			setCategoriesMenu(categories.data);
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
				<Box sx={{ height: "30vw", padding: "1% 0%" }}>
					<Swipper />
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
								<div className="flex items-center justify-center w-[100%] flex-col">

							<Box sx={{fontWeight:"200", fontSize:"32px", paddingTop:"24px"}} >CONDICIONADORES</Box>
								<CarouselCardsProducts products={products} />
								</div>
								
							</>
						) : (
							<>
								{Array.from({ length: 4 }).map((_, index) => (
									<div key={index} className="flex flex-col gap-4 w-52 pt-4">
										<div className="skeleton bg-base-200  h-32 w-full"></div>
										<div className="skeleton bg-base-200 h-4 w-28"></div>
										<div className="skeleton bg-base-200 h-4 w-full"></div>
										<div className="skeleton bg-base-200 h-4 w-full"></div>
									</div>
								))}
							</>
						)}
					</Box>
				</Box>

				<Footer />
			</div>
		</>
	);
}
