import { parseCookies } from "nookies";

//function para paginas que so podem ser acessadas por visitante

export function canSSRGuest(fn) {
	return async (context) => {
		const cookies = parseCookies(context);
		//Se o cara tentar  acessar a pagina porem tendo um login salvo redirecionamos
		if (cookies["@lojaonline.token"]) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}

		return await fn(context);
	};
}
