import express from "express";
import { routes } from "./routes.js";
import "express-async-errors";
import cors from "cors";

import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

const __dirname = path.resolve();
app.use("/file", express.static(path.resolve(__dirname, "..", "tmp")));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp_products")));

app.use((err, req, res, next) => {
	if (err instanceof Error) {
		// Se for uma instancia do tipo error
		return res.status(400).json({
			error: err.message,
		});
	}
	return res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
});

app.listen(3333, () => console.log("Servidor Online!"));
