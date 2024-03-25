import Head from "next/head";
import React, { FormEvent, useContext, useState } from "react";
//images and styles

//components
import Header from "@/components/Header";

export default function Page() {
	return (
		<>
			<div>
				<Head>
					<title>Teste</title>
				</Head>
				<Header />
			</div>
		</>
	);
}
