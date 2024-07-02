import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
export default function Footer() {
	return (
		<footer className="footer footer-center p-10 self-end bg-text-dark-grey_900 text-palette-base-main ">
			<aside className="flex flex-col gap-4">
				{/* <Image src="/LogoBrisaDesde1976.png" alt="Brisa" width={120} height={60} /> */}
				<h1 className="font-bold text-3xl text-palette-primary-dark">uShop</h1>
				{/* <p className="font-bold">
					Brisa <br />
					Provendo desde 1976.
				</p> */}
				<p>Copyright © 2024 - All right reserved</p>
				<a href="https://storyset.com/online" className="text-palette-tertiary-dark  hover:underline">
					Online illustrations by Storyset
				</a>
			</aside>
			<nav>
				<div className="grid grid-flow-col gap-4">
					<a href="https://github.com/ymisthttps://github.com/ymist">
						<Github color="#ffffff" strokeWidth={1.25} />
					</a>
					<a href="https://www.linkedin.com/in/bruno-rufatto/">
						<Linkedin color="#ffffff" strokeWidth={1.25} absoluteStrokeWidth />
					</a>
				</div>
			</nav>
		</footer>
	);
}
