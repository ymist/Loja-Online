import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CarouselDetail from "@/components/CarouselDetail/carousel_detail";

export default function DetailProduct() {
	const router = useRouter();
	const { id } = router.query;
	const [product, setProduct] = useState(null);
	const [value, setValue] = useState(2);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient(`/product/${id}`);

				if (response.data?.error) {
					return <div>pagina nao encontrada</div>;
				}
				console.log(response.data);
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
			<main className="w-screen flex  my-8 flex-col gap-6 lg:flex-row lg:px-[10%] lg:py-[2%]">
				<div className="w-[500px] h-[500px] p-16 flex flex-col items-center border-1 border-palette-base-gray500/50">
					{/*product?.banner.map((item, i) => {
						return (
							<img
								src={`/tmp_products/${item}`}
								className="w-full h-full"
							/>
						);
					})*/}
					<CarouselDetail
						images={[
							product?.banner[0],
							product?.banner[0],
							product?.banner[0],
						]}
					/>
				</div>
				<div className="w-2/4">
					<div className="card-body px-0 py-0 h-full flex justify-between flex-col">
						<h2 className="card-title font-medium max-h-20 text-[28px] tracking-8  px-6 py-2">
							{product?.name}
						</h2>
						<div className="card-actions justify-start pl-6 pt-2">
							<div className="badge badge-warning p-4 text-[16px]">
								{product?.brand.name}
							</div>
							<div className="badge badge-warning p-4 text-[16px]">
								{product?.category.name}
							</div>
						</div>
						<Rating
							name="simple-controlled"
							size="large"
							sx={{
								padding: " 0px 1em",
							}}
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
						/>
						<h3 className="text-neutral-800 font-bold flex justify-end pr-8 text-[28px]">
							R$ {product?.price}
						</h3>
						<div className="flex items-end justify-center gap-1">
							<button className="btn btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-8/12">
								<AddShoppingCartIcon />
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
