import Head from "next/head";
import React, { FormEvent, useContext, useState } from "react";
//images and styles

//components
import Header from "@/components/Header";
import Swipper from "@/components/Swipper/Swipper";
import { Box } from "@mui/material";

export default function Page() {
	return (
		<>
			<div>
				<Head>
					<title>Brisa</title>
				</Head>
				<Header />
				<Box sx={{ height: "468px", padding: "2rem 7rem" }}>
					<Swipper />
				</Box>
			</div>
		</>
	);
}
