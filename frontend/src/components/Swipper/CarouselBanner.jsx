import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@mui/material";

export default function CarouselBanner() {
	const isDesktop = useMediaQuery("(min-width: 900px)");

	// Lista de imagens do carrossel
	const images = ["/2151336347.jpg", "/2151336400.jpg"];

	// Estado para controlar o slide atual
	const [currentSlide, setCurrentSlide] = useState(0);

	// Função para avançar para o próximo slide
	const nextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === images.length - 1 ? 0 : prevSlide + 1,
		);
	};

	// Função para retroceder para o slide anterior
	const previousSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? images.length - 1 : prevSlide - 1,
		);
	};

	return (
		<>
			<Carousel className={isDesktop ? "w-[80%]" : "w-full"}>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index} className="pl-0">
							<div className="w-full border-none">
								<Card className="sm:h-[40vw] md:h-[20vw] h-[55vw] border-none">
									<img
										className="object-cover w-full h-full border-none"
										src={image}
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
