import multer from "multer";
import crypto from "crypto";
import path, { extname, resolve } from "path";

export default {
	upload(folder) {
		const __dirname = path.resolve();
		return {
			storage: multer.diskStorage({
				destination: resolve(__dirname, folder),
				filename: (request, file, callback) => {
					const fileHash = crypto.randomBytes(16).toString("hex");
					const fileName = `${fileHash}-${file.originalname}`;

					return callback(null, fileName);
				},
			}),
		};
	},
};
