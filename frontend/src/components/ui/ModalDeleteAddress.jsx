import useStore from "@/data/global_states/useProducts";
import { apiClient } from "@/services/apiClient";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

export const ModalDeleteAddress = ({ isOpen, onClose, onOpen, info }) => {
	console.log(info);
	const [loading, setLoading] = useState(false);
	const inicialize = useStore((state) => state.inicialize);
	const handleDelete = async () => {
		setLoading(true);
		const deleteAddress = await apiClient.delete("/delete-address/" + info.id);

		if (deleteAddress.status === 200) {
			toast.success("Endereço deletado com sucesso!");
			onClose();
			await inicialize();
			setLoading(false);
			return;
		} else {
			toast.error("Erro, endereço não deletado!");
			onClose();
			setLoading(false);

			return;
		}
	};

	return (
		<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<ModalHeader className="flex gap-1 text-justify">
					Deseja <span className="text-palette-base-danger italic font-medium ">DELETAR</span> esse endereço?
				</ModalHeader>
				<ModalBody>
					<div className="p-4">
						<Button
							onClick={() => {
								handleDelete();
							}}
							className="w-full text-palette-base-main cursor-pointer"
							color="danger">
							{loading ? <Spinner color="default" /> : <span>Excluir Endereço</span>}
						</Button>
						<Button variant="ghost" color="default" className="w-full mt-4" onClick={onClose}>
							Cancelar
						</Button>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
