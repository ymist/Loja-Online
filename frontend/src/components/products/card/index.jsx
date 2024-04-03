import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Rating } from "@mui/material";
import { useState } from "react";
export default function CardProduct({ product, onClick }) {
	const [value, setValue] = useState(2);
	return (
		<div
			className="card w-72 h-[450px] bg-slate-100 shadow-2xl pb-2 cursor-pointer"
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
					<div className="badge badge-warning">
						{product.brand.name}
					</div>
					<div className="badge badge-warning">
						{product.category.name}
					</div>
				</div>
				<h2 className="card-title font-medium min-h-14 text-[15px]  px-6 py-2">
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
					<button className="btn btn-square border-transparent bottom-6 bg-palette-primary-light text-palette-base-main w-4/5">
						<AddShoppingCartIcon />
					</button>
				</div>
			</div>
		</div>
	);
}
