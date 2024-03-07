import jsonwebtoken from "jsonwebtoken/index.js";

export const isAuthToken = (req, res, next) => {
	const { verify } = jsonwebtoken;
	const authToken = req.headers.authorization;
	if (!authToken) {
		return res.status(401).end();
	}

	const [, token] = authToken.split(" ");

	try {
		//Validar esse token
		const { sub } = verify(token, process.env.JWT_SECRET);

		//Recuperar o id do token e colocar numa variavel no req
		req.user_id = sub;

		return next();
	} catch (err) {
		return res.status(401).end();
	}
};
