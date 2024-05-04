"use client";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { InputLogin } from "@/components/ui/input_login";
import { Button, Spinner } from "@nextui-org/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { canSSRGuest } from "@/lib/CanSSRGuest";
import { apiClient } from "@/services/apiClient";
import { useState } from "react";
import Head from "next/head";

const signUpSchema = z.object({
	name: z
		.string({
			required_error: "Insira um Nome.",
		})
		.min(4, { message: "Insira um nome com pelos menos 4 caracteres!" }),
	email: z
		.string({
			required_error: "Insira um Email",
			invalid_type_error: "Email Incorreto",
		})
		.email({ message: "Insira um email correto." }),
	password: z
		.string({
			required_error: "Insira uma Senha.",
		})
		.min(8, { message: "Insira uma senha com pelo menos 8 caracteres!" }),
	confirmPassword: z.string({ required_error: "Confirme Sua Senha!" }),
});

export default function SignUp() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm({
		mode: "onBlur",
		shouldUnregister: true, // Adicione shouldUnregister: true
		resolver: zodResolver(signUpSchema),
	});

	async function handleSignUp(data) {
		setLoading(true);
		if (data.password !== data.confirmPassword) {
			setError("confirmPassword", {
				message: "As Senhas não são iguais!",
			});
			setLoading(false);
			return;
		}

		const response = await apiClient.post("/signup", {
			name: data.name,
			email: data.email,
			password: data.confirmPassword,
		});
		if (response?.error) {
			setLoading(false);
			setError("email", { message: response.error });
			return;
		}
		setLoading(false);
		router.push("/login");
	}

	return (
		<div className="w-full lg:grid h-screen lg:grid-cols-2">
			<Head>
				<title>Cadastrar - Brisa</title>
			</Head>
			<form onSubmit={handleSubmit(handleSignUp)} className="lg:flex lg:items-center lg:justify-center bg-palette-base-gray500/45">
				<div className="grid lg:w-[450px] gap-6 rounded-md pb-4 bg-palette-base-main">
					<div className="grid gap-6 py-6 rounded-t-md text-center bg-palette-primary-main text-palette-base-main">
						<h1 className="text-3xl font-bold">Cadastrar</h1>
					</div>
					<div className="grid gap-4 px-8">
						<div className="grid gap-2">
							<Label htmlFor="name">Nome de Usuário</Label>
							<Controller
								name="name"
								control={control}
								rules={{ required: "Insira um Nome" }}
								render={({ field }) => (
									<>
										<InputLogin type="text" placeholder="Nome" {...field} />
										{errors.name && <p className="text-palette-base-danger text-sm">{errors.name.message}</p>}
									</>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Controller
								name="email"
								control={control}
								rules={{ required: "Insira um Email" }}
								render={({ field }) => (
									<>
										<InputLogin type="email" placeholder="m@exemplo.com" {...field} />
										{errors.email && <p className="text-palette-base-danger text-sm">{errors.email.message}</p>}
									</>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<Label>Senha</Label>
							<Controller
								name="password"
								control={control}
								rules={{ required: "Insira uma Senha" }}
								render={({ field }) => (
									<>
										<InputLogin type="password" placeholder="Senha" {...field} />
										{errors.password && <p className="text-palette-base-danger text-sm">{errors.password.message}</p>}
									</>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<Label>Confirme Sua Senha</Label>
							<Controller
								name="confirmPassword"
								control={control}
								rules={{ required: "Confirme sua Senha!" }}
								render={({ field }) => (
									<>
										<InputLogin type="password" placeholder="Confirme sua Senha!" {...field} />
										{errors.confirmPassword && <p className="text-palette-base-danger text-sm">{errors.confirmPassword.message}</p>}
									</>
								)}
							/>
						</div>
						<Button type="submit" className="w-full text-palette-base-main " color="success">
							{loading ? <Spinner color="default" /> : <span>Cadastrar</span>}
						</Button>
						<Button variant="faded" color="success" className="w-full flex justify-center items-center">
							Cadastrar com o Google
							<GoogleIcon />
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Já tem uma conta?{" "}
						<Link href="/login" className="underline text-palette-primary-light">
							Entrar
						</Link>
					</div>
				</div>
			</form>
			<div className="hidden bg-muted lg:block">
				<Image
					src="/sapienssignup.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}

export const getServerSideProps = canSSRGuest(async (context) => {
	return {
		props: {},
	};
});
