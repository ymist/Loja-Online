"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			...credentials,
		});
		if (!result?.error) {
			// Redirecionar para página após o login
			// Router.push("/dashboard");
		} else {
			console.error("Erro durante o login:", result.error);
			// Exibir mensagem de erro para o usuário
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={credentials.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Senha:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Entrar</button>
			</form>
		</div>
	);
}
