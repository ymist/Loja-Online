import { parseCookies } from "nookies";

export default function checkJWT() {
	const cookies = parseCookies();
	const token = cookies["@lojaonline.token"];
	return token ? token : false;
}
