import { apiClient } from "@/services/apiClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { setCookie } from "nookies";

const nextAuthOptions = (req, res) => {
	return {
		pages: {
			signIn: "/login",
		},
		providers: [
			CredentialsProvider({
				name: "Credentials",

				credentials: {
					email: { label: "Email", type: "email" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials) {
					console.log(credentials);
					if (!credentials.email || !credentials.password) {
						return null;
					}
					try {
						const response = await apiClient.post("/login", {
							email: credentials.email,
							password: credentials.password,
						});

						if (response.status !== 200) {
							return null;
						}

						const authData = response.data;
						console.log(authData.token, authData.id);
						if (!authData.token || !authData.id) {
							return null;
						}

						setCookie(
							{ res },
							"@lojaonline.token",
							authData.token,
							{
								maxAge: 30 * 24 * 60 * 60, // 30 days
								path: "/",
							},
						);

						apiClient.defaults.headers[
							"Authorization"
						] = `Bearer ${token}`;

						console.log("tetste");
						return {
							id: authData.id,
							email: authData.email,
							name: authData.name,
						};
					} catch (error) {
						console.log({ err: error });
						return null;
					}
				},
			}),
		],
	};
};

export default (req, res) => {
	return NextAuth(req, res, nextAuthOptions(req, res));
};
