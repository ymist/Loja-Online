import React, { useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTheme } from "@emotion/react";

export default function Swipper() {
	const theme = useTheme();
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper">
				<SwiperSlide>
					<img src="/2151336400.jpg" />
				</SwiperSlide>
				<SwiperSlide>
					<img src="/2151336347.jpg" alt="teste2" />
				</SwiperSlide>
			</Swiper>
		</>
	);
}
