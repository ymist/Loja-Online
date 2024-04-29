import { addToCart } from "@/data/addToCart";
import useStore from "@/data/global_states/useProducts";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function CardProduct({ product, onClick }) {
	const router = useRouter();
	const [value, setValue] = useState(4);
	const user = useStore((state) => state.user);
	const cart = useStore((state) => state.cart);
	const teste = cart?.find((cartitem) => cartitem.id === product.id);

	return (
		<div
			className="card w-64 h-[450px] bg-slate-100 shadow-2xl pb-2 cursor-pointer"
			onClick={onClick}>
			<figure className="h-[180px] mb-3">
				<img
					src={`/tmp_products/${product.banner[0]}`}
					alt="Shoes"
					className="h-full"
				/>
			</figure>
			<div className="card-body px-0 py-0 min-h-min flex justify-between flex-col">
				<div className="card-actions justify-start pl-6 pt-2">
					<div className="badge badge-warning text-[11px]">
						{product.brand.name}
					</div>
					<div className="badge badge-warning text-[11px]">
						{product.category.name}
					</div>
				</div>
				<h2
					className="card-title font-medium max-h-20 text-[14px]  px-6 py-2"
					onClick={() => {
						router.push(`/product/${product.id}`);
					}}>
					{product.name}
				</h2>
				<Rating
					name="simple-controlled"
					size="small"
					sx={{
						padding: " 0px 1.5em",
					}}
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				/>
				<h3 className="text-neutral-800 font-bold flex justify-end pr-8">
					R$ {product.price}
				</h3>
				<div className=" flex items-end justify-center gap-1">
					{user?.cart[0].cartItems?.find(
						(cartitem) => cartitem.product_id === product.id,
					) ? (
						<button
							className="btn btn-square border-transparent bottom-6  bg-palette-primary-light text-palette-base-main w-11/12"
							onClick={() =>
								toast.info(
									"Esse item ja está no seu carrinho! Verifique Por Favor.",
								)
							}>
							<DoneIcon />
						</button>
					) : (
						<button
							className="btn btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-11/12"
							onClick={() => addToCart(product.id, user)}>
							<AddShoppingCartIcon />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
