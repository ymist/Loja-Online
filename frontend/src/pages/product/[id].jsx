import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DetailProduct() {
	const router = useRouter();
	const { id } = router.query;
	const [product, setProduct] = useState(null);
	console.log(product);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient(`/product/${id}`);

				console.log(response);
				if (response.data?.error) {
					return <div>pagina nao encontrada</div>;
				}
				setProduct(response.data);
			} catch (error) {
				console.log(error);
				return error;
			}
		};
		fetchProduct();
	}, []);
	return (
		<>
			<Header />
			<main className="min-h-screen w-screen p-5 flex flex-row md:flex-col">
				<div className="w-2/4">
					{product?.banner.map((item, i) => {
						return (
							<Image
								src={`/tmp_products/${item}`}
								width={180}
								height={200}
							/>
						);
					})}
				</div>
				<div className="w-2/4"></div>
			</main>
		</>
	);
}
