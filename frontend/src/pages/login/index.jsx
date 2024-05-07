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
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { canSSRGuest } from "@/lib/CanSSRGuest";
import useStore from "@/data/global_states/useProducts";
import { useState } from "react";
import Head from "next/head";

const loginSchema = z.object({
	email: z
		.string({
			required_error: "Insira um Email",
			invalid_type_error: "Email Incorreto",
		})
		.email({ message: "Insira um email correto." }),
	password: z.string({
		required_error: "Insira uma Senha.",
	}),
});

export default function Login() {
	const router = useRouter();
	const inicialize = useStore((state) => state.inicialize);
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm({
		mode: "onBlur",
		shouldUnregister: true, // Adicione shouldUnregister: true
		resolver: zodResolver(loginSchema),
	});

	async function handleLogin(data) {
		setLoading(true);
		try {
			const response = await signIn("credentials", {
				email: data.email,
				password: data.password,
				callbackUrl: "/",
				redirect: false,
			});
			console.log(response);

			if (response.status === 401) {
				//setError("email", { message: "Email ou senha incorretos!" });
				setError("password", { message: "Email ou senha incorretos!" });

				setLoading(false);
				return;
			}
			if (response.status === 200) {
				await inicialize();
				setLoading(false);
				router.push("/");
			}
		} catch (error) {
			setLoading(false);
			setError("email", { message: "Falha no Login" });
			throw error;
		}
	}

	return (
		<div className="w-full lg:grid h-screen lg:grid-cols-2">
			<Head>
				<title>Entrar - Brisa</title>
			</Head>
			<form onSubmit={handleSubmit(handleLogin)} className="lg:flex lg:items-center lg:justify-center bg-palette-base-gray500/45">
				<div className="grid lg:w-[450px] gap-6 rounded-md pb-4 bg-palette-base-main">
					<div className="grid gap-6 py-6 rounded-t-md text-center bg-palette-primary-main text-palette-base-main">
						<h1 className="text-3xl font-bold">Entrar</h1>
						<p className="text-balance text-muted-foreground ">Entre com o seu Email e Senha ou Crie sua Conta</p>
					</div>
					<div className="grid gap-4 px-8">
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
							<div className="flex items-center">
								<Label htmlFor="password">Senha</Label>
								<Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
									Esqueceu a Senha?
								</Link>
							</div>
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
						<Button type="submit" className="w-full text-palette-base-main " color="success">
							{loading ? <Spinner color="default" /> : <span>Entrar</span>}
						</Button>
						<Button variant="faded" color="success" className="w-full flex justify-center items-center">
							Entrar com o Google
							<GoogleIcon />
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Não tenho uma conta?{" "}
						<Link href="/signup" className="underline text-palette-primary-light">
							Cadastrar-se
						</Link>
					</div>
				</div>
			</form>
			<div className="hidden bg-muted lg:block">
				<Image src="/sapiens.svg" alt="Image" width="1920" height="1080" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
			</div>
		</div>
	);
}

export const getServerSideProps = canSSRGuest(async (context) => {
	return {
		props: {},
	};
});
