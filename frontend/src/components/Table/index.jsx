import React, { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	useDisclosure,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Spinner,
} from "@nextui-org/react";
import { EyeIcon } from "./EyeIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { EditIcon } from "./EditIcon";
import ModalChangeQuantity from "../ui/ModalChangeQuantity";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-toastify";
import useStore from "@/data/global_states/useProducts";

export default function TableCart({ products, user }) {
	const router = useRouter();
	const inicialize = useStore((state) => state.inicialize);

	const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
	const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
	const [info, setInfo] = useState({});
	const [infoDelete, setInfoDelete] = useState({});
	const [loading, setLoading] = useState(false);

	const handleOpenDelete = (id) => {
		setInfoDelete({
			cartItem_id: id,
		});
		onOpenModalDelete();
	};

	const handleOpen = (itemStock, cartItemId) => {
		setInfo({
			stock: Number(itemStock),
			cartItemId: cartItemId,
		});
		onOpenModalEdit();
	};

	const handleDelete = async (body) => {
		setLoading(true);

		const deleteItem = await apiClient.delete("/delete-cart-item/" + body.cartItem_id);

		if (deleteItem.status === 200) {
			await inicialize();
			onCloseModalDelete();
			toast.success("Produto deletado com sucesso!");
			setLoading(false);
		} else {
			onCloseModalDelete();
			toast.error("Erro ao deletar produto!");
			setLoading(false);
		}
	};

	const renderCell = React.useCallback(
		(product, columnKey) => {
			const cellValue = product[columnKey];

			switch (columnKey) {
				case "banner":
					return (
						<img
							src={"/tmp_products/" + cellValue[0]}
							alt={product.name}
							className="w-8 h-8 lg:w-16 lg:h-16 object-cover rounded-md cursor-pointer "
							onClick={() => router.push("/product/" + product.id)}
						/>
					);
				case "name":
					return (
						<div className="text-[12px] line-clamp-3 truncate max-w-12 md:max-w-none md:line-clamp-none md:text-wrap md:text-[16px] gap-1  flex items-center md:gap-4">
							{cellValue}
						</div>
					);
				case "price":
					return <span className=" text-[12px]  lg:text-[16px]  flex justify-center items-center">R$ {cellValue}</span>;
				case "actions":
					return (
						<div className="relative flex items-center gap-1 md:gap-2">
							<Tooltip content="Alterar Quantidade">
								<span
									className="text-lg text-default-400 cursor-pointer active:opacity-50  "
									onClick={() => handleOpen(product.stock, product.cartItemId)}>
									<EditIcon />
								</span>
							</Tooltip>
							<Tooltip content="Detalhes">
								<span
									onClick={() => router.push("/product/" + product.id)}
									className="text-lg text-default-400 cursor-pointer active:opacity-50">
									<EyeIcon />
								</span>
							</Tooltip>
							<Tooltip color="danger" content="Excluir produto">
								<span
									className="text-lg text-danger cursor-pointer active:opacity-50"
									onClick={() => {
										handleOpenDelete(product.cartItemId);
									}}>
									<DeleteIcon />
								</span>
							</Tooltip>
						</div>
					);
				case "quantity":
					return (
						<span className="flex justify-center items-center cursor-pointer ">
							<h2 className="  rounded-md text-palette-primary-dark bg-palette-primary-light/30 font-semibold text-[12px] lg:text-[16px] px-2 py-1 ">
								{cellValue}
							</h2>
						</span>
					);
				default:
					return cellValue;
			}
		},
		[user],
	);

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
						background: "linear-gradient(90deg, rgba(244,244,244,1) 0%, rgba(239,239,239,1) 49%)",
					}}>
					{(column) => (
						<TableColumn key={column.uid}>
							<span className=" text-[10px] lg:text-[16px] flex justify-center items-center">{column.name}</span>
						</TableColumn>
					)}
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.cartItemId}>
							{columns.map((column) => (
								<TableCell key={column.uid}>{renderCell(product, column.uid)}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>

			<ModalChangeQuantity info={info} onClose={onCloseModalEdit} isOpen={isOpenModalEdit} />

			{isOpenModalDelete && (
				<Modal backdrop="blur" isOpen={isOpenModalDelete} onClose={onCloseModalDelete}>
					<ModalContent>
						<ModalHeader className="flex gap-1 text-justify">
							Deseja <span className="text-palette-base-danger italic font-medium ">DELETAR</span> esse produto do seu carrinho?
						</ModalHeader>
						<ModalBody>
							<div className="p-4">
								<Button
									onClick={() => {
										handleDelete(infoDelete);
									}}
									className="w-full text-palette-base-main cursor-pointer"
									color="danger">
									{loading ? <Spinner color="default" /> : <span>Excluir Produto</span>}
								</Button>
								<Button variant="ghost" color="default" className="w-full mt-4" onClick={onCloseModalDelete}>
									Cancelar
								</Button>
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</Paper>
	);
}
