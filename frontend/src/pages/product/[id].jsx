import Header from "@/components/Header/NavBar";
import { useRouter } from "next/router";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Rating, useMediaQuery } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import CarouselDetail from "@/components/CarouselDetail/carousel_detail";
import { CarouselCardsProducts } from "@/components/products/Carousel";
import Footer from "@/components/Footer";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { Button, Chip, Divider, Input, Progress, Spinner, Tab, Tabs, Tooltip, useDisclosure, Pagination, Avatar } from "@nextui-org/react";
import { toast } from "react-toastify";
import Head from "next/head";

import useStore from "@/data/global_states/useProducts";
import useFetchProducts from "../../hooks/useFetchProduct";
import { useState } from "react";
import { format } from "date-fns";

const DetailProduct = () => {
	const router = useRouter();
	const { id } = router.query;
	const user = useStore((state) => state.user);
	const { product, filterProducts, info } = useFetchProducts(id);
	console.log(product);
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
							<ProductDetails product={product} />
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

const ProductDetails = ({ product }) => (
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
		<Tooltip color="warning" content={<h2>{product.media_rating}</h2>}>
			<span className="w-min">
				<Rating
					name="simple-controlled"
					size="large"
					sx={{
						padding: " 0px 1.5em",
					}}
					icon={<StarRateRoundedIcon fontSize="inherit" />}
					emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
					value={product.media_rating}
					precision={0.5}
					readOnly
					className="lg:pl-6"
				/>
			</span>
		</Tooltip>
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
		<TabsDescriptionOrReviews product={product} />
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

const TabsDescriptionOrReviews = ({ product }) => (
	<Tabs variant="underlined" size="lg">
		<Tab key="description" className="w-full px-[10%] lg:px-0 " title={<h2>Descrição</h2>}>
			<DescriptionSection product={product} />
		</Tab>
		<Tab key="comments" className="w-full" title={<h2>{`Avaliações (${product.comments.length}) `}</h2>}>
			<CommentsSection product={product} />
		</Tab>
	</Tabs>
);

const DescriptionSection = ({ product }) => (
	<div className="w-full flex flex-col gap-4">
		<h1 className="font-bold text-[28px] tracking-wide">Descrição</h1>
		<span className="text-[18px] tracking-wide">{product?.description}</span>
	</div>
);

const CommentsSection = ({ product }) => (
	<div className="flex flex-col gap-4">
		<AverageRatingsSection product={product} />
		<CommentSection product={product} />
	</div>
);

const AverageRatingsSection = ({ product }) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return (
		<div className={`${isDesktop ? "py-0" : "py-6"} w-full min-h-48 border-t border-b flex flex-col md:flex-row border-palette-base-gray-500`}>
			<div className="flex flex-col items-center justify-center w-full md:w-2/5">
				<h2 className="my-1 text-sm">Média de Avaliações</h2>
				<h3 className="font-bold text-5xl my-3">{product.media_rating}/5</h3>
				<span className="w-min my-1 ">
					<Rating
						name="simple-controlled"
						size="large"
						sx={{
							padding: " 0px 1.5em",
						}}
						icon={<StarRateRoundedIcon fontSize="inherit" />}
						emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						value={product.media_rating}
						precision={0.5}
						readOnly
						className="lg:pl-6"
					/>
				</span>
				<h2 className="text-palette-base-gray-700 text-sm">({product.comments.length} Avaliações)</h2>
			</div>
			<Divider className={`${isDesktop ? "my-0" : "my-4"}`} orientation={isDesktop ? "vertical" : "horizontal"} />
			<div className=" w-full md:w-3/5 flex flex-col gap-2 justify-center items-center">
				<div className=" flex gap-2 sm:gap-5 w-full items-center justify-center">
					<Rating
						name="simple-controlled"
						size="small"
						icon={<StarRateRoundedIcon fontSize="inherit" />}
						emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						value={5}
						readOnly
						className="lg:pl-6"
					/>
					<Tooltip content={<h2>{(product.comments.filter((comment) => comment.rating === 5).length / product.comments.length) * 100}%</h2>}>
						<Progress
							aria-label="5 star"
							size="small"
							value={(product.comments.filter((comment) => comment.rating === 5).length / product.comments.length) * 100}
							color="default"
							className="max-w-40 cursor-pointer"
						/>
					</Tooltip>
					<h2 className="text-palette-base-gray-700 text-sm">{`${product.comments.filter((comment) => comment.rating === 5).length} Avaliações`} </h2>
				</div>
				<div className=" flex gap-2 sm:gap-5 w-full items-center justify-center">
					<Rating
						name="simple-controlled"
						size="small"
						icon={<StarRateRoundedIcon fontSize="inherit" />}
						emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						value={4}
						readOnly
						className="lg:pl-6"
					/>
					<Tooltip content={<h2>{(product.comments.filter((comment) => comment.rating === 4).length / product.comments.length) * 100}%</h2>}>
						<Progress
							aria-label="4 star"
							size="small"
							value={(product.comments.filter((comment) => comment.rating === 4).length / product.comments.length) * 100}
							color="default"
							className="max-w-40 cursor-pointer"
						/>
					</Tooltip>
					<h2 className="text-palette-base-gray-700 text-sm">{`${product.comments.filter((comment) => comment.rating === 4).length} Avaliações`} </h2>
				</div>
				<div className=" flex gap-2 sm:gap-5 w-full items-center justify-center">
					<Rating
						name="simple-controlled"
						size="small"
						icon={<StarRateRoundedIcon fontSize="inherit" />}
						emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						value={3}
						readOnly
						className="lg:pl-6"
					/>
					<Tooltip content={<h2>{(product.comments.filter((comment) => comment.rating === 3).length / product.comments.length) * 100}%</h2>}>
						<Progress
							aria-label="3 star"
							size="small"
							value={(product.comments.filter((comment) => comment.rating === 3).length / product.comments.length) * 100}
							color="default"
							className="max-w-40 cursor-pointer"
						/>
					</Tooltip>
					<h2 className="text-palette-base-gray-700 text-sm">{`${product.comments.filter((comment) => comment.rating === 3).length} Avaliações`} </h2>
				</div>
				<div className=" flex flex gap-2 sm:gap-5 w-full items-center justify-center">
					<Rating
						name="simple-controlled"
						size="small"
						icon={<StarRateRoundedIcon fontSize="inherit" />}
						emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						value={2}
						readOnly
						className="lg:pl-6"
					/>
					<Tooltip content={<h2>{(product.comments.filter((comment) => comment.rating === 2).length / product.comments.length) * 100}%</h2>}>
						<Progress
							aria-label="2 star"
							size="small"
							value={(product.comments.filter((comment) => comment.rating === 2).length / product.comments.length) * 100}
							color="default"
							className="max-w-40 cursor-pointer"
						/>
					</Tooltip>
					<h2 className="text-palette-base-gray-700 text-sm">{`${product.comments.filter((comment) => comment.rating === 2).length} Avaliações`} </h2>
				</div>
				<div className=" flex gap-2 sm:gap-5 w-full items-center justify-center">
					<Rating
						name="simple-controlled"
						size="small"
						icon={<StarRateRoundedIcon fontSize="inherit" />}
						emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						value={1}
						readOnly
						className="lg:pl-6"
					/>
					<Tooltip content={<h2>{(product.comments.filter((comment) => comment.rating === 1).length / product.comments.length) * 100}%</h2>}>
						<Progress
							aria-label="1 star"
							size="small"
							value={(product.comments.filter((comment) => comment.rating === 1).length / product.comments.length) * 100}
							color="default"
							className="max-w-40 cursor-pointer"
						/>
					</Tooltip>
					<h2 className="text-palette-base-gray-700 text-sm">{`${product.comments.filter((comment) => comment.rating === 1).length} Avaliações`} </h2>
				</div>
			</div>
			<div></div>
		</div>
	);
};

const CommentSection = ({ product }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentComments = product.comments.slice(startIndex, startIndex + itemsPerPage);

	const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

	return (
		<div className="flex flex-col gap-4">
			{currentComments.map((comment) => (
				<div key={comment.id} className="flex gap-2 p-4">
					<div className="w-2/6 flex flex-col justify-center items-center gap-2">
						<Avatar isBordered color={colors[Math.floor(Math.random() * colors.length)]} />
						<h2 className="font-medium text-sm mt-1 text-palette-base-gray-900">{comment.user_name}</h2>
						<h3 className="text-[11px] text-palette-base-gray-700"> {format(new Date(comment.modified_at), "dd MMM yyyy")} </h3>
					</div>
					<div className="w-4/6 flex flex-col gap-3 ">
						<Rating
							name={`rating-${comment.id}`}
							size="small"
							value={comment.rating}
							readOnly
							icon={<StarRateRoundedIcon fontSize="inherit" />}
							emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
						/>
						<div className="flex items-center gap-1">
							<img src="/assets/images/verified.png" alt="verified_icon" className="w-[18px] h-[18px]" />
							<h2 className="text-sm text-success-400 ">Compra Verificada</h2>
						</div>
						<h2 className="text-palette-base-gray-900">{comment.title}</h2>
						<h3 className="text-palette-base-gray-800 text-sm">{comment.description}</h3>
					</div>
				</div>
			))}
			<div className="flex justify-center mt-4">
				<Pagination
					isCompact
					color="success"
					showControls
					total={Math.ceil(product.comments.length / itemsPerPage)}
					initialPage={1}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

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
