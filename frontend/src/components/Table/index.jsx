import React, { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Input,
	useDisclosure,
} from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { EditIcon } from "./EditIcon";
import ModalChangeQuantity from "../ui/ModalChangeQuantity";

export default function TableCart({ products, user }) {
	const router = useRouter();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [info, setInfo] = useState(0);

	const handleOpen = (itemStock, cartItemId) => {
		setInfo({
			stock: Number(itemStock),
			cartItemId: cartItemId,
		});
		onOpen();
	};

	const uniqueProducts = Object.values(
		products.reduce((acc, product) => {
			const { id, ...rest } = product;
			const existingProduct = acc[id];
			console.log(product);

			acc[id] = { id, ...rest };

			return acc;
		}, {}),
	);

	const renderCell = React.useCallback((product, columnKey) => {
		const cellValue = product[columnKey];

		switch (columnKey) {
			case "banner":
				return (
					<img
						src={"/tmp_products/" + cellValue[0]}
						alt={product.name}
						className="w-16 h-16 object-cover rounded-md cursor-pointer "
						onClick={() => router.push("/product/" + product.id)}
					/>
				);
			case "name":
				return (
					<div className="flex items-center gap-4">{cellValue}</div>
				);
			case "price":
				return (
					<span className="flex justify-center items-center">
						R$ {cellValue}
					</span>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Alterar Quantidade">
							<span
								className="text-lg text-default-400 cursor-pointer active:opacity-50  "
								onClick={() =>
									handleOpen(
										product.stock,
										product.cartItemId,
									)
								}>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip content="Detalhes">
							<span
								onClick={() =>
									router.push("/product/" + product.id)
								}
								className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<EyeIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Excluir produto">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				);
			case "quantity":
				return (
					<span className="flex justify-center items-center cursor-pointer ">
						<h2 className="  rounded-md text-palette-primary-dark bg-palette-primary-light/30 font-semibold px-2 py-1 ">
							{cellValue}
						</h2>
					</span>
				);
			default:
				return cellValue;
		}
	}, []);

	const columns = [
		{ name: "Imagem", uid: "banner" },
		{ name: "Nome", uid: "name" },
		{ name: "Preço", uid: "price" },
		{ name: "Quantidade", uid: "quantity" },
		{ name: "Ações", uid: "actions" },
	];

	return (
		<Paper
			sx={{
				width: "100%",
				borderRadius: "4px",
				maxHeight: "65vh",
				overflow: "auto",
			}}
			elevation={6}>
			<Table aria-label="Tabela de produtos">
				<TableHeader
					columns={columns}
					style={{
						background:
							"linear-gradient(90deg, rgba(244,244,244,1) 0%, rgba(239,239,239,1) 49%)",
					}}>
					{(column) => (
						<TableColumn key={column.uid}>
							<span className="flex justify-center items-center">
								{column.name}
							</span>
						</TableColumn>
					)}
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.id}>
							{columns.map((column) => (
								<TableCell key={column.uid}>
									{renderCell(product, column.uid)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>

			<ModalChangeQuantity
				info={info}
				onClose={onClose}
				isOpen={isOpen}
			/>
		</Paper>
	);
}
