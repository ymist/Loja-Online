import Header from "@/components/Header/NavBar";
import { apiClient } from "@/services/apiClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import useStore from "@/data/global_states/useProducts";
import TableCart from "@/components/Table";

export default function DetailCart() {
	const [cart, setCart] = useState([]);
	const user = useStore((state) => state.user);
	console.log(cart);

	const router = useRouter();
	useEffect(() => {
		if (user?.id && user.cart && user.cart[0].cartItems.length > 0) {
			const response = async () => {
				console.log(user);
				user.cart[0].cartItems.map(async (item) => {
					const product = await apiClient.get(
						"/product/" + item.product_id,
					);
					console.log(product);

					setCart((prev) => [...prev, product.data]);
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
				<div className="w-3/5 h-full flex flex-col items-center">
					<h1 className="font-medium text-2xl">Itens no Carrinho</h1>
					{cart && <TableCart products={cart} />}
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
