import { Button, Tooltip } from "@nextui-org/react";
import { LayoutGrid, LayoutList, LayoutPanelLeft } from "lucide-react";

export const RadioLayout = ({ value, setValue }) => {
	const handleLayoutChange = (layout) => {
		setValue(layout);
	};

	return (
		<div className="flex gap-2">
			<Tooltip content="Vizualizar duas colunas">
				<Button
					color={value === "2" ? "success" : "default"}
					size="sm"
					isIconOnly
					className={`${value === "2" ? "text-palette-base-main" : "text-palette-base-gray-900"}`}
					onPress={() => handleLayoutChange("2")}>
					<LayoutList size={22} strokeWidth={1} absoluteStrokeWidth />
				</Button>
			</Tooltip>
			<Tooltip content="Vizualizar três colunas">
				<Button
					color={value === "3" ? "success" : "default"}
					size="sm"
					isIconOnly
					className={`${value === "3" ? "text-palette-base-main" : "text-palette-base-gray-900"}`}
					onPress={() => handleLayoutChange("3")}>
					<LayoutPanelLeft size={22} strokeWidth={1} absoluteStrokeWidth />
				</Button>
			</Tooltip>
			<Tooltip content="Vizualizar quatro colunas">
				<Button
					color={value === "4" ? "success" : "default"}
					size="sm"
					isIconOnly
					className={`${value === "4" ? "text-palette-base-main" : "text-palette-base-gray-900"}`}
					onPress={() => handleLayoutChange("4")}>
					<LayoutGrid size={22} strokeWidth={1} absoluteStrokeWidth />
				</Button>
			</Tooltip>
		</div>
	);
};
