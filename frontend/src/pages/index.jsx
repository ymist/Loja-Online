import Head from "next/head";
import React, { FormEvent, useContext, useState, useEffect } from "react";
//images and styles

//components
import Header from "@/components/Header/NavBar";
import Swipper from "@/components/Swipper/Swipper";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import CardProduct from "@/components/products/card";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { apiClient } from "@/services/apiClient";
import Footer from "@/components/Footer";

export default function Page() {
	const [allProducts, setAllProducts] = useState([]);
	const [categoriesMenu, setCategoriesMenu] = useState([]);
	console.log(allProducts);
	useEffect(() => {
		const response = async () => {
			const products = await apiClient.get("/products");
			const categories = await apiClient.get("/categories");
			setCategoriesMenu(categories.data);
			setAllProducts(products.data);
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
				<Box sx={{ height: "20vw", padding: "1% 0%" }}>
					<Swipper />
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingBottom: "2em",
					}}>
					<Box
						sx={{
							padding: "0% 7% 2% 7%",
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
							gap: "2em",
						}}>
						{allProducts.length !== 0 ? (
							<>
								{allProducts.map((product, index) => (
									<>
										<CardProduct
											key={index}
											product={product}
										/>
									</>
								))}
							</>
						) : (
							<>
								{Array.from({ length: 4 }).map((_, index) => (
									<div className="flex flex-col gap-4 w-52 pt-4">
										<div className="skeleton bg-base-200  h-32 w-full"></div>
										<div className="skeleton bg-base-200 h-4 w-28"></div>
										<div className="skeleton bg-base-200 h-4 w-full"></div>
										<div className="skeleton bg-base-200 h-4 w-full"></div>
									</div>
								))}
							</>
						)}
					</Box>
					<Stack spacing={2}>
						<Pagination
							color="primary"
							count={allProducts.length}
							renderItem={(item) => (
								<PaginationItem
									slots={{
										previous: ArrowBackIcon,
										next: ArrowForwardIcon,
									}}
									{...item}
								/>
							)}
						/>
					</Stack>
				</Box>

				<Footer />
			</div>
		</>
	);
}
