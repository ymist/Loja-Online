import useStore from "@/data/global_states/useProducts";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import { Rating } from "@mui/material";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export default function CardProductMobile({ product, onClick, handleOpen }) {
	const router = useRouter();
	const [value, setValue] = useState(4);
	const user = useStore((state) => state.user);

	return (
		<motion.div
			className="card w-full bg-slate-100 shadow-md border-2 border-palette-base-gray-300 cursor-pointer"
			onClick={onClick}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}>
			<figure className="w-full max-h-96  mb-3">
				<img src={`/tmp_products/${product.banner[0]}`} alt={product.banner[0]} className="h-80 w-full object-contain" />
			</figure>
			<div className="card-body px-2 pt-2 pb-4 flex flex-col justify-between">
				<div className="flex gap-1 items-center mb-2 w-full truncate">
					<div className="badge badge-warning text-[11px]">{product.brand.name}</div>
					<div className="badge badge-warning text-[11px]">{product.categories[0].name}</div>
				</div>
				<Link href={`/product/${product.id}`}>
					<Tooltip placement="bottom" content={product.name}>
						<h2 className="card-title font-medium text-[12px] text-wrap md:text-base hover:underline line-clamp-1 overflow-hidden">
							{product.name}
						</h2>
					</Tooltip>
				</Link>
				<Rating
					name={`rating-${product.id}`}
					size="small"
					sx={{ padding: "0px", marginTop: "0.5em" }}
					icon={<StarRateRoundedIcon fontSize="inherit" />}
					emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				/>
				<h3 className="text-neutral-800 font-bold mt-1 md:mt-2">R$ {product.price}</h3>
				<div className="flex justify-center mt-2">
					{user?.cart?.[0]?.cartItems?.find((cartItem) => cartItem.product_id === product.id) ? (
						<button
							className="btn btn-square bg-palette-primary-light text-palette-base-main w-full"
							onClick={() => toast.info("Este item já está no seu carrinho! Verifique, por favor.")}>
							<DoneIcon />
						</button>
					) : (
						<button
							className="btn btn-square bg-palette-primary-light text-palette-base-main w-full border-none"
							onClick={() => {
								if (user) {
									handleOpen(product.stock, product.id);
								} else {
									router.push("/login");
								}
							}}>
							<AddShoppingCartIcon />
						</button>
					)}
				</div>
			</div>
		</motion.div>
	);
}
