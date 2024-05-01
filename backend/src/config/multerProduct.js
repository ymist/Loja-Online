import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

export default {
	uploadProduct(folder) {
		const tmpProductsFolder = path.resolve(folder);

		return {
			storage: multer.diskStorage({
				destination: (req, file, callback) => {
					callback(null, tmpProductsFolder);
				},
				filename: (req, file, callback) => {
					// Verifica se o arquivo já existe na pasta
					const existingFiles = fs.readdirSync(tmpProductsFolder);
					const existingFile = existingFiles.find((fileName) =>
						fileName.startsWith(file.originalname),
					);

					if (existingFile) {
						// Se o arquivo existir, retorna o nome original
						callback(null, existingFile);
					} else {
						// Se o arquivo não existir, gera um novo nome com hash
						const fileHash = crypto.randomBytes(16).toString("hex");
						const fileName = `${fileHash}-${file.originalname}`;
						callback(null, fileName);
					}
				},
			}),
		};
	},
};
