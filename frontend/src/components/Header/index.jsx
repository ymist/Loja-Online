import { styled } from "styled-components";

import { useTheme } from "@emotion/react";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const theme = useTheme();
	const StyledHeader = styled.header`
		width: 100%;
		height: 65px;
		display: flex;
		align-items: center;
		background-color: ${theme.palette.base.primary.main};
		color: ${theme.palette.text.light.primary};
	`;

	return (
		<StyledHeader>
			<Link href="/">
				<Image
					src="/LogoBrisaDesde1976.jpg"
					width={140}
					height={70}
					alt="Logo Header"
				/>
			</Link>
		</StyledHeader>
	);
}
