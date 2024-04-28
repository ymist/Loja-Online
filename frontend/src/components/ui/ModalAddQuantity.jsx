import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLogin } from "@/components/ui/input_login";
import { useRouter } from "next/router";
import { apiClient } from "@/services/apiClient";
import useStore from "@/data/global_states/useProducts";
import { addToCart } from "@/data/addToCart";

const quantitySchema = z.object({
	quantity: z.string().refine((val) => /^\d+$/.test(val), {
		message: "Insira uma quantidade válida!",
		path: ["quantity"],
	}),
});

export default function ModalAddQuantity({ isOpen, onClose, info }) {
	const router = useRouter();
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);
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
		debugger;
		const quantity = Number(data.quantity);
		if (quantity <= 0 || quantity > info.stock) {
			// Exibir mensagem de erro aqui, se desejar
			setError("quantity", {
				message: "Insira um quantidade disponível",
			});
			return;
		}
		if (!user?.id) {
			router.push("/");
			return;
		}
		const addCart = await addToCart(info.product_id, user, quantity);

		if (!addCart.data) {
			console.log("Item não adicionado");
			return;
		}

		const updCart = await apiClient.get("/cart", {
			user_id: user.id,
		});
		if (updCart.status === 200) {
			user.cart[0] = updCart.data;
			setUser(user);

			onClose();
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
						Selecionar Quantidade
						<span>Quantidade Disponível: {info.stock}</span>
					</ModalHeader>
					<ModalBody>
						<form
							className="p-4 flex flex-col gap-5"
							onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="quantity"
								control={control}
								render={({ field }) => (
									<>
										<InputLogin
											type="number"
											placeholder="Insira a quantidade!"
											onValueChange={handleChange}
											{...field}
										/>
										{errors.quantity && (
											<p className="text-palette-base-danger text-sm">
												{errors.quantity.message}
											</p>
										)}
									</>
								)}
							/>
							<Button
								type="submit"
								className="w-full text-palette-base-main"
								color="success">
								Selecionar Quantidade
							</Button>
							<Button
								variant="ghost"
								color="danger"
								className="w-full flex justify-center items-center"
								onClick={onClose}>
								Cancelar
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
