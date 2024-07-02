import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStore from "@/data/global_states/useProducts";
import TableCart from "@/components/Table";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import ListProducts from "@/components/products/ListProducts/list_products";
import { calcDelivery } from "@/data/calcDelivery";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);
	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);
	const [frete, setFrete] = useState(null);
	const inicialize = useStore((state) => state.inicialize);
	const router = useRouter();

	const { isOpen: isOpenModalConfirmPurchase, onOpen: onOpenModalConfirmPurchase, onClose: onCloseModalConfirmPurchase } = useDisclosure();

	const handleOpenModal = () => {
		onOpenModalConfirmPurchase();
	};

	const handleFrete = async (selectedAddressId) => {
		setFrete(selectedAddressId);
		const selectedAddress = user.address.find((address) => address.id === selectedAddressId);
		if (selectedAddress) {
			const optionsDelivery = await calcDelivery(selectedAddress.zipcode);
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

		const existAddress = user.address.find((addr) => addr.id === data?.address);

		if (!existAddress) {
			setError("address", { message: "Insira um endereço válido!" });
			setLoadingButton(false);
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
			toast.error("Erro ao gerar pedido, verifique seus dados!");
			return;
		}
	};

	useEffect(() => {
		if (user?.id && user?.cart && user?.cart?.[0]?.cartItems?.length > 0) {
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
			setLoading(false);
		}
	}, [user]);

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

	if (!user) {
		return (
			<div className="min-h-screen w-screen bg-palette-base-gray-500 flex flex-col">
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
			<Header />
			<main className="flex-grow h-full w-full flex justify-center">
				{cart.length > 0 && (
					<div className="lg:w-4/5 p-6 my-6 flex gap-4 bg-gradient-to-r from-palette-base-gray-100 to-palette-base-gray-200 rounded-md">
						<div className="w-[70%] flex flex-col gap-4 ">
							<div className="w-full flex items-center h-6 gap-3">
								<div
									className="h-full w-max p-1 flex items-center rounded-full duration-300 cursor-pointer hover:bg-palette-base-gray-500"
									onClick={() => {
										router.push("/");
									}}>
									<ChevronLeft size={16} />
								</div>
								<h2 className="text-xl text-palette-base-gray-900">Carrinho de Compras | {cart.length} </h2>
							</div>
							<ListProducts products={cart} />
						</div>
						<div className="w-[30%] mt-10 flex flex-col gap-4 bg-palette-base-main shadow-md p-4 rounded-lg">
							<div className="w-full flex justify-between items-center">
								<h1 className="text-xl text-palette-base-gray-900 font-semibold">Resumo da Compra</h1>
								<ShoppingBag />
							</div>
							<Divider />
							<div className="text-md font-medium text-palette-base-gray-900 flex justify-between w-full">
								<h2 className="text-palette-base-gray-900">Calcular Frete</h2>
								<img className="w-6 h-6" src="/assets/svg/truck_delivery.svg" />
							</div>
							<Select
								aria-label="Pesquisar"
								selectedKeys={[]}
								variant="bordered"
								disallowEmptySelection={false}
								size="sm"
								placeholder="Endereço"
								labelPlacement="inside"
								className="max-w-full m-0"
								value={frete}
								onSelectionChange={(e) => handleFrete(e.currentKey)}>
								{user.address.map((address) => (
									<SelectItem key={address.id} textValue={address.zipcode}>
										{`${address.zipcode}, ${address.street}, ${address.number}, ${address.city}, ${address.state}`}
									</SelectItem>
								))}
							</Select>
							<Divider />
							<div className="w-full flex min-h-[33%] flex-col justify-between">
								<div className="flex flex-col h-min">
									<div className="flex justify-between">
										<h2 className="text-palette-base-gray-900">Subtotal:</h2>
										<h2 className="text-palette-base-gray-900">
											R$ {cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0).toFixed(2)}
										</h2>
									</div>
									<div className="flex justify-between">
										<h2 className="text-palette-base-gray-900 font-light">Descontos:</h2>
										<h2 className="text-palette-base-gray-900 font-light">R$ 0,00</h2>
									</div>
									<div className="flex justify-between">
										<h2 className="text-palette-base-gray-900 font-light">Frete:</h2>
										<h2 className="text-palette-base-gray-900 font-light">R$ 0,00</h2>
									</div>
								</div>
								<div className="w-full flex justify-between">
									<h2 className="text-palette-base-gray-900 font-medium">Total:</h2>
									<h2 className="text-palette-base-gray-900 font-medium text-lg">
										R$ {cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0).toFixed(2)}
									</h2>
								</div>
							</div>
							<Divider />
						</div>
					</div>
				)}
			</main>
			<Footer className="mt-auto" />
			<Modal
				isOpen={isOpenModalConfirmPurchase}
				onClose={() => {
					clearErrors();
					onCloseModalConfirmPurchase();
				}}
				backdrop="blur">
				<ModalContent className="bg-palette-base-main ">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Confirmar compra</ModalHeader>
							<ModalBody>
								<form className="w-full flex flex-col gap-4" id="form_modal_address" onSubmit={handleSubmit(handleConfirmPurchase)}>
									<div className="flex flex-col gap-2">
										<h2 className="text-xl font-normal">Selecione o endereço de entrega</h2>
										<Controller
											name="address"
											control={control}
											rules={{ required: true }}
											defaultValue=""
											render={({ field }) => (
												<Autocomplete
													disableAnimation
													placeholder="Endereço"
													variant="bordered"
													classNames={{
														base: "py-2 px-2 border-1 border-palette-base-gray-500/50 hover:border-palette-base-gray-500",
														inputWrapper: "placeholder:text-palette-base-gray-500 text-lg",
													}}
													items={user.address.map((address) => ({
														key: address.id,
														label: `${address.address} - ${address.number} - ${address.district} - ${address.city}`,
													}))}
													{...field}>
													{(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
												</Autocomplete>
											)}
										/>
										{errors?.address?.type === "required" && <span className="text-danger-500 text-sm">Selecione um endereço</span>}
									</div>
									<Button
										className="w-full text-palette-base-main font-medium   cursor-pointer"
										size="lg"
										form="form_modal_address"
										type="submit"
										color="success">
										Confirmar Compra
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
