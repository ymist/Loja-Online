import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Spinner } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLogin } from "@/components/ui/input_login";
import { useRouter } from "next/router";
import { apiClient } from "@/services/apiClient";
import useStore from "@/data/global_states/useProducts";
import { toast } from "react-toastify";

const quantitySchema = z.object({
	quantity: z.string().refine((val) => /^\d+$/.test(val), {
		message: "Insira uma quantidade válida!",
		path: ["quantity"],
	}),
});

export default function ModalChangeQuantity({ isOpen, onClose, info }) {
	const router = useRouter();
	const inicialize = useStore((state) => state.inicialize);
	const user = useStore((state) => state.user);
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({
		mode: "onBlur",
		resolver: zodResolver(quantitySchema),
		defaultValues: { quantity: "0" },
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const quantity = Number(data.quantity);
		if (quantity <= 0 || quantity > info.stock) {
			// Exibir mensagem de erro aqui, se desejar
			setError("quantity", {
				message: "Insira um quantidade disponível",
			});
			setLoading(false);
			return;
		}
		if (!user?.id) {
			router.push("/");
			return;
		}
		const changeCartItem = await apiClient.put("/update-quantity", {
			cartItem_id: info.cartItemId,
			quantity: quantity,
		});
		if (changeCartItem.status === 200) {
			// const updCart = await apiClient.get("/cart", {
			// 	user_id: user.id,
			// });
			// if (updCart.status === 200) {
			// 	// user.cart[0] = updCart.data;
			// 	// setUser(user);
			// 	onClose();
			// }
			onClose();
			await inicialize();
			toast.success("Quantidade alterada com sucesso!");
			setLoading(false);
		} else {
			toast.error("Erro ao mudar a quantidade!");
			setLoading(false);
		}
	};
	const handleChange = async (e) => {
		const value = e;
		if (!value) {
			clearErrors("quantity");
			return;
		}

		const quantity = parseInt(value, 10);
		if (quantity <= 0 || quantity > info.stock) {
			setError("quantity", {
				type: "manual",
				message: "Insira uma quantidade válida!",
			});
		} else {
			clearErrors("quantity");
		}
	};

	return (
		<>
			<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">
						Alterar Quantidade
						<span>Quantidade Disponível: {info.stock}</span>
					</ModalHeader>
					<ModalBody>
						<form className="p-4 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="quantity"
								control={control}
								render={({ field }) => (
									<>
										<InputLogin type="number" placeholder="Insira a quantidade!" onValueChange={handleChange} {...field} />
										{errors.quantity && <p className="text-palette-base-danger text-sm">{errors.quantity.message}</p>}
									</>
								)}
							/>
							<Button type="submit" className="w-full text-palette-base-main" color="success">
								{loading ? <Spinner color="default" /> : <span>Confirmar Alteração</span>}
							</Button>
							<Button variant="ghost" color="danger" className="w-full flex justify-center items-center" onClick={onClose}>
								Cancelar Alteração
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
