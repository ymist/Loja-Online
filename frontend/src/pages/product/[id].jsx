import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CarouselDetail from "@/components/CarouselDetail/carousel_detail";
import useStore from "@/data/global_states/useProducts";
import { CarouselCardsProducts } from "@/components/products/Carousel";
import Footer from "@/components/Footer";
import { addToCart } from "@/data/addToCart";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { Spinner, useDisclosure } from "@nextui-org/react";
import { toast } from "react-toastify";

export default function DetailProduct() {
	const router = useRouter();
	const { id } = router.query;
	const products = useStore((state) => state.products);
	const [filterProducts, setFilterProducts] = useState(null);
	const [product, setProduct] = useState(null);
	const [value, setValue] = useState(2);
	const user = useStore((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [info, setInfo] = useState();

	const handleOpen = () => {
		onOpen();
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient(`/product/${id}`);

				if (response.data?.error) {
					return <div>pagina nao encontrada</div>;
				}
				const filter = products.filter(
					(item) => item.brand.id === response.data.brand.id,
				);
				if (filter) {
					setFilterProducts(filter);
				}
				setProduct(response.data);
				setInfo({
					stock: Number(response.data.stock),
					product_id: response.data.id,
				});
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
			{product ? (
				<>
					<main className="w-screen flex min-h-max items-center mb-8 lg:my-8 flex-col lg:min-h-[500px] lg:items-start gap-6 lg:flex-row lg:justify-evenly  lg:px-[10%] lg:py-[2%] ">
						<div className="w-full sm:w-[500px] sm:h-[500px] sm:p-16 flex flex-col items-center justify-center border-1 border-palette-base-gray500/50">
							{/*product?.banner.map((item, i) => {
					return (
						<img
							src={`/tmp_products/${item}`}
							className="w-full h-full"
						/>
					);
				})*/}
							<CarouselDetail images={product?.banner} />
						</div>
						<div className=" w-[250px] sm:w-[450px]  h-full flex justify-evenly lg:w-5/12 ">
							<div className="card-body px-0 py-0  h-[250px] lg:h-[500px] flex flex-col justify-evenly gap-4 ">
								<div className="flex flex-col gap-4">
									<h2 className="card-title font-medium max-h-20 lg:text-[28px] lg:tracking-8  lg:px-6 py-2">
										{product?.name}
									</h2>
									<div className="card-actions justify-start lg:pl-6 pt-2">
										<div className="badge badge-warning p-3 lg:text-[16px]">
											{product?.brand.name}
										</div>
										<div className="badge badge-warning p-3 lg:text-[16px]">
											{product?.category.name}
										</div>
									</div>
									<Rating
										name="simple-controlled"
										size="large"
										value={value}
										className="lg:pl-6"
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
									/>
								</div>
								<h3 className="text-success font-bold flex justify-center text-[26px] lg:text-[28px]">
									R$ {product?.price}
								</h3>
								{user?.cart[0]?.cartItems?.find(
									(cartitem) =>
										cartitem.product_id === product.id,
								) ? (
									<button
										className="btn btn-square border-transparent bottom-6  bg-palette-primary-light text-palette-base-main w-11/12"
										onClick={() =>
											toast.info(
												"Esse item ja está no seu carrinho! Verifique Por Favor.",
											)
										}>
										<DoneIcon />
									</button>
								) : (
									<button
										className="btn btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-11/12"
										onClick={() =>
											addToCart(product.id, user)
										}>
										<AddShoppingCartIcon />
									</button>
								)}
							</div>
						</div>
					</main>
					<article className="w-screen flex min-h-max items-center mb-8 lg:my-8 flex-col lg:min-h-[500px] lg:items-start gap-6  lg:px-[10%] lg:py-[2%]">
						<div className="w-3/4 my-8 lg:w-2/4 flex flex-col gap-4">
							<h1 className="font-bold text-[28px] tracking-wide ">
								Descrição
							</h1>
							<span className="text-[18px] tracking-wide">
								{product?.description}
							</span>
						</div>
					</article>
					<div>
						{filterProducts && (
							<div className="flex items-center justify-center w-[100%] flex-col">
								<Box
									sx={{
										fontWeight: "200",
										fontSize: "32px",
										paddingTop: "24px",
									}}>
									Relacionados
								</Box>
								<CarouselCardsProducts
									products={filterProducts}
								/>
							</div>
						)}
					</div>
					<ModalAddQuantity
						info={info}
						isOpen={isOpen}
						onClose={onClose}
					/>
				</>
			) : (
				<div className="w-full h-[50vh] flex justify-center items-center ">
					<Spinner size="lg" color="success" />
				</div>
			)}
			<Footer></Footer>
		</>
	);
}
