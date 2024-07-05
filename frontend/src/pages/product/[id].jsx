import Header from "@/components/Header/NavBar";
import { useRouter } from "next/router";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import CarouselDetail from "@/components/CarouselDetail/carousel_detail";
import { CarouselCardsProducts } from "@/components/products/Carousel";
import Footer from "@/components/Footer";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { Button, Chip, Divider, Input, Spinner, useDisclosure } from "@nextui-org/react";
import { toast } from "react-toastify";
import Head from "next/head";

import useStore from "@/data/global_states/useProducts";
import useFetchProducts from "../../hooks/useFetchProduct";
import { useState } from "react";

const DetailProduct = () => {
	const router = useRouter();
	const { id } = router.query;
	const user = useStore((state) => state.user);
	const { product, filterProducts, info } = useFetchProducts(id);
	const [value, setValue] = useState(2);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleOpen = () => {
		onOpen();
	};

	if (!product) {
		return (
			<div className="w-full h-[50vh] flex justify-center items-center">
				<Spinner size="lg" color="success" />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col justify-between">
			<Header />
			<div className="flex flex-col">
				<Head>
					<title>{product.name} - uShop</title>
				</Head>
				<main className="w-screen flex min-h-max items-center mb-8 lg:my-8 flex-col lg:min-h-[500px] lg:items-start gap-6 lg:flex-row lg:justify-evenly lg:px-[10%] lg:py-[2%]">
					<div className="w-full mt-6 sm:w-[500px] sm:h-[500px] sm:px-16 flex flex-col items-center justify-center border-1 border-palette-base-gray500/50">
						<CarouselDetail images={product?.banner} />
					</div>
					<div className="w-[250px] sm:w-[450px] h-full flex lg:w-5/12">
						<div className="card-body px-0 py-0 min-h-[250px] lg:min-h-[500px] flex flex-col gap-6 lg:mt-8">
							<ProductDetails product={product} value={value} setValue={setValue} />
							<PriceAndActions product={product} user={user} handleOpen={handleOpen} router={router} />
						</div>
					</div>
				</main>
				<AdditionalDetails product={product} router={router} />
				{filterProducts && <RelatedProducts filterProducts={filterProducts} />}
				<ModalAddQuantity info={info} isOpen={isOpen} onClose={onClose} />
			</div>
			<Footer />
		</div>
	);
};

const ProductDetails = ({ product, value, setValue }) => (
	<div className="grid gap-4">
		<Chip color="secondary" size="md" className="lg:ml-5" variant="flat">
			NOVO
		</Chip>
		<h3 className="text-success text-sm font-medium lg:px-6">EM ESTOQUE</h3>
		<h2 className="card-title font-medium max-h-20 lg:text-[28px] lg:tracking-8 lg:px-6 py-2">{product?.name}</h2>
		<div className="card-actions justify-start lg:pl-6 pt-2">
			<div className="badge badge-warning p-3 lg:text-[16px]">{product?.brand.name}</div>
			{product?.categories?.slice(0, 2).map((category, index) => (
				<div key={index} className="badge badge-warning p-3 lg:text-[16px]">
					{category.name}
				</div>
			))}
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
);

const PriceAndActions = ({ product, user, handleOpen, router }) => (
	<div className="flex flex-col gap-4">
		<h3 className="text-palette-base-gray-800 font-bold flex justify-start lg:pl-6 text-[26px] lg:text-[28px]">R$ {product?.price}</h3>
		{user?.cart[0]?.cartItems?.find((cartitem) => cartitem.product_id === product.id) ? (
			<button
				className="btn mx-auto btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-full"
				onClick={() => toast.info("Esse item já está no seu carrinho! Verifique por favor.")}>
				<DoneIcon />
				Item já adicionado ao carrinho!
			</button>
		) : (
			<div className="flex flex-col gap-4">
				<button
					className="btn mx-auto btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-full"
					onClick={() => {
						if (user) {
							console.log("Em Desenvolvimento");
						} else {
							router.push("/login");
						}
					}}>
					<ShoppingCartCheckoutRoundedIcon />
					Comprar Agora
				</button>
				<Button
					variant="flat"
					color="success"
					className="h-12 mx-auto border-transparent w-full"
					onClick={() => {
						if (user) {
							handleOpen();
						} else {
							router.push("/login");
						}
					}}>
					<AddShoppingCartIcon />
					Adicionar ao Carrinho
				</Button>
			</div>
		)}
	</div>
);

const AdditionalDetails = ({ product, router }) => (
	<article className="w-screen flex min-h-max items-center mb-8 lg:my-8 flex-col lg:min-h-[500px] lg:items-start gap-6 lg:px-[10%] lg:py-[2%]">
		<CategorySection product={product} router={router} />
		<Divider className="my-1" />
		<CEPConsultationSection />
		<Divider className="my-1" />
		<DescriptionSection product={product} />
	</article>
);

const CategorySection = ({ product, router }) => (
	<div className="w-3/4 my-8 lg:w-2/4 flex flex-col gap-4">
		<h1 className="font-bold text-[28px] tracking-wide">Categorias</h1>
		<div className="max-w-96 flex gap-4 flex-wrap">
			{product.categories.map((category) => (
				<Chip
					key={category.id}
					color="warning"
					className="tracking-widest cursor-pointer transition-opacity duration-300 hover:opacity-75"
					onClick={() => {
						router.push({
							pathname: "/search_products",
							query: {
								category: category.name,
							},
						});
					}}
					variant="solid">
					{category.name.toUpperCase()}
				</Chip>
			))}
		</div>
	</div>
);

const CEPConsultationSection = () => (
	<div className="w-3/4 my-8 lg:w-2/4 flex flex-col gap-4">
		<h1 className="font-bold text-[28px] tracking-wide">Consultar CEP</h1>
		<Input
			type="text"
			className="w-[250px]"
			variant="bordered"
			aria-label="consultar_cep"
			endContent={<img src="/assets/svg/truck_delivery.svg" width={32} height={32} alt="truck_delivery" />}
			placeholder="12345-678"
		/>
	</div>
);

const DescriptionSection = ({ product }) => (
	<div className="w-3/4 my-8 lg:w-2/4 flex flex-col gap-4">
		<h1 className="font-bold text-[28px] tracking-wide">Descrição</h1>
		<span className="text-[18px] tracking-wide">{product?.description}</span>
	</div>
);

const RelatedProducts = ({ filterProducts }) => (
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
);

export default DetailProduct;
