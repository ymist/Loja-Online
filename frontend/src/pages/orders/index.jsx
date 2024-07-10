import Footer from "@/components/Footer";
import Header from "@/components/Header/NavBar";
import { canSSRAuth } from "@/lib/CanSSRAuth";
import { ShoppingBagRounded } from "@mui/icons-material";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import AccessAlarmsRoundedIcon from "@mui/icons-material/AccessAlarmsRounded";

import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useOrdersDetails from "@/hooks/useOrdersDetails";

const OrdersPage = () => {
	const router = useRouter();
	const { orderDetails, loading } = useOrdersDetails();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Head>
				<title>Meus Pedidos - uShop</title>
			</Head>
			<Header />
			<main className="flex-grow bg-palette-base-gray-500 pb-[5%] pt-[2%] px-[1%] lg:px-[15%] ">
				<div className="shadow-md duration-300 hover:shadow-lg bg-palette-base-gray-100 rounded-lg min-h-[550px] flex flex-col gap-4">
					<h2 className="text-xl font-medium text-palette-base-gray-900 w-full flex gap-2 items-center p-4 ">
						<ShoppingBagRounded fontSize="large" />
						Meus Pedidos
					</h2>
					<Divider />
					{orderDetails.length > 0 ? (
						<ul className="w-full flex flex-col h-full gap-4 p-2 from-palette-base-gray-100 to-palette-base-gray-200">
							{orderDetails.map((order) => (
								<li
									key={order.id}
									className="shadow-sm rounded-md border-palette-base-gray-500 duration-300 hover:border-palette-base-gray-600/50 border-2 ">
									{/* Cabeçalho com a data de criação */}
									<div className=" w-full flex justify-between p-3 bg-palette-base-gray-500 duration-300 rounded-t-sm">
										<h2 className="ml-2 font-medium text-palette-base-gray-900">
											Pedido {order.id.split("-")[2].toUpperCase()}
											{order.id.split("-")[3].toUpperCase()}
										</h2>
										<h2>
											{new Date(order.created_at).toLocaleDateString("pt-BR", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</h2>
									</div>
									{/* Renderização de cada produto como linha separada */}
									{order.items.map((item, index) => (
										<Fragment key={item.product.id}>
											<div
												className="w-full cursor-pointer flex items-center gap-3 md:gap-6 p-2 lg:p-4 "
												onClick={() => router.push(`/order/${order.id}`)}>
												<Tooltip color="default" content={<h2>Ir para a página do produto</h2>}>
													<div onClick={() => router.push("/product/" + item.product.id)}>
														<img
															className="w-20 h-20 lg:w-28 lg:h-28 p-2 object-contain border-palette-base-gray-500 duration-300 hover:border-palette-base-gray-600 border-2 rounded-lg"
															src={`/tmp_products/${item.product.banner[0]}`}
														/>
													</div>
												</Tooltip>

												<div className="flex flex-col gap-2 max-w-52 sm:max-w-72 lg:max-w-[95%] text-wrap">
													<div className="flex items-center gap-2">
														<AccessAlarmsRoundedIcon fontSize="small" />
														<h2 className="font-semibold  text-success-500 tracking-wide"> Aguardando Pagamento</h2>
													</div>
													<h4 className=" text-[10px] lg:text-sm text-palette-base-gray-900 font-normal">
														Seu pedido sairá para entrega após a confirmação do pagamento!
													</h4>
												</div>
											</div>
											{index < order.items.length - 1 && <Divider />} {/* Adiciona divider exceto no último item */}
										</Fragment>
									))}
								</li>
							))}
						</ul>
					) : (
						<div className="w-full h-96 flex flex-col gap-6 justify-center items-center">
							{/* <ShoppingBag size={80} /> */}
							<img src="/assets/svg/empty_order.svg" className="w-[75%] h-[75%]" />
							<div className="flex flex-col items-center gap-2">
								<h2 className="text-lg sm:text-xl">Você ainda não tem pedidos!</h2>
								<h4 className="text-palette-base-gray-600 text-sm text-center sm:text-md">Descubra os melhores produtos para você.</h4>
							</div>
							<Button
								size="sm"
								onClick={() => {
									router.push("/search_products");
								}}
								color="success"
								className="w-auto px-16 py-5 text-palette-base-main ">
								<h4 className="font-medium">Descobrir Produtos</h4>
							</Button>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export const getServerSideProps = canSSRAuth(async () => {
	return { props: {} };
});

export default OrdersPage;
