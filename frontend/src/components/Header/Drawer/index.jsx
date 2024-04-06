import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer({
	setDrawerOpen,
	drawerOpen,
	categories,
	brands,
}) {
	const toggleDrawer = (newOpen) => () => {
		setDrawerOpen(newOpen);
	};

	const DrawerList = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}>
			<List>
				{categories.map((text, index) => (
					<ListItem key={text.id} disablePadding>
						<ListItemButton>
							<ListItemText primary={text.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{brands.map((text, index) => (
					<ListItem key={text.id} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}
