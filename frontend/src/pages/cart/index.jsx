import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStore from "@/data/global_states/useProducts";
import TableCart from "@/components/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteSection,
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import Head from "next/head";
import { HomeIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BackButton from "@/components/ui/back_button";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);
	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);
	const inicialize = useStore((state) => state.inicialize);
	const router = useRouter();

	const { isOpen: isOpenModalConfirmPurchase, onOpen: onOpenModalConfirmPurchase, onClose: onCloseModalConfirmPurchase } = useDisclosure();

	const handleOpenModal = () => {
		onOpenModalConfirmPurchase();
	};

	const {
		handleSubmit,
		setError,
		clearErrors,
		control,
		formState: { errors },
	} = useForm({ mode: "onBlur" });

	const handleConfirmPurchase = async (data) => {
		setLoadingButton(true);

		const existAddress = user.address.find((addr) => addr.id === data?.address);

		if (!existAddress) {
			setError("address", { message: "Insira um endereço válido!" });
			return;
		}

		const finishCart = await apiClient.post("/finish-cart", {
			user_id: user.id,
			address_id: data.address,
		});

		if (finishCart.status === 200) {
			onCloseModalConfirmPurchase();
			setLoadingButton(false);
			toast.success("Pedido Criado com sucesso!");
			await inicialize();
			router.push("/orders");
			return;
		} else {
			setLoadingButton(false);
			onCloseModalConfirmPurchase();
			toast.error("Erro ao gerar pedido, verifique seus daods!");
			return;
		}
	};

	useEffect(() => {
		if (user?.id && user?.cart && user?.cart?.[0]?.cartItems?.length > 0) {
			setCart([]);
			const response = async () => {
				const updatedCart = await Promise.all(
					user.cart[0].cartItems.map(async (item) => {
						const product = await apiClient.get("/product/" + item.product_id);
						return {
							...product.data,
							cartItemId: item.id,
							quantity: item.quantity,
						};
					}),
				);

				setCart(updatedCart);
				setLoading(false);
			};
			response();
		} else {
			setLoading(false); // Remova esta linha do bloco if e mova para fora
		}
	}, [user]);

	return (
		<div className="min-h-screen bg-palette-base-gray-500">
			<Head>
				<title>
					Carrinho{" "}
					{"(" +
						cart.reduce((total, objeto) => {
							return total + objeto.quantity;
						}, 0) +
						")"}{" "}
					- uShop
				</title>
			</Head>
			<main className="h-screen overflow-auto">
				<Header />
				<div className="w-screen min-h-screen lg:h-full py-10 overflow-auto md:p-5 flex lg:gap-12 ">
					<div className="w-full h-full flex flex-col items-center gap-4 ">
						{/* <Paper
							elevation={6}
							sx={{
								width: "100%",
								padding: "1em 2em",
								background: "#1a907f",
							}}>
							<h1 className="font-normal italic text-2xl flex items-center justify-start gap-3 text-palette-base-main ">
								<ShoppingCartIcon />
								Carrinho
							</h1>
						</Paper> */}
						{loading ? (
							<Paper elevation={6} className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center">
								<Spinner size="lg" color="success" />
							</Paper>
						) : user ? (
							cart.length > 0 ? (
								<TableCart products={cart} user={user} />
							) : (
								<Paper elevation={6} className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center">
									<img src="/assets/svg/ecommerce-cart (1).svg" className="w-[60%] h-[60%] mr-4" />

									<h1 className="text-palette-primary-dark font-light sm: text-3xl lg:text-5xl ">Carrinho Vazio</h1>
								</Paper>
							)
						) : (
							<div className=" w-full lg:w-4/6  bg-palette-base-gray-200 rounded-md">
								<BackButton />
								<div className="flex flex-col gap-8 justify-center items-center pb-10">
									<motion.img
										src="/assets/svg/sapiens.svg"
										className="w-[80%] h-[80%] sm:w-[45%] sm:h-[45%] 2xl:w-[40%] 2xl:h-[40%] "
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5 }}
									/>
									<motion.h1
										className="text-palette-base-gray-800 tracking-normal font-normal text-2xl lg:text-4xl"
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5 }}>
										Faça login para ver seu carrinho!
									</motion.h1>
									<motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
										<Button
											onClick={() => {
												router.push("/login");
											}}
											size=""
											className="w-auto px-24 text-palette-base-main cursor-pointer"
											color="success">
											Fazer Login
										</Button>
									</motion.div>
								</div>
							</div>
						)}
					</div>
					{cart.length > 0 && (
						<div className="hidden lg:block w-2/5 h-full px-5 rounded-md ">
							<Paper className="w-full h-60 flex flex-col" elevation={6}>
								<Paper elevation={3} className="h-14 w-full flex items-center justify-center bg-palette-primary-main">
									<h1 className="font-normal text-xl flex items-center justify-start gap-3 text-palette-base-main ">Resumo da Compra</h1>
								</Paper>
								<div className="w-full h-100px p-4 flex justify-between">
									<span className="font-bold text-text-dark-grey_900/90">
										Produtos{" "}
										{"(" +
											cart.reduce((total, objeto) => {
												return total + objeto.quantity;
											}, 0) +
											")"}
									</span>
									<span className="font-bold text-text-dark-grey_900/90">
										R${" "}
										{cart.reduce((total, objeto) => {
											const totalItems = Number(total);
											const price = Number(objeto.price.replace(",", "."));

											let totalCompra = totalItems + price * objeto.quantity;
											totalCompra = parseFloat(totalCompra);
											return totalCompra.toFixed(2);
										}, 0)}
									</span>
								</div>
								<div className="w-full h-100px p-4 flex justify-between">
									<h2 className="font-medium text-xl text-text-dark-grey_900">Total</h2>
									<span className="font-medium text-xl text-text-dark-grey_900">
										R${" "}
										{cart?.reduce((total, objeto) => {
											const totalItems = Number(total);
											const price = Number(objeto.price.replace(",", "."));

											let totalCompra = totalItems + price * objeto.quantity;
											totalCompra = parseFloat(totalCompra);
											return totalCompra.toFixed(2);
										}, 0)}
									</span>
								</div>
								<div className="w-full px-3">
									<Button
										className="w-full text-palette-base-main font-medium   cursor-pointer"
										size="lg"
										onClick={() => {
											handleOpenModal();
										}}
										color="success">
										Confirmar Compra
									</Button>
								</div>
							</Paper>
						</div>
					)}
				</div>
				{cart.length > 0 && (
					<div
						className={`w-full rounded-md absolute bottom-0 left-0 z-10 lg:hidden ${cart.length > 0 ? "overflow-auto" : ""}`}
						style={{ maxHeight: "300px" }}>
						<Paper className="w-full h-52 flex flex-col ">
							<Paper elevation={3} className="h-10 w-full flex items-center justify-center bg-palette-primary-main">
								<h1 className="font-normal text-base flex items-center justify-start gap-3 text-palette-base-main ">Resumo da Compra</h1>
							</Paper>
							<div className="w-full h-70px py-2 px-4 flex justify-between">
								<span className="font-bold text-base text-text-dark-grey_900/90">
									Produtos
									{"(" +
										cart.reduce((total, objeto) => {
											return total + objeto.quantity;
										}, 0) +
										")"}
								</span>
								<span className="font-bold text-base  text-text-dark-grey_900/90">
									R${" "}
									{cart.reduce((total, objeto) => {
										const totalItems = Number(total);
										const price = Number(objeto.price.replace(",", "."));

										let totalCompra = totalItems + price * objeto.quantity;
										totalCompra = parseFloat(totalCompra);
										return totalCompra.toFixed(2);
									}, 0)}
								</span>
							</div>
							<div className="w-full h-40px px-4 py-4 flex justify-between">
								<h2 className="font-medium text-base text-text-dark-grey_900">Total</h2>
								<span className="font-medium text-base text-text-dark-grey_900">
									R${" "}
									{cart.reduce((total, objeto) => {
										const totalItems = Number(total);
										const price = Number(objeto.price.replace(",", "."));

										let totalCompra = totalItems + price * objeto.quantity;
										totalCompra = parseFloat(totalCompra);
										return totalCompra.toFixed(2);
									}, 0)}
								</span>
							</div>
							<div className="w-full px-3">
								<Button
									className="w-full text-palette-base-main font-medium   cursor-pointer"
									size="md"
									onClick={() => {
										handleOpenModal();
									}}
									color="success">
									Confirmar Compra
								</Button>
							</div>
						</Paper>
					</div>
				)}

				{isOpenModalConfirmPurchase && (
					<Modal backdrop="blur" isOpen={isOpenModalConfirmPurchase} onClose={onCloseModalConfirmPurchase}>
						<ModalContent>
							<ModalHeader className="flex gap-1 ">Deseja confirmar sua compra e seguir para o acompanhamento do pedido?</ModalHeader>
							<ModalBody>
								<form onSubmit={handleSubmit(handleConfirmPurchase)} className="p-4 flex flex-col gap-4 ">
									<Controller
										name="address"
										control={control}
										render={({ field }) => (
											<Autocomplete
												label="Endereços"
												{...field}
												placeholder="Selecione seu endereço!"
												variant="bordered"
												defaultItems={user?.address}
												labelPlacement="outside"
												className="w-full"
												autoFocus={false}
												onSelectionChange={(selectedItem) => {
													field.onChange(selectedItem); // Atualiza o valor no campo do react-hook-form
												}}
												isInvalid={!!errors.address?.message}
												errorMessage={errors.address?.message}>
												{(item) => (
													<AutocompleteItem key={item.id} textValue={item.name}>
														<li className="flex justify-center items-center w-full rounded-md h-[84px px-1 gap-2 py-1 md:px-4 md:gap-4 md:py-2 ">
															<span className="flex flex-col text-ellipsis text-center items-center lg:text-sm gap-1 md:gap-2 w-16 text-[10px] ">
																<HomeIcon fontSize="small" /> {item.name}{" "}
															</span>
															<Divider orientation="vertical" />
															<div className="w-10/12 flex gap-2 items-center">
																<div className="max-w-36 md:max-w-none ">
																	<h3 className="text-[12px] md:text-sm truncate whitespace-normal">
																		{item.street} - {item.number}
																	</h3>
																	<span className="text-[12px] truncate whitespace-nowrap">
																		{item.city} - {item.state}{" "}
																	</span>
																	<span className="text-[12px] truncate whitespace-nowrap">{item.zipcode}</span>
																</div>
															</div>
														</li>
													</AutocompleteItem>
												)}
											</Autocomplete>
										)}
									/>

									<Button className="w-full text-palette-base-main cursor-pointer" type="submit" color="success">
										{loadingButton ? <Spinner color="success" /> : <span>Confirmar Compra!</span>}
									</Button>
									<Button variant="ghost" color="danger" className="w-full" onClick={onCloseModalConfirmPurchase}>
										Cancelar
									</Button>
								</form>
							</ModalBody>
						</ModalContent>
					</Modal>
				)}
			</main>
		</div>
	);
}
