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
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { Chip, Divider, Input, Spinner, useDisclosure } from "@nextui-org/react";
import { toast } from "react-toastify";
import Head from "next/head";

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
		setInfo({
			product_id: product.id,
			stock: product.stock,
		});
		onOpen();
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient(`/product/${id}`);

				if (response.data?.error) {
					return <div>pagina nao encontrada</div>;
				}
				const filter = products.filter((item) => item.brand.id === response.data.brand.id);
				const secondFilter = filter.filter((item) => item.id !== response.data.id);

				if (secondFilter) {
					setFilterProducts(secondFilter);
				}
				setProduct(response.data);
				setInfo({
					stock: response.data.stock,
					product_id: response.data.id,
				});
			} catch (error) {
				console.log(error);
				return error;
			}
		};
		if (id) {
			fetchProduct();
		}
	}, [id]);
	return (
		<div className="min-h-screen flex flex-col justify-between">
			<Header />
			<div className="flex flex-col">
				{product ? (
					<>
						<Head>
							<title>{product.name} - uShop</title>
						</Head>
						<main className="w-screen flex min-h-max items-center mb-8 lg:my-8 flex-col lg:min-h-[500px] lg:items-start gap-6 lg:flex-row lg:justify-evenly  lg:px-[10%] lg:py-[2%] ">
							<div className="w-full mt-6 sm:w-[500px] sm:h-[500px] sm:p-16 flex flex-col items-center justify-center border-1 border-palette-base-gray500/50">
								{/* product?.banner.map((item, i) => {
					return (
						<img
							src={`/tmp_products/${item}`}
							className="w-full h-full"
						/>
					);
				}) */}
								<CarouselDetail images={product?.banner} />
							</div>
							<div className=" w-[250px] sm:w-[450px] h-full flex lg:w-5/12 ">
								<div className="card-body px-0 py-0  min-h-[250px] lg:min-h-[500px] flex flex-col  gap-6 lg:mt-8 ">
									<div className="grid gap-4 ">
										<Chip color="secondary" size="md" className="lg:ml-5" variant="flat">
											NOVO
										</Chip>
										<h3 className="text-success text-sm font-medium lg:px-6">EM ESTOQUE</h3>
										<h2 className="card-title font-medium max-h-20 lg:text-[28px] lg:tracking-8 lg:px-6 py-2">
											{/* Produto {product?.id.split("-")[2].toUpperCase()}{" "} */}
											{product?.name}
										</h2>
										<div className="card-actions justify-start lg:pl-6 pt-2">
											<div className="badge badge-warning p-3 lg:text-[16px]">
												{/* Marca */}
												{product?.brand.name}
											</div>
											<div className="badge badge-warning p-3 lg:text-[16px]">
												{/* Categoria */}
												{product?.category.name}
											</div>
										</div>
										<Rating
											name="simple-controlled"
											size="large"
											icon={<StarRateRoundedIcon fontSize="inherit" />}
											emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
											value={value}
											className="lg:pl-6"
											onChange={(event, newValue) => {
												setValue(newValue);
											}}
										/>
									</div>
									<h3 className="text-palette-base-gray-800 font-bold flex justify-start lg:pl-6 text-[26px] lg:text-[28px]">
										R$ {product?.price}
									</h3>
									{user?.cart[0]?.cartItems?.find((cartitem) => cartitem.product_id === product.id) ? (
										<button
											className="btn mx-auto btn-square border-transparent bottom-6  bg-palette-primary-light text-palette-base-main w-full"
											onClick={() => toast.info("Esse item ja está no seu carrinho! Verifique Por Favor.")}>
											<DoneIcon />
											Item ja adicionado ao carrinho!
										</button>
									) : (
										<button
											className="btn mx-auto btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-full"
											onClick={() => {
												if (user) {
													handleOpen();
												} else {
													router.push("/login");
												}
											}}>
											<AddShoppingCartIcon />
											Adicionar ao Carrinho
										</button>
									)}
								</div>
							</div>
						</main>
						<article className="w-screen flex min-h-max items-center mb-8 lg:my-8 flex-col lg:min-h-[500px] lg:items-start gap-6  lg:px-[10%] lg:py-[2%]">
							<Divider className="my-1" />
							<div className="w-3/4 my-8 lg:w-2/4 flex flex-col gap-4">
								<h1 className="font-bold text-[28px] tracking-wide ">Consultar CEP</h1>
								<Input
									type="text"
									className="w-[250px]"
									variant="bordered"
									aria-label="consultar_cep"
									endContent={<img src="/assets/svg/truck_delivery.svg" width={32} height={32} alt="truck_delivery" />}
									placeholder="12345-678"
								/>
							</div>
							<Divider className="my-1" />
							<div className="w-3/4 my-8 lg:w-2/4 flex flex-col gap-4">
								<h1 className="font-bold text-[28px] tracking-wide ">Descrição</h1>
								<span className="text-[18px] tracking-wide">
									{product?.description}
									{/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget libero ac nisl porttitor vestibulum id malesuada lacus.
									Suspendisse sollicitudin quis augue egestas mattis. Nunc tincidunt mi in feugiat vehicula. Nam nec interdum elit, et semper
									risus. Nunc consequat nisl vel massa euismod sodales. Praesent sit amet elit ac magna mattis commodo. Ut ut pulvinar diam,
									sed consequat tellus. Pellentesque hendrerit, justo at scelerisque feugiat, tortor mauris consectetur dui, non lobortis
									lacus elit semper sem. Maecenas in pretium mi, eu volutpat enim. Aliquam eu urna massa. Fusce convallis ex eget quam
									sollicitudin, sed fermentum sem fringilla. Vestibulum venenatis magna vel nulla ornare, malesuada tempus urna porta. Nunc et
									diam semper mauris semper laoreet non ut ante. In auctor tincidunt felis, vitae dictum nunc vulputate lobortis. Etiam neque
									odio, vehicula non odio id, ultrices rutrum diam. Ut lacinia mauris sit amet sollicitudin auctor. Nam lacinia augue a
									sagittis vulputate. Ut non leo non quam iaculis convallis eu vel libero. Fusce interdum, diam congue iaculis condimentum,
									sem ante posuere dui, vel mattis lacus ex in metus. Ut non sagittis mi, id varius tellus. Aenean egestas lectus at eros
									semper, sit amet pharetra nunc feugiat. Duis porttitor varius purus nec posuere. Pellentesque pulvinar lorem orci, eget
									fermentum eros ultricies et. Nunc vulputate magna vel magna pretium, ac commodo justo aliquet. Curabitur tempus mollis urna,
									vel sodales ipsum volutpat faucibus. Nunc mollis porttitor augue sed viverra. Donec nec tristique mi. Integer justo magna,
									laoreet id ex a, pulvinar elementum magna. */}
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
									<CarouselCardsProducts products={filterProducts} />
								</div>
							)}
						</div>
						<ModalAddQuantity info={info} isOpen={isOpen} onClose={onClose} />
					</>
				) : (
					<div className="w-full h-[50vh] flex justify-center items-center ">
						<Spinner size="lg" color="success" />
					</div>
				)}
			</div>

			<Footer></Footer>
		</div>
	);
}
