import Footer from "@/components/Footer";
import Header from "@/components/Header/NavBar";
import useStore from "@/data/global_states/useProducts";
import { canSSRAuth } from "@/lib/CanSSRAuth";
import { useMediaQuery } from "@mui/material";
import { Divider, Spinner } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderPage() {
	const user = useStore((state) => state.user);
	const products = useStore((state) => state.products);
	const router = useRouter();
	const { order_id } = router.query;
	const [loading, setLoading] = useState(true);

	const [orderDetails, setOrderDetails] = useState([]);
	console.log(orderDetails);

	useEffect(() => {
		if (user) {
			const orderExist = user?.Order?.find((orderFind) => orderFind.id === order_id);
			if (!orderExist) {
				router.push("/error-404/");
				return;
			}
			if (user?.Order) {
				// Mapear os pedidos do usuário
				console.log(order_id, user);
				const order = user.Order.find((orderFind) => orderFind.id === order_id);
				if (!order) {
					router.push("/error-404/");
					return;
				}

				// Mapear os itens do pedido
				const items = order.orderItems.map((item) => {
					console.log(item);
					// Encontrar o produto correspondente usando o product_id
					const product = products.find((product) => product.id === item.product_id);
					// Retornar um objeto com as informações do item do pedido

					return {
						product: product,
						quantity: item.quantity,
					};
				});

				const address = user.address.find((adr) => adr.id === order.address_id);
				// Retornar um objeto com as informações do pedido
				const orderDetailJson = {
					id: order.id,
					created_at: order.created_at,
					items,
					address: address,
				};

				// Definir o estado com as informações dos pedidos
				setOrderDetails(orderDetailJson);
				setLoading(false);
			}
		}
	}, [user, order_id]);

	return (
		<div className="min-h-[60vh]">
			<Head>
				<title>Pedido - Brisa</title>
			</Head>
			<Header />
			{loading ? (
				<div className="w-full h-[60vh] flex justify-center items-center ">
					<Spinner color="success" className="m-auto" />
				</div>
			) : (
				<main className="w-full min-h-[60vh] bg-palette-base-gray-500 py-[3%]  px-2% lg:px-[15%]">
					<div className="flex flex-col gap-4 min-h-60 p-2 py-4 sm:p-6 w-full shadow-lg rounded-lg bg-palette-base-gray-300">
						{orderDetails ? (
							<>
								<h1 className="text-xl text-palette-base-gray-900 font-medium">
									Pedido {order_id?.split("-")[2].toUpperCase()}
									{order_id?.split("-")[3].toUpperCase()}
								</h1>
								<Divider />
								<div className="h-10 flex items-center gap-2">
									<span className="text-[18px] text-palette-base-gray-900 font-semibold">Status:</span>
									<span className="font-medium text-palette-base-gray-900  text-[16px]">Aguardando Pagamento</span>
								</div>
								<Divider />
								<ul className="w-full max-h-80 overflow-auto flex flex-col gap-6 sm:p-2">
									{orderDetails?.items?.map((product) => {
										return (
											<li className="w-full h-24 rounded-md h flex items-center gap-2 p-3 bg-palette-base-gray-500">
												<img className="w-12 h-12" src={`/tmp_products/${product.product?.banner[0]}`} />
												<div className="">
													<h2 className="font-medium text-left max-w-[60%] line-clamp-2 text-[12px] sm:text-[16px] sm:line-clamp-none sm:max-w-none ">
														{product.product?.name}
													</h2>
													<h2 className="text-[12px]">Quantidade: {product.quantity}</h2>
												</div>
												<div className="w-full">
													<h2 className="text-end text-palette-base-gray-900 font-bold">
														R$ {(product.quantity * Number(product.product?.price.replace(",", "."))).toFixed(2)}
													</h2>
												</div>
											</li>
										);
									})}
								</ul>
								<Divider />
								<div className="w-full h-10 px-4 flex items-center justify-between">
									<h1 className="text-[20px] font-medium">Total: </h1>
									<span className="font-bold text-[18px]">
										R${" "}
										{orderDetails?.items
											?.reduce((total, product) => total + product.quantity * Number(product?.product?.price.replace(",", ".")), 0)
											.toFixed(2)}
									</span>
								</div>
								<Divider />
								<div className="p-2 w-full">
									<div className="flex flex-col gap-2">
										<h1 className="font-bold text-[16px]">Informações do Pedido:</h1>
										<div className="flex gap-2">
											<h2 className="font-medium text-[12px]">Endereço:</h2>
											<div className="flex flex-col">
												<span className="font-bold text-[12px]">{orderDetails.address?.name}</span>
												<span className="font-light text-[12px]">
													{orderDetails.address?.street} /{orderDetails.address?.complement} {orderDetails.address?.number}
												</span>
												<span className="font-light text-[12px]">
													{orderDetails.address?.city}, {orderDetails.address?.state}, {orderDetails.address?.country},{" "}
													{orderDetails.address?.zipcode}
												</span>
											</div>
										</div>
										<div className="flex gap-1 items-center">
											<h2 className="font-medium text-[12px] ">ID do Pedido:</h2>
											<span className="text-[12px]">{orderDetails?.id?.toUpperCase()}</span>
										</div>
										<div className="flex gap-1 items-center">
											<h2 className="font-medium text-[12px] ">Data do Pedido:</h2>
											<span className="text-[12px]">{new Date(orderDetails?.created_at).toLocaleString()}</span>
										</div>
									</div>
								</div>
							</>
						) : (
							<Spinner color="success" />
						)}
					</div>
				</main>
			)}
			<Footer />
		</div>
	);
}
export const getServerSideProps = canSSRAuth(async (context) => {
	return {
		props: {},
	};
});
