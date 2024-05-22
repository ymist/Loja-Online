import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useMediaQuery } from "@mui/material";

export default function CarouselDetail({ images }) {
	const isDesktop = useMediaQuery("(min-width: 900px)");
	console.log(images);

	// Estado para controlar o slide atual
	const [currentSlide, setCurrentSlide] = useState(0);

	// Função para avançar para o próximo slide
	const nextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
	};

	// Função para retroceder para o slide anterior
	const previousSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
	};

	return (
		<>
			<Carousel className="w-full h-full">
				<CarouselContent className="h-full">
					{images?.map((image, index) => (
						<CarouselItem key={index} className="pl-0 h-[450px]">
							<div className="w-full border-none h-full">
								<Card className="h-full border-none">
									<img
										className="object-contain  w-full h-full border-none"
										src={`/produto-de-beleza-e-cosmeticos-com-tons-rosados-suaves.png`}
									/>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* Paginação com bolinhas de rádio */}

				{/* Botões de navegação */}
				{isDesktop && (
					<>
						<CarouselPrevious />
						<CarouselNext />
					</>
				)}
			</Carousel>
		</>
	);
}
