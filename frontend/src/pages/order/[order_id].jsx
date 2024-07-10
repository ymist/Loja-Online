import Footer from "@/components/Footer";
import Header from "@/components/Header/NavBar";
import useOrderDetails from "@/hooks/useOrderDetails";
import { canSSRAuth } from "@/lib/CanSSRAuth";
import { Divider, Spinner } from "@nextui-org/react";
import Head from "next/head";
import React from "react";

const OrderPage = () => {
	const { loading, orderDetails } = useOrderDetails();

	return (
		<div className="h-screen flex flex-col justify-between">
			<Head>
				<title>Pedido - uShop</title>
			</Head>
			<Header />
			{loading ? (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner color="success" className="m-auto" />
				</div>
			) : (
				<main className="w-full h-full bg-palette-base-gray-500 py-[3%] px-2% lg:px-[15%]">
					{orderDetails ? <OrderDetails orderDetails={orderDetails} /> : <Spinner color="success" />}
				</main>
			)}
			<Footer />
		</div>
	);
};

const OrderDetails = ({ orderDetails }) => {
	return (
		<div className="flex flex-col gap-4 min-h-60 p-2 py-4 sm:p-6 w-full shadow-lg rounded-lg bg-palette-base-gray-100">
			<h1 className="text-xl text-palette-base-gray-900 font-medium">Pedido {orderDetails.id.toUpperCase()}</h1>
			<Divider />
			<div className="h-10 flex items-center gap-2">
				<h2 className="text-[18px] text-palette-base-gray-900 font-semibold">Status:</h2>
				<h2 className="font-medium text-palette-base-gray-900 text-[16px]">Aguardando Pagamento</h2>
			</div>
			<Divider />
			<ul className="w-full max-h-80 overflow-auto flex flex-col gap-6 sm:p-2">
				{orderDetails.items.map((product) => (
					<OrderItem key={product.product.id} product={product} />
				))}
			</ul>
			<Divider />
			<div className="w-full h-10 px-4 flex items-center justify-between">
				<h1 className="text-[20px] font-medium">Total: </h1>
				<h2 className="font-bold text-[18px]">R$ {orderDetails.items.reduce((total, product) => total + product.price, 0).toFixed(2)}</h2>
			</div>
			<Divider />
			<div className="p-2 w-full">
				<OrderInfo orderDetails={orderDetails} />
			</div>
		</div>
	);
};

const OrderItem = ({ product }) => {
	return (
		<li className="w-full h-24 rounded-md flex items-center gap-2 p-3 bg-palette-base-gray-500">
			<img className="w-16 h-16" src={`/tmp_products/${product.product.banner[0]}`} alt={product.product.name} />
			<div className="w-[90%]">
				<h2 className="font-medium text-left w-full line-clamp-2 text-[12px] sm:text-[16px] sm:line-clamp-none sm:max-w-none">
					{product.product.name}
				</h2>
				<h2 className="text-[12px]">Quantidade: {product.quantity}</h2>
			</div>
			<div className="w-full">
				<h2 className="text-end text-palette-base-gray-900 font-bold">R$ {product.price.toFixed(2)}</h2>
			</div>
		</li>
	);
};

const OrderInfo = ({ orderDetails }) => {
	return (
		<div className="flex flex-col gap-2">
			<h1 className="font-bold text-[16px]">Informações do Pedido:</h1>
			<div className="flex gap-2">
				<h2 className="font-medium text-[12px]">Endereço:</h2>
				<div className="flex flex-col">
					<span className="font-bold text-[12px]">{orderDetails.order.name}</span>
					<span className="font-light text-[12px]">
						{orderDetails.order?.street} /{orderDetails.order?.complement} {orderDetails.order?.number}
					</span>
					<span className="font-light text-[12px]">
						{orderDetails.order?.city}, {orderDetails.order?.state}, {orderDetails.order?.country}, {orderDetails.order?.zipcode}
					</span>
				</div>
			</div>
			<div className="flex gap-1 items-center">
				<h2 className="font-medium text-[12px] ">ID do Pedido:</h2>
				<span className="text-[12px]">{orderDetails.id.toUpperCase()}</span>
			</div>
			<div className="flex gap-1 items-center">
				<h2 className="font-medium text-[12px] ">Data do Pedido:</h2>
				<span className="text-[12px]">{new Date(orderDetails.created_at).toLocaleString()}</span>
			</div>
		</div>
	);
};

export const getServerSideProps = canSSRAuth(async (context) => {
	return {
		props: {},
	};
});

export default OrderPage;
