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
export default function CardProduct({ product, onClick, handleOpen }) {
	const router = useRouter();
	const [value, setValue] = useState(product.media_rating);
	const user = useStore((state) => state.user);

	return (
		<motion.div
			className="card w-full h-full bg-slate-100 shadow-md duration-300 hover:shadow-xl pb-2 cursor-pointer"
			onClick={onClick}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}>
			<figure className="max-h-[250px] mb-3">
				{/* <img src={`/produto-de-beleza-e-cosmeticos-com-tons-rosados-suaves.png`} alt={product.banner[0]} className="h-full" /> */}
				<img src={`/tmp_products/${product.banner[0]}`} alt={product.banner[0]} className="h-full object-contain" />
			</figure>
			<div className="card-body px-0 py-0 min-h-min flex justify-between flex-col">
				<div className="card-actions justify-start pl-6 pt-2">
					<div className="badge badge-warning text-[11px]">
						{product.brand.name}
						{/* Marca */}
					</div>
					<div className="badge badge-warning text-[11px]">
						{product.categories[0].name}
						{/* Categoria */}
					</div>
				</div>
				<Link href={`/product/${product.id}`}>
					<Tooltip placement="bottom" content={"Produto " + product?.id.split("-")[2].toUpperCase()}>
						<h2 className="card-title font-medium max-h-24 text-[14px]  hover:underline line-clamp-4 overflow-hidden text-ellipsis px-6 py-2">
							{product.name}
							{/* Produto {product?.id.split("-")[2].toUpperCase()}{" "} */}
						</h2>
					</Tooltip>
				</Link>
				<Tooltip color="warning" content={<h2>{product.media_rating}</h2>}>
					<span className="w-min">
						<Rating
							name="simple-controlled"
							size="small"
							sx={{
								padding: " 0px 1.5em",
							}}
							icon={<StarRateRoundedIcon fontSize="inherit" />}
							emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
							value={value}
							precision={0.5}
							readOnly
							className="lg:pl-6"
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
						/>
					</span>
				</Tooltip>
				<h3 className="text-neutral-800 font-bold flex justify-end pr-8">R$ {product.price}</h3>
				<div className=" flex items-end justify-center gap-1">
					{user?.cart?.[0]?.cartItems?.find((cartitem) => cartitem.product_id === product.id) ? (
						<button
							className="btn btn-square border-transparent bottom-6  bg-palette-primary-light text-palette-base-main w-11/12"
							onClick={() => toast.info("Esse item ja está no seu carrinho! Verifique Por Favor.")}>
							<DoneIcon />
						</button>
					) : (
						<button
							className="btn btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-11/12"
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
