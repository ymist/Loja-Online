import { Controller, useForm } from "react-hook-form";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "@/data/global_states/useProducts";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-toastify";

// Schema de validação para o formulário de endereço
const addressSchema = z.object({
	name: z
		.string({
			required_error: "Insira um nome",
		})
		.min(3, { message: "O nome deve conter no minímo 3 caracteres!" }),
	street: z.string({
		required_error: "Insira o nome da rua",
	}),
	number: z.string({
		required_error: "Insira o número",
	}),
	neighborhood: z.string({
		required_error: "Insira o bairro",
	}),
	complement: z.string().optional(),
	state: z.string({
		required_error: "Insira o estado",
	}),
	city: z.string({
		required_error: "Insira a cidade",
	}),
	zipcode: z
		.string({
			required_error: "Insira o CEP",
		})
		.transform((val) => val.replace(/\D/g, "")),
});

export const ModalEditAddress = ({ isOpen, onClose, onOpen, info }) => {
	const [loading, setLoading] = useState(false);
	const inicialize = useStore((state) => state.inicialize);
	const [selectValue, setSelectValue] = useState(new Set([]));
	console.log(selectValue);
	console.log(selectValue);
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		clearErrors,
		setValue,
	} = useForm({
		mode: "onBlur",
		resolver: zodResolver(addressSchema),
	});

	useEffect(() => {
		Object.keys(info).forEach((key) => {
			console.log(key);
			if (key === "state") {
				setSelectValue(new Set([info[key]]));
				setValue(key, info[key]);
			} else {
				setValue(key, info[key]);
			}
		});
	}, []);

	const onSubmit = async (data) => {
		setLoading(true);
		data.id = info.id;
		data.country = "Brasil";
		data.complement = data.complement || "";

		const updAddress = await apiClient.put("/edit-address", data);

		if (updAddress.status === 200) {
			toast.success("Endereço atualizado com sucesso!");
			onClose();
			await inicialize();
			setLoading(false);
			return;
		} else if (updAddress.data?.err) {
			toast.info("Esse endereço não existe!");
			setLoading(false);
			return;
		} else {
			toast.error("Erro ao atualizar endereço, verifique seus dados!");
			setLoading(false);
			return;
		}
	};

	const handleChangeZipCode = async (zipcode) => {
		zipcode = zipcode.replace(/[^\d]/g, "");

		if (zipcode.length !== 8) {
			setError("zipcode", { message: "Numeros de Caracteres Inválido" });
		} else {
			clearErrors();
			const consulta = await axios("https://viacep.com.br/ws/" + zipcode + "/json/");
			if (consulta.data?.erro === true || consulta.status === 400) {
				setError("zipcode", { message: "CEP Inválido!" });
				return;
			} else {
				clearErrors();
				const data = consulta.data;

				setValue("zipcode", data.cep);
				setValue("street", data.logradouro);
				setValue("neighborhood", data.bairro);
				setValue("state", data.uf);
				setValue("city", data.localidade);
			}
		}
	};

	return (
		<>
			<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalHeader>Insira as informações do seu endereço</ModalHeader>
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										isRequired
										{...field}
										label="Nome"
										variant="bordered"
										isInvalid={!!errors.name?.message}
										errorMessage={errors.name?.message}
									/>
								)}
							/>
							<Controller
								name="zipcode"
								control={control}
								render={({ field }) => (
									<Input
										endContent={
											<span className=" rounded-full px-2 cursor-pointer h-full flex items-center justify-center">
												{" "}
												<SearchIcon size={20} />{" "}
											</span>
										}
										onValueChange={handleChangeZipCode}
										isRequired
										{...field}
										label="CEP"
										variant="bordered"
										isInvalid={!!errors.zipcode?.message}
										errorMessage={errors.zipcode?.message}
									/>
								)}
							/>
							<div className="flex gap-2">
								<Controller
									name="street"
									control={control}
									render={({ field }) => (
										<Input
											isRequired
											{...field}
											variant="faded"
											label="Rua"
											isInvalid={!!errors.street?.message}
											errorMessage={errors.street?.message}
										/>
									)}
								/>
								<Controller
									name="number"
									control={control}
									render={({ field }) => (
										<Input
											isRequired
											className="w-2/5"
											{...field}
											variant="bordered"
											label="Número"
											isInvalid={!!errors.number?.message}
											errorMessage={errors.number?.message}
										/>
									)}
								/>
							</div>
							<Controller
								name="neighborhood"
								control={control}
								render={({ field }) => (
									<Input
										isRequired
										{...field}
										label="Bairro"
										variant="bordered"
										isInvalid={!!errors.neighborhood?.message}
										errorMessage={errors.neighborhood?.message}
									/>
								)}
							/>

							<Controller
								name="city"
								control={control}
								render={({ field }) => (
									<Input
										isRequired
										{...field}
										variant="bordered"
										label="Cidade"
										isInvalid={!!errors.city?.message}
										errorMessage={errors.city?.message}
									/>
								)}
							/>
							<Controller
								name="state"
								control={control}
								render={({ field }) => (
									<Select
										label="Estado"
										isRequired
										{...field}
										selectedKeys={selectValue}
										onSelectionChange={(e) => {
											setSelectValue(e);
										}}
										isInvalid={!!errors.state?.message}
										errorMessage={errors.state?.message}
										variant="bordered">
										{estados.map((estado) => (
											<SelectItem key={estado} value={estado}>
												{estado}
											</SelectItem>
										))}
									</Select>
								)}
							/>

							<Controller
								name="complement"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										variant="bordered"
										label="Complemento"
										isInvalid={!!errors.complement?.message}
										errorMessage={errors.complement?.message}
									/>
								)}
							/>
							<Divider />
							<Button type="submit" color="success" className="text-palette-base-main">
								{loading ? <Spinner color="default" /> : <span>Confirmar</span>}
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

const estados = [
	"AC",
	"AL",
	"AP",
	"AM",
	"BA",
	"CE",
	"DF",
	"ES",
	"GO",
	"MA",
	"MS",
	"MT",
	"MG",
	"PA",
	"PB",
	"PR",
	"PE",
	"PI",
	"RJ",
	"RN",
	"RS",
	"RO",
	"RR",
	"SC",
	"SP",
	"SE",
	"TO",
];
