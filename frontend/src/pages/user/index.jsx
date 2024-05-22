import Header from "@/components/Header/NavBar";
import {
	Avatar,
	Card,
	CardBody,
	Tab,
	Tabs,
	Spinner,
	Input,
	Tooltip,
	Button,
	Divider,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
} from "@nextui-org/react";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import useStore from "@/data/global_states/useProducts";
import { useEffect, useState } from "react";
import { EditIcon } from "@/components/Table/EditIcon";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-toastify";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { canSSRAuth } from "@/lib/CanSSRAuth";
import { signOut } from "next-auth/react";
import Head from "next/head";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { CirclePlus } from "lucide-react";
import AddressFormModal from "@/components/ui/ModalAddAddress";
import { DeleteIcon } from "@/components/Table/DeleteIcon";
import { ModalDeleteAddress } from "@/components/ui/ModalDeleteAddress";
import { ModalEditAddress } from "@/components/ui/ModalEditAddress";

const loginSchema = z.object({
	email: z
		.string({
			required_error: "Insira um Email",
			invalid_type_error: "Email Incorreto",
		})
		.email({ message: "Insira um email correto." }),
	name: z
		.string({
			required_error: "Insira um nome correto.",
		})
		.min(4, { message: "O seu nome deve conter no minímo 4 caracteres" }),
});

export default function UserPage() {
	const router = useRouter();
	const user = useStore((state) => state.user);
	const [userConfig, setUserConfig] = useState(user);
	const [loading, setLoading] = useState(false);
	const [isDisabled, setisDisabled] = useState(true);

	const [info, setInfo] = useState({});

	const { isOpen: isOpenModalAddress, onOpen: onOpenModalAddress, onClose: onCloseModalAddress } = useDisclosure();
	const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
	const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();

	const handleDisabled = () => {
		setisDisabled(false);
	};

	const {
		handleSubmit,
		control,
		formState: { errors },
		clearErrors,
		setError,
		setValue,
	} = useForm({
		mode: "onBlur",

		resolver: zodResolver(loginSchema),
	});

	useEffect(() => {
		if (userConfig) {
			setValue("email", userConfig.email);
			setValue("name", userConfig.name);
		}
	}, [userConfig, setValue]);

	const handleChangeInfos = async (data) => {
		setLoading(true);
		const updUser = await apiClient.put("/user/" + user.id, {
			name: data.name,
			email: data.email,
			password: null,
			id: user.id,
		});
		if (updUser.status === 200) {
			toast.success("Usuario atualizado com sucesso, você será deslogado,faça seu login novamente!");
			setTimeout(async () => {
				setLoading(false);
				await signOut({ redirect: false });
				destroyCookie(null, "@lojaonline.token");
				router.push("/login");
			}, 5000);
		} else {
			toast.error("Erro ao encontrar o usuário!");
			location.reload();
		}
	};

	return (
		<div className="h-screen">
			<Head>
				<title>Perfil - uShop</title>
			</Head>
			<Header />
			<main className="bg-palette-base-gray500/20 h-full ">
				<div className="flex m-auto mt-8 flex-col gap-12  bg-palette-base-gray100/60 rounded-md p-5 max-w-[650px] min-h-96">
					{userConfig ? (
						<>
							<div className="w-full flex justify-center">
								<h1 className="font-medium text-2xl  lg:text-4xl ">Configurações do Usuário</h1>
							</div>
							<div>
								<div className="flex items-center w-full flex-col flex-wrap gap-4">
									<Tabs aria-label="Options" placement="top" variant="bordered" className="flex flex-col " color="default" isVertical="true">
										<Tab
											key="settings"
											className="w-[100%] md:w-[80%] "
											title={
												<div className="flex items-center space-x-2 ">
													<SettingsIcon />
													<span>Configurações</span>
												</div>
											}>
											<Card>
												<CardBody className="flex flex-col gap-5 pb-4">
													<div className="flex gap-4 p-2 justify-between">
														<div className="flex gap-4 p-2 items-center">
															<Avatar />
															<span className="font-medium">{userConfig?.name}</span>
														</div>
														<div className="flex items-center justify-center">
															{isDisabled ? (
																<Tooltip content="Alterar Informações">
																	<span
																		onClick={() => {
																			handleDisabled();
																		}}>
																		<EditIcon cursor="pointer" />
																	</span>
																</Tooltip>
															) : (
																<Tooltip content="Cancelar Alterações">
																	<span
																		onClick={() => {
																			setValue("email", userConfig.email);
																			setValue("name", userConfig.name);
																			clearErrors();
																			setisDisabled(true);
																		}}>
																		<CloseIcon sx={{ cursor: "pointer" }} />
																	</span>
																</Tooltip>
															)}
														</div>
													</div>
													<div className="flex flex-col pb-4">
														<span className="font-medium p-2 text-xl">Informações</span>
														<form onSubmit={handleSubmit(handleChangeInfos)} className="flex flex-col gap-4">
															<Controller
																name="name"
																control={control}
																rules={{ required: "Insira um Name" }}
																render={({ field }) => (
																	<>
																		<Input
																			disabled={isDisabled}
																			onValueChange={(e) => {
																				setValue("name", e);
																			}}
																			label="Nome"
																			placeholder="Insira seu nome"
																			type="text"
																			variant="bordered"
																			isInvalid={!!errors?.name?.message}
																			errorMessage={errors?.name?.message}
																			{...field}
																			classNames={{
																				input: [isDisabled ? "!cursor-not-allowed" : "!cursor-text"],
																				inputWrapper: [isDisabled ? "!cursor-not-allowed" : "!cursor-text"],
																			}}
																		/>
																	</>
																)}
															/>
															<Controller
																name="email"
																control={control}
																rules={{ required: "Insira um Email" }}
																render={({ field }) => (
																	<>
																		<Input
																			disabled={isDisabled}
																			onValueChange={(e) => {
																				setValue("email", e);
																			}}
																			classNames={{
																				input: [isDisabled ? "!cursor-not-allowed" : "!cursor-text"],
																				inputWrapper: [isDisabled ? "!cursor-not-allowed" : "!cursor-text"],
																			}}
																			label="Email"
																			placeholder="Insira seu email"
																			color="default"
																			type="email"
																			isInvalid={!!errors?.email?.message}
																			errorMessage={errors?.email?.message}
																			variant="bordered"
																			{...field}
																		/>
																	</>
																)}
															/>

															{!isDisabled && (
																<div className="flex gap-6 flex-col">
																	<Button type="submit" className="w-full text-palette-base-main " color="success">
																		{loading ? <Spinner color="default" /> : <span>Confirmar Alterações</span>}
																	</Button>
																</div>
															)}
															{isDisabled && (
																<div className="flex flex-col gap-2">
																	<Divider className="mt-12" />
																	<Button
																		onClick={async () => {
																			setLoading(true);
																			await signOut({ redirect: false });
																			destroyCookie(null, "@lojaonline.token");
																			router.push("/");
																			location.reload();
																			setLoading(false);
																		}}
																		className="w-full text-palette-base-main mt-6"
																		color="danger">
																		{loading ? <Spinner color="default" /> : <span>Sair</span>}
																	</Button>
																</div>
															)}
														</form>
													</div>
												</CardBody>
											</Card>
										</Tab>
										<Tab
											key="address"
											className="w-[100%] md:w-[80%] "
											title={
												<div className="flex items-center space-x-2 ">
													<HomeIcon />
													<span>Endereços</span>
												</div>
											}>
											<Card>
												<CardBody>
													<ul className="flex justify-center flex-col px-1 gap-2 md:gap-4 md:px-6 ">
														<li className="flex justify-center items-center cursor-pointer w-full px-4 rounded-md h-[60px] bg-palette-base-gray100">
															<Tooltip content="Adicionar Endereço">
																<span
																	onClick={() => {
																		onOpenModalAddress();
																	}}
																	className=" rounded-full p-2 transition-all transition-duration: 300ms; hover:bg-palette-base-gray-600/50 ">
																	<CirclePlus />
																</span>
															</Tooltip>
														</li>
														{user?.address?.map((adr) => (
															<div className="flex flex-col gap-4" key={adr.id}>
																<Divider />
																<li className="flex  justify-center items-center w-full rounded-md h-[84px] bg-palette-base-gray100 px-1 gap-2 py-1 md:px-4 md:gap-4 md:py-2 ">
																	<span className="flex flex-col text-ellipsis text-center items-center lg:text-sm gap-1 md:gap-2 w-16 text-[10px] ">
																		<HomeIcon fontSize="small" /> {adr.name}{" "}
																	</span>
																	<Divider orientation="vertical" />
																	<div className="w-10/12 flex gap-2 items-center">
																		<div className="max-w-36 md:max-w-none ">
																			<h3 className="text-[12px] md:text-sm truncate whitespace-normal">
																				{adr.street} - {adr.number}
																			</h3>
																			<span className="text-[12px] truncate whitespace-nowrap">
																				{adr.city} - {adr.state}
																			</span>
																			<span className="text-[12px] truncate whitespace-nowrap"> {adr.zipcode} </span>
																		</div>
																	</div>
																	<div className="flex flex-col gap-4 mr-2">
																		<Tooltip content="Alterar Informações">
																			<span
																				onClick={() => {
																					setInfo(adr);
																					onOpenModalEdit();
																				}}>
																				<EditIcon />
																			</span>
																		</Tooltip>
																		<Tooltip color="danger" content="Excluir Endereço">
																			<span
																				className="text-danger"
																				onClick={() => {
																					setInfo({ id: adr.id });
																					onOpenModalDelete();
																				}}>
																				<DeleteIcon cursor="pointer" />
																			</span>
																		</Tooltip>
																	</div>
																</li>
															</div>
														))}
													</ul>
												</CardBody>
											</Card>
										</Tab>
									</Tabs>
								</div>
							</div>
						</>
					) : (
						<div className="flex w-full h-full justify-center items-center">
							<Spinner color="success" />
						</div>
					)}
				</div>
			</main>
			{isOpenModalAddress && <AddressFormModal isOpen={isOpenModalAddress} onOpen={onOpenModalAddress} onClose={onCloseModalAddress} />}
			{isOpenModalDelete && <ModalDeleteAddress isOpen={isOpenModalDelete} onOpen={onOpenModalDelete} onClose={onCloseModalDelete} info={info} />}
			{isOpenModalEdit && <ModalEditAddress isOpen={isOpenModalEdit} onOpen={onOpenModalEdit} onClose={onCloseModalEdit} info={info} />}
		</div>
	);
}

export const getServerSideProps = canSSRAuth(async (context) => {
	return {
		props: {},
	};
});
