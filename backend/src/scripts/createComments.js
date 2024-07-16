import prismaClient from "../prisma/index.js";

//ANTES DE INICIAR PRECISA DO UM ARRAY DE USERS COM IDS

const getRandomComment = () => {
	const randomIndex = Math.floor(Math.random() * comments.length);
	return comments[randomIndex];
};

const createComments = async () => {
	const products = await prismaClient.product.findMany({
		select: {
			id: true,
		},
	});

	for (let product of products) {
		for (let user of users) {
			const { title, rating, description } = getRandomComment();

			try {
				const comment = await prismaClient.comments.create({
					data: {
						title,
						rating,
						description,
						product_id: product.id,
						user_id: user.id,
						images: [],
					},
					select: {
						id: true,
						title: true,
						rating: true,
						description: true,
						images: true,
						product_id: true,
						user_id: true,
					},
				});

				console.log(comment);
			} catch (error) {
				console.log({ Erro: error });
			}
		}
	}
};

const comments = [
	{
		title: "Ótimo produto",
		description: "Entrega rápida e qualidade excelente. Recomendo!",
		rating: 5,
	},
	{
		title: "Muito satisfeito",
		description: "Produto atendeu todas as minhas expectativas. Excelente compra!",
		rating: 4,
	},
	{
		title: "Decepcionado",
		description: "Produto não funcionou como esperado. Péssima experiência.",
		rating: 2,
	},
	{
		title: "Surpreendente",
		description: "Acima das expectativas. Qualidade impressionante!",
		rating: 5,
	},
	{
		title: "Não recomendo",
		description: "Muito frágil e de baixa qualidade. Não vale o preço.",
		rating: 1,
	},
	{
		title: "Satisfeito",
		description: "Bom custo-benefício. Funciona bem para o dia a dia.",
		rating: 4,
	},
	{
		title: "Produto mediano",
		description: "Atende ao básico, mas poderia ser melhor. Qualidade ok.",
		rating: 3,
	},
	{
		title: "Impressionado",
		description: "Desempenho incrível. Superou minhas expectativas!",
		rating: 5,
	},
	{
		title: "Ruim",
		description: "Material de baixa qualidade. Quebrou na primeira semana.",
		rating: 1,
	},
	{
		title: "Excelente compra",
		description: "Ótimo custo-benefício. Recomendo a todos!",
		rating: 5,
	},
];

createComments();
