import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import useStore from "@/data/global_states/useProducts";
import TableCart from "@/components/Table";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);
	console.log(cart);

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
					};
					setCart((prev) => [...prev, updatedProduct]);
				});
				return;
			};
			response();
		}
	}, [user]);

	return (
		<main>
			<Header />
			<div className="w-screen min-h-screen p-5 flex">
				<div className="w-3/5 h-full flex flex-col items-center gap-4 ">
					<Paper
						elevation={6}
						sx={{
							width: "100%",
							padding: "1em 2em",
							background:
								"linear-gradient(90deg, rgba(244,244,244,1) 0%, rgba(239,239,239,1) 49%)",
						}}>
						<h1 className="font-light italic text-2xl flex items-center justify-center gap-3 text-palette-primary-dark ">
							Carrinho
							<ShoppingCartIcon />
						</h1>
					</Paper>
					{cart && <TableCart products={cart} user={user} />}
				</div>
				<Divider
					orientation="vertical"
					sx={{ backgroundColor: "#000" }}
				/>
				<div className="w-2/5 h-full">
					<h1>teste</h1>
				</div>
			</div>
		</main>
	);
}
