import { apiClient } from "@/services/apiClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
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
				if (!credentials) {
					return null;
				}
				try {
					const response = await apiClient.get("/login", {
						email: credentials.email,
						password: credentials.password,
					});

					return response.data;
				} catch (error) {
					return { error: error };
				}
			},
		}),
	],
});
