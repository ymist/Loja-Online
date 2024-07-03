import Footer from "@/components/Footer";
import Header from "@/components/Header/NavBar";
import useStore from "@/data/global_states/useProducts";
import { canSSRAuth } from "@/lib/CanSSRAuth";
import { ShoppingBagRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { Avatar, AvatarGroup, Divider } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrdersPage() {
	const user = useStore((state) => state.user);
	const products = useStore((state) => state.products);
	const router = useRouter();

	const [orderDetails, setOrderDetails] = useState([]);
	console.log(orderDetails);

	const isSmallScreen = useMediaQuery("(max-width:1023px)");

	useEffect(() => {
		if (user?.order) {
			// Mapear os pedidos do usuário
			const orderDetailsArray = user.order.map((order) => {
				// Mapear os itens do pedido
				const items = order.orderItems.map((item) => {
					// Encontrar o produto correspondente usando o product_id
					const product = products.find((product) => product.id === item.product_id);
					// Retornar um objeto com as informações do item do pedido
					return {
						product,
						quantity: item.quantity,
					};
				});

				const address = user.address.find((adr) => adr.id === order.address_id);
				// Retornar um objeto com as informações do pedido
				return {
					id: order.id,
					items,
					address: address,
				};
			});

			// Definir o estado com as informações dos pedidos
			setOrderDetails(orderDetailsArray);
		}
	}, [user]);

	return (
		<div className="h-[87.7vh]">
			<Head>
				<title>Meus Pedidos - uShop</title>
			</Head>
			<Header />
			<main className="w-full bg-palette-base-gray-500 min-h-full pb-[5%] pt-[2%] px-[1%] lg:px-[20%] ">
				<div className="shadow-2xl p-3 bg-palette-base-gray-100 rounded-lg w-full min-h-full flex flex-col gap-4">
					<h2 className="text-xl font-medium text-palette-base-gray-900 w-full flex gap-2 items-center p-2 ">
						<ShoppingBagRounded fontSize="large" />
						Meus Pedidos
					</h2>
					<Divider />
					{orderDetails.length > 0 ? (
						<ul className=" w-full flex flex-col h-full gap-4">
							{orderDetails?.map((order) => (
								<>
									<li
										className="w-full flex cursor-pointer"
										onClick={() => {
											router.push(`/order/${order.id}`);
										}}
										key={order.id}>
										<div className="w-full flex items-center">
											<AvatarGroup
												color="default"
												className="lg:ml-4 flex justify-start w-20 lg:w-28"
												isBordered
												max={isSmallScreen ? 1 : 2}>
												{order?.items.map((item) => (
													<Avatar
														size="sm"
														className="text-palette-base-main"
														key={item?.product?.id}
														// src={`/produto-de-beleza-e-cosmeticos-com-tons-rosados-suaves.png`}
														src={`/tmp_products/${item.product.banner[0]}`}
													/>
												))}
											</AvatarGroup>
											<Divider orientation="vertical" />
											<div className="flex flex-col gap-2 max-w-64 sm:max-w-none truncate md:max-w-none ">
												<span className="ml-2 font-medium text-[12px] lg:text-[16px]   text-palette-base-gray-900">
													Pedido {order?.id.split("-")[2].toUpperCase()}
													{order?.id.split("-")[3].toUpperCase()}
												</span>
												<span className="ml-2 text-[12px] lg:text-[16px]   text-palette-base-gray-900 font-light ">
													Produto {order?.items[0]?.product?.id.split("-")[2].toUpperCase()}{" "}
												</span>
												<span className="text-[14px] font-medium ml-2 text-success-600">Aguardando Pagamento</span>
											</div>
										</div>
									</li>
									<Divider />
								</>
							))}
						</ul>
					) : (
						<div className="w-full h-96 flex flex-col gap-6  justify-center items-center">
							<ShoppingBag size={80} />
							<span className="text-2xl  ">Sem Pedidos</span>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}
export const getServerSideProps = canSSRAuth(async (context) => {
	return {
		props: {},
	};
});
