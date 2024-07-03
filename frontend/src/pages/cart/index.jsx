import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStore from "@/data/global_states/useProducts";
import { Paper, Drawer, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { Autocomplete, AutocompleteItem, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import { ChevronLeft, HomeIcon, ShoppingBag } from "lucide-react";
import ListProducts from "@/components/products/ListProducts/list_products";
import SwipeableEdgeDrawer from "@/components/ui/drawer_custom";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);
	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);
	const [cep, setCep] = useState(null);
	const [frete, setFrete] = useState("0.00");
	const inicialize = useStore((state) => state.inicialize);
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width:1024px)");
	console.log(isDesktop);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const { isOpen: isOpenModalConfirmPurchase, onOpen: onOpenModalConfirmPurchase, onClose: onCloseModalConfirmPurchase } = useDisclosure();

	const handleOpenModal = () => {
		onOpenModalConfirmPurchase();
	};
	const handleCloseModal = () => {
		clearErrors("address");
		setLoadingButton(false);
		onCloseModalConfirmPurchase();
	};

	const handleCep = (e) => {
		setCep(e);
		if (e.length === 8) {
			setFrete("24.99");
		} else {
			setFrete("0");
			return;
		}
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
		console.log(data);
		const existAddress = user.address.find((addr) => addr.id === data?.address);

		if (!existAddress) {
			setError("address", { message: "Insira um endereço válido!" });
			return;
		}

		try {
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
			} else {
				setLoadingButton(false);
				onCloseModalConfirmPurchase();
				toast.error("Erro ao gerar pedido, verifique seus dados!");
			}
		} catch (error) {
			console.error("Error confirming purchase:", error);
			setLoadingButton(false);
			onCloseModalConfirmPurchase();
			toast.error("Erro ao gerar pedido, verifique seus dados!");
		}
	};

	useEffect(() => {
		const fetchCartDetails = async () => {
			if (user?.id && user?.cart && user?.cart?.[0]?.cartItems?.length > 0) {
				const updatedCart = await Promise.all(
					user.cart[0].cartItems.map(async (item) => {
						try {
							const product = await apiClient.get("/product/" + item.product_id);
							return {
								...product.data,
								cartItemId: item.id,
								quantity: item.quantity,
							};
						} catch (error) {
							console.error("Error fetching product details:", error);
							return null;
						}
					}),
				);

				setCart(updatedCart.filter(Boolean)); // Filter out any null values from failed requests
				setLoading(false);
			} else {
				setLoading(false);
			}
		};

		fetchCartDetails();
	}, [user]);

	const totalQuantity = cart.reduce((total, obj) => total + obj.quantity, 0);

	if (loading) {
		return (
			<div className="min-h-screen w-screen bg-palette-base-gray-500 flex flex-col">
				<Header />
				<main className="flex-grow flex flex-col items-center justify-center">
					<Paper elevation={6} className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center">
						<Spinner size="lg" color="success" />
					</Paper>
				</main>
				<Footer className="mt-auto" />
			</div>
		);
	}
	const drawerContent = (
		<div className="w-full p-4 flex flex-col gap-4 bg-palette-base-main shadow-md rounded-lg">
			<div className="w-full flex justify-between items-center">
				<h1 className="text-xl text-palette-base-gray-900 font-semibold">Resumo da Compra</h1>
				<ShoppingBag />
			</div>
			<Divider />
			<div className="text-md font-medium text-palette-base-gray-900 flex justify-between w-full">
				<h2 className="text-palette-base-gray-900">Calcular Frete</h2>
				<img className="w-6 h-6" src="/assets/svg/truck_delivery.svg" />
			</div>
			<Input variant="bordered" type="text" placeholder="CEP" aria-label="Input de CEP" onValueChange={handleCep} value={cep} />
			<Divider />
			<div className="w-full flex min-h-[20%] flex-col justify-between">
				<div className="flex flex-col h-min">
					<div className="flex justify-between">
						<h2 className="text-palette-base-gray-900">Subtotal:</h2>
						<h2 className="text-palette-base-gray-900">
							R$ {cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0).toFixed(2)}
						</h2>
					</div>
					<div className="flex justify-between">
						<h2 className="text-palette-base-gray-900 font-light">Descontos:</h2>
						<h2 className="text-palette-base-gray-900 font-light">R$ 0.00</h2>
					</div>
					<div className="flex justify-between">
						<h2 className="text-palette-base-gray-900 font-light">Frete:</h2>
						<h2 className="text-palette-base-gray-900 font-light">R$ {frete}</h2>
					</div>
				</div>
				<div className="w-full flex justify-between">
					<h2 className="text-palette-base-gray-900 font-medium">Total:</h2>
					<h2 className="text-palette-base-gray-900 font-medium text-lg">
						R$ {(cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0) + parseFloat(frete)).toFixed(2)}
					</h2>
				</div>
			</div>
			<Divider />
			<Button
				className="w-ful font-medium text-palette-tertiary-light cursor-pointer rounded-md py-2"
				variant="solid"
				size="md"
				onClick={handleOpenModal}
				color="success">
				Confirmar Compra
			</Button>
		</div>
	);

	if (!user) {
		return (
			<div className="min-h-screen w-screen bg-palette-base-gray-500 flex flex-col">
				<Head>
					<title>Carrinho - uShop</title>
				</Head>
				<Header />
				<main className="flex-grow flex flex-col items-center justify-center">
					<div className="w-full lg:w-4/6 bg-palette-base-gray-200 rounded-md flex flex-col items-center justify-center">
						<div className="flex flex-col gap-8 justify-center items-center pb-10">
							<motion.img
								src="/assets/svg/sapiens.svg"
								className="w-[80%] h-[80%] sm:w-[45%] sm:h-[45%] 2xl:w-[40%] 2xl:h-[40%]"
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
				</main>
				<Footer className="mt-auto" />
			</div>
		);
	}

	if (cart.length === 0) {
		return (
			<div className="min-h-screen w-screen bg-palette-base-gray-500 flex flex-col">
				<Header />
				<Head>
					<title>Carrinho Vazio | uShop</title>
				</Head>
				<main className="flex-grow flex flex-col items-center justify-center">
					<div className="max-w-700px h-full flex flex-col gap-6 items-center justify-center">
						<img src="/assets/svg/emptycart.svg" className="w-full h-full mr-4" />
						<motion.h1
							className="text-palette-base-gray-800 tracking-normal font-normal text-3xl lg:text-5xl"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}>
							Carrinho Vazio
						</motion.h1>
					</div>
				</main>
				<Footer className="mt-auto" />
			</div>
		);
	}

	return (
		<div className="min-h-screen w-screen bg-palette-base-gray-500 flex flex-col">
			<Head>
				<title>Carrinho{" (" + totalQuantity + ")"} - uShop</title>
			</Head>
			<Header />
			<main className="flex-grow h-full w-full flex justify-center">
				{cart.length > 0 && (
					<div className="w-full lg:w-4/5 p-6 my-6 flex gap-4 bg-gradient-to-r from-palette-base-gray-100 to-palette-base-gray-200 rounded-md">
						<div className=" w-full lg:w-[70%] flex flex-col gap-4 ">
							<div className="w-full flex items-center h-6 gap-3">
								<div
									className="h-full w-max p-1 flex items-center rounded-full duration-300 cursor-pointer hover:bg-palette-base-gray-500"
									onClick={() => {
										router.push("/");
									}}>
									<ChevronLeft size={16} />
								</div>
								<h2 className="text-xl text-palette-base-gray-900">Carrinho de Compras | {totalQuantity}</h2>
							</div>
							<ListProducts products={cart} />
						</div>
						<div className="w-[30%] mt-10 lg:flex flex-col gap-4 bg-palette-base-main shadow-md p-4 rounded-lg hidden">
							<div className="w-full flex justify-between items-center">
								<h1 className="text-xl text-palette-base-gray-900 font-semibold">Resumo da Compra</h1>
								<ShoppingBag />
							</div>
							<Divider />
							<div className="text-md font-medium text-palette-base-gray-900 flex justify-between w-full">
								<h2 className="text-palette-base-gray-900">Calcular Frete</h2>
								<img className="w-6 h-6" src="/assets/svg/truck_delivery.svg" />
							</div>
							<Input variant="bordered" type="text" placeholder="CEP" aria-label="Input de CEP" onValueChange={handleCep} value={cep} />
							<Divider />
							<div className="w-full flex min-h-[20%] flex-col justify-between">
								<div className="flex flex-col h-min">
									<div className="flex justify-between">
										<h2 className="text-palette-base-gray-900">Subtotal:</h2>
										<h2 className="text-palette-base-gray-900">
											R$ {cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0).toFixed(2)}
										</h2>
									</div>
									<div className="flex justify-between">
										<h2 className="text-palette-base-gray-900 font-light">Descontos:</h2>
										<h2 className="text-palette-base-gray-900 font-light">R$ 0.00</h2>
									</div>
									<div className="flex justify-between">
										<h2 className="text-palette-base-gray-900 font-light">Frete:</h2>
										<h2 className="text-palette-base-gray-900 font-light">R$ {frete}</h2>
									</div>
								</div>
								<div className="w-full flex justify-between">
									<h2 className="text-palette-base-gray-900 font-medium">Total:</h2>
									<h2 className="text-palette-base-gray-900 font-medium text-lg">
										R${" "}
										{(
											cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0) +
											parseFloat(frete)
										).toFixed(2)}
									</h2>
								</div>
							</div>
							<Divider />
							<Button
								className="w-full font-medium text-palette-tertiary-light cursor-pointer rounded-md py-2"
								variant="solid"
								size="md"
								onClick={() => {
									onOpenModalConfirmPurchase();
								}}
								color="success">
								Confirmar Compra
							</Button>
						</div>
					</div>
				)}
			</main>
			<Footer className="mt-auto" />

			{/* Drawer for Cart Summary */}

			{!isDesktop && (
				<SwipeableEdgeDrawer
					anchor="bottom"
					open={open}
					onClose={toggleDrawer}
					onOpenModalConfirmPurchase={onOpenModalConfirmPurchase}
					cart={cart}
					handleCep={handleCep}
					cep={cep}
					frete={frete}
					PaperProps={{
						className: "bg-palette-base-main",
					}}>
					{drawerContent}
				</SwipeableEdgeDrawer>
			)}

			<Modal
				isOpen={isOpenModalConfirmPurchase}
				placement="center"
				onClose={() => {
					clearErrors("address"); // Limpa os erros ao fechar o modal

					setLoadingButton(false);
					onCloseModalConfirmPurchase();
				}}
				backdrop="blur">
				<ModalContent className="bg-palette-base-main">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Confirmar compra</ModalHeader>
							<ModalBody>
								<form onSubmit={handleSubmit(handleConfirmPurchase)} className="p-4 flex flex-col gap-4">
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
										{loadingButton ? <Spinner color="current" /> : <span>Confirmar Compra!</span>}
									</Button>
									<Button variant="ghost" color="danger" className="w-full" onClick={handleCloseModal}>
										Cancelar
									</Button>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
