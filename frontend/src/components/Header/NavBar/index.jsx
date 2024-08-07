"use client";
import { styled } from "styled-components";

import { useTheme } from "@emotion/react";

import PrimarySearchAppBar from "../Menu";
import useStore from "@/data/global_states/useProducts";
import { useRouter } from "next/router";
import { FlyoutItems } from "@/components/ui/flyout_items";
const StyledHeader = styled.header`
	width: 100%;
	height: min-content;
	display: flex;
	flex-direction: column;
	background-color: "white";
	color: ${(props) => props.theme.text.light.primary}; /* Use theme a partir de props */
`;

const StyledDiv = styled.div`
	width: ${(props) => props.$w || "100%"};
	height: ${(props) => props.$h || "70px"};
	color: ${(props) => props.color || "white"};
	padding: ${(props) => props.$padding || "1rem"};
	background-color: ${(props) => props.backgcolor || props.theme.palette.primary.main}; /* Use theme a partir de props */
	display: flex;
	flex-direction: ${(props) => props.$flexD || "row"};
	align-items: center;
	justify-content: ${(props) => props.$justC || "none"};
	gap: ${(props) => props.$gap || "0"};

	> span {
		font-weight: ${(props) => props.$fw || 500};
		letter-spacing: 2px;
		font-size: clamp(8px, 2vw, 16px);
		cursor: pointer;
		transition: ease-in 0.15s;
		&:hover {
			//filter: opacity(0.6);
			//transform: scale(1.04);
			text-decoration: underline;
		}
	}
	@media (max-width: 900px) {
		display: none; /* Esconder o componente em telas menores que 768px */
	}
`;

export default function Header() {
	const theme = useTheme(); // Obtém o tema usando o hook useTheme do Material-UI
	const items = useStore((state) => state.categories);
	const router = useRouter();
	return (
		<StyledHeader theme={theme}>
			<PrimarySearchAppBar cartCount={10} notifyCount={18} />
			<StyledDiv $h="50px" $gap="5%" $justC="center" $padding="0% 10% 0% 10%" theme={theme}>
				{items ? (
					<>
						{items.map((item, index) => {
							return <FlyoutItems key={index} category={item} />;
						})}
					</>
				) : null}
			</StyledDiv>
		</StyledHeader>
	);
}
