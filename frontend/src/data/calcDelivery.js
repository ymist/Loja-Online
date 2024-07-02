import axios from "axios";

export const calcDelivery = async (zipcode) => {
	// const respMelhorEnvio = await axios.post(
	// 	"https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
	// 	JSON.stringify({
	// 		from: {
	// 			postal_code: "01031970",
	// 		},
	// 		to: {
	// 			postal_code: zipcode,
	// 		},
	// 		package: {
	// 			height: 4,
	// 			width: 12,
	// 			length: 17,
	// 			weight: 0.3,
	// 		},
	// 	}),
	// 	{
	// 		headers: {
	// 			Accept: "application/json",
	// 			Authorizathion: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDU4Y2UzN2Q5NTg3ZmE2MTUxYjk0Y2Y3ZDI0MTY5YzVhMTkzYjA1NmExOWQxNTI5MTE5ODFlY2I3ZTM2YWI1Y2FiNmQ2YmNhMDVmZGQ5MTgiLCJpYXQiOjE3MTk4ODM3NDcuNzgzNTg3LCJuYmYiOjE3MTk4ODM3NDcuNzgzNTg5LCJleHAiOjE3NTE0MTk3NDcuNzcxOTI4LCJzdWIiOiI5YzZjMjg1MS1mNDc1LTRiZjAtYTJjNC1jYTFlMTFkNzJkMTMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.AR6edTlTVYk2P4LLDQkm6BfsJGlLT3vIUVwY48qsfF3SfhfT_IVKqCzevnVffEzpS3xh_Swcc2lsCcWW6TJVRCvIDiRDexU8nqZmTehUDIpOIcWogokRZDlaqoBUVB_W2lQ9JT-UHD9fmmiYuGpeEBX9HWjIK5_dDHjaCySh5bIZPbC-AkUGuUNYYeElEtTqmgNpbbGnoGytb2TOfhoVIRFrWrMwJJpk1JlztMysiCezH3lwqbwrRjp5mo25UJHBmNz5aTPhvO-e4HaHHEN7liSjc4Ihxg_hmAkmx-UFNO968nh590SQHcW0t4N5F78UIuw9ZPlszoIl81SEfA3K_u6CMqQAZqx94JFFmTQHlCPmpLa7xSbjU6qf4ZCnzoMW4PDPxtVr5z7fO-HVHKDRtQAZn6fJolzzYXDs1WvoeUDM1zo4G15BNDO-gGNdlX8OPZ9IEMMfU8WlYLgD1WsHrZOu7nGkY_C0OaEF6oOZnMyyA1ipK_cQNfAnl4UH1BZZnX4wcOWBLjXcLW3p_R-GvnD1xvI3yQmV36roH7yibZQQrFhmOSAfQ_9Dzpo01wTypLhesFdBC5P0y7iZ_0-Q9_kApk9D9apu9Gmglz0mAET6sHm7tFZyiVsVaJI1mpJNeahJb-3V5jS847rNutBdZDAOmN_ZHszzdDgm1pajEus`,
	// 			"Content-Type": "application/json",
	// 		},
	// 	},
	// );

	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization:
				"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDU4Y2UzN2Q5NTg3ZmE2MTUxYjk0Y2Y3ZDI0MTY5YzVhMTkzYjA1NmExOWQxNTI5MTE5ODFlY2I3ZTM2YWI1Y2FiNmQ2YmNhMDVmZGQ5MTgiLCJpYXQiOjE3MTk4ODM3NDcuNzgzNTg3LCJuYmYiOjE3MTk4ODM3NDcuNzgzNTg5LCJleHAiOjE3NTE0MTk3NDcuNzcxOTI4LCJzdWIiOiI5YzZjMjg1MS1mNDc1LTRiZjAtYTJjNC1jYTFlMTFkNzJkMTMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.AR6edTlTVYk2P4LLDQkm6BfsJGlLT3vIUVwY48qsfF3SfhfT_IVKqCzevnVffEzpS3xh_Swcc2lsCcWW6TJVRCvIDiRDexU8nqZmTehUDIpOIcWogokRZDlaqoBUVB_W2lQ9JT-UHD9fmmiYuGpeEBX9HWjIK5_dDHjaCySh5bIZPbC-AkUGuUNYYeElEtTqmgNpbbGnoGytb2TOfhoVIRFrWrMwJJpk1JlztMysiCezH3lwqbwrRjp5mo25UJHBmNz5aTPhvO-e4HaHHEN7liSjc4Ihxg_hmAkmx-UFNO968nh590SQHcW0t4N5F78UIuw9ZPlszoIl81SEfA3K_u6CMqQAZqx94JFFmTQHlCPmpLa7xSbjU6qf4ZCnzoMW4PDPxtVr5z7fO-HVHKDRtQAZn6fJolzzYXDs1WvoeUDM1zo4G15BNDO-gGNdlX8OPZ9IEMMfU8WlYLgD1WsHrZOu7nGkY_C0OaEF6oOZnMyyA1ipK_cQNfAnl4UH1BZZnX4wcOWBLjXcLW3p_R-GvnD1xvI3yQmV36roH7yibZQQrFhmOSAfQ_9Dzpo01wTypLhesFdBC5P0y7iZ_0-Q9_kApk9D9apu9Gmglz0mAET6sHm7tFZyiVsVaJI1mpJNeahJb-3V5jS847rNutBdZDAOmN_ZHszzdDgm1pajEus",
			"User-Agent": "Aplicação bruno@teste.com",
		},
		body: JSON.stringify({
			from: { postal_code: "01002001" },
			to: { postal_code: "90570020" },
			package: { height: 4, width: 12, length: 17, weight: 0.3 },
		}),
	};

	fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			if (response) {
				return;
			}
		})
		.catch((err) => console.error(err));
};

//eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDU4Y2UzN2Q5NTg3ZmE2MTUxYjk0Y2Y3ZDI0MTY5YzVhMTkzYjA1NmExOWQxNTI5MTE5ODFlY2I3ZTM2YWI1Y2FiNmQ2YmNhMDVmZGQ5MTgiLCJpYXQiOjE3MTk4ODM3NDcuNzgzNTg3LCJuYmYiOjE3MTk4ODM3NDcuNzgzNTg5LCJleHAiOjE3NTE0MTk3NDcuNzcxOTI4LCJzdWIiOiI5YzZjMjg1MS1mNDc1LTRiZjAtYTJjNC1jYTFlMTFkNzJkMTMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.AR6edTlTVYk2P4LLDQkm6BfsJGlLT3vIUVwY48qsfF3SfhfT_IVKqCzevnVffEzpS3xh_Swcc2lsCcWW6TJVRCvIDiRDexU8nqZmTehUDIpOIcWogokRZDlaqoBUVB_W2lQ9JT-UHD9fmmiYuGpeEBX9HWjIK5_dDHjaCySh5bIZPbC-AkUGuUNYYeElEtTqmgNpbbGnoGytb2TOfhoVIRFrWrMwJJpk1JlztMysiCezH3lwqbwrRjp5mo25UJHBmNz5aTPhvO-e4HaHHEN7liSjc4Ihxg_hmAkmx-UFNO968nh590SQHcW0t4N5F78UIuw9ZPlszoIl81SEfA3K_u6CMqQAZqx94JFFmTQHlCPmpLa7xSbjU6qf4ZCnzoMW4PDPxtVr5z7fO-HVHKDRtQAZn6fJolzzYXDs1WvoeUDM1zo4G15BNDO-gGNdlX8OPZ9IEMMfU8WlYLgD1WsHrZOu7nGkY_C0OaEF6oOZnMyyA1ipK_cQNfAnl4UH1BZZnX4wcOWBLjXcLW3p_R-GvnD1xvI3yQmV36roH7yibZQQrFhmOSAfQ_9Dzpo01wTypLhesFdBC5P0y7iZ_0-Q9_kApk9D9apu9Gmglz0mAET6sHm7tFZyiVsVaJI1mpJNeahJb-3V5jS847rNutBdZDAOmN_ZHszzdDgm1pajEus
