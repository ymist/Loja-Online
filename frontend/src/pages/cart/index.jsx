import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStore from "@/data/global_states/useProducts";
import TableCart from "@/components/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";
import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteSection,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import { SelectorIcon } from "@/components/Table/SelectorIcon";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);
	const [loading, setLoading] = useState(true);
	const [isValid, setIsValid] = useState(true);
	const [value, setValue] = useState("");

	const {
		isOpen: isOpenModalConfirmPurchase,
		onOpen: onOpenModalConfirmPurchase,
		onClose: onCloseModalConfirmPurchase,
	} = useDisclosure();

	const handleOpenModal = () => {
		onOpenModalConfirmPurchase();
	};

	const handleConfirmPurchase = (address) => {
		console.log(address);
		const existAddress = user.address.find((addr) => addr.id === address);

		if (!existAddress || address === "") {
			setIsValid(false);
			return;
		}
	};
	const router = useRouter();
	useEffect(() => {
		if (user?.id && user?.cart && user?.cart?.[0]?.cartItems?.length > 0) {
			setCart([]);
			const response = async () => {
				const updatedCart = await Promise.all(
					user.cart[0].cartItems.map(async (item) => {
						const product = await apiClient.get(
							"/product/" + item.product_id,
						);
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

	return (
		<>
			<main className="h-screen overflow-auto">
				<Header />
				<div className="w-screen min-h-screen lg:h-full overflow-auto p-5 bg-palette-base-gray500/30  flex lg:gap-12 ">
					<div className="w-full lg:w-3/5 h-full flex flex-col items-center gap-4 ">
						<Paper
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
						</Paper>
						{loading ? (
							<Paper
								elevation={6}
								className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center">
								<Spinner size="lg" color="success" />
							</Paper>
						) : user ? (
							cart.length > 0 ? (
								<TableCart products={cart} user={user} />
							) : (
								<Paper
									elevation={6}
									className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center">
									<img
										src="/ecommerce-cart (1).svg"
										className="w-[60%] h-[60%] mr-4"
									/>

									<h1 className="text-palette-primary-dark font-light sm: text-3xl lg:text-5xl ">
										Carrinho Vazio
									</h1>
								</Paper>
							)
						) : (
							<Paper
								elevation={6}
								className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center py-10 "
								sx={{
									background:
										"linear-gradient(90deg, rgba(244,244,244,1) 0%, rgba(239,239,239,1) 49%)",
								}}>
								<img
									src="/sapiens.svg"
									className="w-[70%] h-[70%]"
								/>
								<h1 className="text-palette-primary-dark font-light sm:text-2xl lg:text-5xl ">
									Faça login para ver seu carrinho!
								</h1>
								<Button
									onClick={() => {
										router.push("/login");
									}}
									size=""
									className="w-auto px-24 text-palette-base-main cursor-pointer"
									color="success">
									Fazer Login
								</Button>
							</Paper>
						)}
					</div>
					{cart.length > 0 && (
						<div className="hidden lg:block w-2/5 h-full px-5 rounded-md ">
							<Paper
								className="w-full h-60 flex flex-col"
								elevation={6}>
								<Paper
									elevation={3}
									className="h-14 w-full flex items-center justify-center bg-palette-primary-main">
									<h1 className="font-normal text-xl flex items-center justify-start gap-3 text-palette-base-main ">
										Resumo da Compra
									</h1>
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
											const price = Number(
												objeto.price.replace(",", "."),
											);

											let totalCompra =
												totalItems +
												price * objeto.quantity;
											totalCompra =
												parseFloat(totalCompra);
											return totalCompra.toFixed(2);
										}, 0)}
									</span>
								</div>
								<div className="w-full h-100px p-4 flex justify-between">
									<h2 className="font-medium text-xl text-text-dark-grey_900">
										Total
									</h2>
									<span className="font-medium text-xl text-text-dark-grey_900">
										R${" "}
										{cart?.reduce((total, objeto) => {
											const totalItems = Number(total);
											const price = Number(
												objeto.price.replace(",", "."),
											);

											let totalCompra =
												totalItems +
												price * objeto.quantity;
											totalCompra =
												parseFloat(totalCompra);
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
						className={`w-full rounded-md absolute bottom-0 left-0 z-10 lg:hidden ${
							cart.length > 0 ? "overflow-auto" : ""
						}`}
						style={{ maxHeight: "300px" }}>
						<Paper className="w-full h-52 flex flex-col ">
							<Paper
								elevation={3}
								className="h-10 w-full flex items-center justify-center bg-palette-primary-main">
								<h1 className="font-normal text-base flex items-center justify-start gap-3 text-palette-base-main ">
									Resumo da Compra
								</h1>
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
										const price = Number(
											objeto.price.replace(",", "."),
										);

										let totalCompra =
											totalItems +
											price * objeto.quantity;
										totalCompra = parseFloat(totalCompra);
										return totalCompra.toFixed(2);
									}, 0)}
								</span>
							</div>
							<div className="w-full h-40px px-4 py-4 flex justify-between">
								<h2 className="font-medium text-base text-text-dark-grey_900">
									Total
								</h2>
								<span className="font-medium text-base text-text-dark-grey_900">
									R${" "}
									{cart.reduce((total, objeto) => {
										const totalItems = Number(total);
										const price = Number(
											objeto.price.replace(",", "."),
										);

										let totalCompra =
											totalItems +
											price * objeto.quantity;
										totalCompra = parseFloat(totalCompra);
										return totalCompra.toFixed(2);
									}, 0)}
								</span>
							</div>
							<div className="w-full px-3">
								<Button
									className="w-full text-palette-base-main font-medium   cursor-pointer"
									size="md"
									disabled={!!user}
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
					<Modal
						backdrop="blur"
						isOpen={isOpenModalConfirmPurchase}
						onClose={onCloseModalConfirmPurchase}>
						<ModalContent>
							<ModalHeader className="flex gap-1 ">
								Deseja confirmar sua compra e seguir para o
								acompanhamento do pedido?
							</ModalHeader>
							<ModalBody>
								<div className="p-4 flex flex-col gap-4 ">
									<Autocomplete
										label="Endereços"
										placeholder="Selecione seu endereço!"
										variant="underlined"
										defaultItems={user?.address}
										labelPlacement="outside"
										className="w-full"
										onSelectionChange={setValue}
										errorMessage={
											isValid
												? ""
												: "Você deve escolher um endereço válido!"
										}
										isInvalid={isValid ? false : true}
										disableSelectorIconRotation
										selectorIcon={<SelectorIcon />}>
										{(item) => {
											console.log(item);
											return (
												<AutocompleteItem key={item.id}>
													{item.name}
												</AutocompleteItem>
											);
										}}
									</Autocomplete>
									<Button
										onClick={() => {
											handleConfirmPurchase(value);
										}}
										className="w-full text-palette-base-main cursor-pointer"
										color="success">
										Confirmar Compra!
									</Button>
									<Button
										variant="ghost"
										color="danger"
										className="w-full mt-4"
										onClick={onCloseModalConfirmPurchase}>
										Cancelar
									</Button>
								</div>
							</ModalBody>
						</ModalContent>
					</Modal>
				)}
			</main>
		</>
	);
}
