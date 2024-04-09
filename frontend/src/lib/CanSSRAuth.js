import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

//function para paginas  que so users logados podem ter acesso

export function canSSRAuth(fn) {
	return async (context) => {
		const cookies = parseCookies(context);
		const token = cookies["@lojaonline.token"];
		if (!token) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}

		try {
			return await fn(context);
		} catch (err) {
			if (err instanceof AuthTokenError) {
				destroyCookie(context, "@lojaonline.token");
				return {
					redirect: {
						destination: "/",
						permanent: false,
					},
				};
			}
		}
		return;
	};
}
