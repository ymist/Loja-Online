import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import { DeleteIcon } from "./DeleteIcon";

export default function TableCart({ products }) {
	// Consolidar itens duplicados
	const uniqueProducts = Object.values(
		products.reduce((acc, product) => {
			const { id, ...rest } = product;
			if (!acc[id]) acc[id] = { ...rest, quantity: 0 };
			acc[id].quantity++;
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
						className="w-16 h-16 object-cover rounded-md"
					/>
				);
			case "name":
				return (
					<div className="flex items-center gap-4">{cellValue}</div>
				);
			case "price":
				return <span>R$ {cellValue}</span>;
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Detalhes">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
				return <span className="text-center">{cellValue}</span>;
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
		<Table aria-label="Tabela de produtos">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align="start">
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody>
				{uniqueProducts.map((product) => (
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
	);
}
