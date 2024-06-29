import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
export function setupAPIClient(ctx) {
	let cookies = parseCookies(ctx);
	//sasas
	const api = axios.create({
		//baseURL: "https://loja-online.onrender.com",
		baseURL: "http://localhost:3333",
		//baseURL: "https://loja-online-production-ab7e.up.railway.app",
	});

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error?.response?.status === 401) {
				//qualquer erro 401 devemos deslogar o usuario
				if (typeof window !== undefined) {
					//chamar funcao para deslogar o usuario
					retunr;
				} else {
					return Promise.reject(new AuthTokenError());
				}
			}

			return Promise.reject(error);
		},
	);
	return api;
}
