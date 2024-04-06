import { styled } from "styled-components";

import { useTheme } from "@emotion/react";

import PrimarySearchAppBar from "../Menu";
const StyledHeader = styled.header`
	width: 100%;
	height: min-content;
	display: flex;
	flex-direction: column;
	background-color: "white";
	color: ${(props) =>
		props.theme.text.light.primary}; /* Use theme a partir de props */
	box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
		rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const StyledDiv = styled.div`
	width: ${(props) => props.$w || "100%"};
	height: ${(props) => props.$h || "70px"};
	color: ${(props) => props.color || "white"};
	padding: ${(props) => props.$padding || "1rem"};
	background-color: ${(props) =>
		props.backgcolor ||
		props.theme.palette.primary.main}; /* Use theme a partir de props */
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

export default function Header({ items }) {
	const theme = useTheme(); // Obtém o tema usando o hook useTheme do Material-UI
	return (
		<StyledHeader theme={theme}>
			<PrimarySearchAppBar cartCount={10} notifyCount={18} />
			<StyledDiv
				$h="50px"
				$gap="5%"
				$justC="center"
				$padding="0% 10% 0% 10%"
				theme={theme}>
				{items ? (
					<>
						{items.map((item) => {
							return (
								<span key={item.id}>
									{item.name.toUpperCase()}
								</span>
							);
						})}
					</>
				) : null}
			</StyledDiv>
		</StyledHeader>
	);
}
