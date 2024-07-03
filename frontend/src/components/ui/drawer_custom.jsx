import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Divider, Input, Button } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react"; // Importado de 'lucide-react'

const drawerBleeding = 66;

const Root = styled("div")(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
	borderRadius: 3,
	position: "absolute",
	top: 8,
	left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer({ window, cart, onOpenModalConfirmPurchase, handleCep, cep, frete }) {
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	// Container utilizado apenas para o exemplo
	const container = window !== undefined ? () => window().document.body : undefined;

	const handleConfirmPurchase = () => {
		toggleDrawer(false)();
		onOpenModalConfirmPurchase();
	};

	return (
		<Root>
			<CssBaseline />
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(50% - ${drawerBleeding}px)`,
						overflow: "visible",
					},
				}}
			/>
			<SwipeableDrawer
				container={container}
				anchor="bottom"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
				}}>
				<StyledBox
					sx={{
						position: "absolute",
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: "visible",
						right: 0,
						left: 0,
					}}>
					<Puller />
					<Typography sx={{ p: 3, color: "text.secondary", display: "flex", justifyContent: "space-between" }}>
						<h1 className="text-xl text-palette-base-gray-900 font-semibold">Resumo da Compra</h1>
						<ShoppingBag />
					</Typography>
				</StyledBox>
				<StyledBox
					sx={{
						px: 2,
						pb: 2,
						height: "100%",
						overflow: "auto",
					}}>
					<div className="w-full flex flex-col gap-4 bg-palette-base-main shadow-md p-3 rounded-lg">
						<Divider />
						<div className="text-md font-medium text-palette-base-gray-900 flex justify-between w-full">
							<h2 className="text-palette-base-gray-900">Calcular Frete</h2>
							<img className="w-6 h-6" src="/assets/svg/truck_delivery.svg" />
						</div>
						<Input variant="bordered" type="text" placeholder="CEP" aria-label="Input de CEP" onValueChange={handleCep} value={cep} />
						<Divider />
						<div className="w-full flex min-h-[20%] flex-col justify-between">
							<div className="flex flex-col h-min">
								<div className="flex justify-between">
									<h2 className="text-palette-base-gray-900">Subtotal:</h2>
									<h2 className="text-palette-base-gray-900">
										R$ {cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0).toFixed(2)}
									</h2>
								</div>
								<div className="flex justify-between">
									<h2 className="text-palette-base-gray-900 font-light">Descontos:</h2>
									<h2 className="text-palette-base-gray-900 font-light">R$ 0.00</h2>
								</div>
								<div className="flex justify-between">
									<h2 className="text-palette-base-gray-900 font-light">Frete:</h2>
									<h2 className="text-palette-base-gray-900 font-light">R$ {frete}</h2>
								</div>
							</div>
							<div className="w-full flex justify-between">
								<h2 className="text-palette-base-gray-900 font-medium">Total:</h2>
								<h2 className="text-palette-base-gray-900 font-medium text-lg">
									R${" "}
									{(
										cart.reduce((total, item) => total + parseFloat(item.price.replace(",", ".")) * item.quantity, 0) + parseFloat(frete)
									).toFixed(2)}
								</h2>
							</div>
						</div>
						<Divider />
						<Button
							className="w-full font-medium text-palette-tertiary-light cursor-pointer rounded-md py-2"
							variant="solid"
							size="md"
							onClick={handleConfirmPurchase}
							color="success">
							Confirmar Compra
						</Button>
					</div>
				</StyledBox>
			</SwipeableDrawer>
		</Root>
	);
}

SwipeableEdgeDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
