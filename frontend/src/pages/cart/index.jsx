import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import useStore from "@/data/global_states/useProducts";
import TableCart from "@/components/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";
import { Button } from "@nextui-org/react";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);

	const router = useRouter();
	useEffect(() => {
		if (user?.id && user.cart && user.cart[0].cartItems.length > 0) {
			setCart([]);
			const response = async () => {
				user.cart[0].cartItems.map(async (item) => {
					const product = await apiClient.get(
						"/product/" + item.product_id,
					);
					console.log(product);
					const updatedProduct = {
						...product.data,
						cartItemId: item.id,
						quantity: item.quantity,
					};
					setCart((prev) => [...prev, updatedProduct]);
				});
				return;
			};
			response();
		}
	}, [user]);

	return (
		<>
			<main>
				<Header />
				<div className="w-screen max-h-[80vh] overflow-auto p-5 flex ">
					<div className="w-3/5 h-full flex flex-col items-center gap-4 ">
						<Paper
							elevation={6}
							sx={{
								width: "100%",
								padding: "1em 2em",
								background:
									"linear-gradient(90deg, rgba(244,244,244,1) 0%, rgba(239,239,239,1) 49%)",
							}}>
							<h1 className="font-normal italic text-2xl flex items-center justify-start gap-3 text-palette-primary-dark ">
								<ShoppingCartIcon />
								Carrinho
							</h1>
						</Paper>
						{user ? (
							cart.length > 0 ? (
								<TableCart products={cart} user={user} />
							) : (
								<Paper
									elevation={6}
									className="w-full h-[60vh] flex flex-col gap-6 justify-center items-center">
									<img
										src="/ecommerce-cart (1).svg"
										className="w-[70%] h-[70%]"
									/>

									<h1 className="text-palette-primary-dark font-light  text-5xl ">
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
								<h1 className="text-palette-primary-dark font-light  text-5xl ">
									Faça login para ver seu carrinho!
								</h1>
								<Button
									onClick={() => {
										router.push("/login");
									}}
									className="w-auto px-24 text-palette-base-main cursor-pointer"
									color="success">
									Fazer Login
								</Button>
							</Paper>
						)}
					</div>
					<Divider
						orientation="vertical"
						sx={{ backgroundColor: "#000" }}
					/>
					<div className="w-2/5 h-full">
						<h1></h1>
					</div>
				</div>
			</main>
		</>
	);
}
