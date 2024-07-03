import { DeleteIcon } from "@/components/Table/DeleteIcon";
import { EditIcon } from "@/components/Table/EditIcon";
import { EyeIcon } from "@/components/Table/EyeIcon";
import ModalChangeQuantity from "@/components/ui/ModalChangeQuantity";
import useStore from "@/data/global_states/useProducts";
import { apiClient } from "@/services/apiClient";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ListProducts({ products }) {
	const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
	const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
	const inicialize = useStore((state) => state.inicialize);
	const [info, setInfo] = useState({});
	const [infoDelete, setInfoDelete] = useState({});
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleOpenDelete = (id) => {
		setInfoDelete({
			cartItem_id: id,
		});
		onOpenModalDelete();
	};

	const handleOpen = (itemStock, cartItemId) => {
		setInfo({
			stock: itemStock,
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

	return (
		<ul className="w-full h-full bg-palette-base-main shadow-md p-4 rounded-lg ">
			<h2 className="text-xl p-2">Produtos</h2>
			{products?.map((product) => (
				<li className="flex flex-col gap-4">
					<Divider />
					<div className="flex flex-col lg:gap-2  w-full">
						<div className="flex justify-between items-center w-full">
							<div className="flex gap-1 lg:gap-2 items-center w-min">
								<img src={`/tmp_products/${product.banner[0]}`} className="w-10 h-10  sm:w-12 sm:h-12  lg:w-16 lg:h-16" />
								<div>
									<h2 className="text-[10px]   sm:text-sm max-w-[70%] lg:max-w-full  font-medium text-palette-base-gray-900 lg:text-md truncate ">
										{product.name}
									</h2>
									<h2 className=" text-[10px] sm:text-sm text-palette-base-gray-900 tracking-wide font-light ">
										{" "}
										Quantidade: {product.quantity}
									</h2>
									<h2 className=" text-[10px]   sm:text-sm max-w-[70%] lg:max-w-full  font-medium text-palette-base-gray-900 lg:text-md truncate">
										{" "}
										Preço Unitário: R$ {product.price}
									</h2>
								</div>
							</div>

							<div className="relative flex flex-col md:flex-row md:items-center gap-1 md:gap-2 justify-end">
								<Tooltip content="Alterar Quantidade">
									<span
										className="text-sm  lg:text-lg text-default-400 cursor-pointer active:opacity-50  "
										onClick={() => handleOpen(product.stock, product.cartItemId)}>
										<EditIcon />
									</span>
								</Tooltip>
								<Tooltip content="Detalhes">
									<span
										onClick={() => router.push("/product/" + product.id)}
										className="text-sm  lg:text-lg text-default-400 cursor-pointer active:opacity-50">
										<EyeIcon />
									</span>
								</Tooltip>
								<Tooltip color="danger" content="Excluir produto">
									<span
										className="text-sm  lg:text-lg text-danger cursor-pointer active:opacity-50"
										onClick={() => {
											handleOpenDelete(product.cartItemId);
										}}>
										<DeleteIcon />
									</span>
								</Tooltip>
							</div>
						</div>
					</div>
					<Divider />
				</li>
			))}
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
		</ul>
	);
}
