import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
export function setupAPIClient(ctx) {
	let cookies = parseCookies(ctx);

	const api = axios.create({
		baseURL: "http://localhost:3333",
	});

	// api.interceptors.response.use(
	// 	(response) => {
	// 		return response;
	// 	},
	// 	(error) => {
	// 		if (error.response.status === 401) {
	// 			//qualquer erro 401 devemos deslogar o usuario
	// 			if (typeof window !== undefined) {
	// 				//chamar funcao para deslogar o usuario
	// 				retunr;
	// 			} else {
	// 				return Promise.reject(new AuthTokenError());
	// 			}
	// 		}

	// 		return Promise.reject(error);
	// 	},
	// );
	return api;
}
