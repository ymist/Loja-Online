import { Button } from "@nextui-org/react";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/router";

export default function BackButton() {
	const router = useRouter();
	const backPage = () => {
		router.back();
	};
	return (
		<Button isIconOnly color="success" onClick={backPage} variant="flat" size="sm" className="fixed shadow-medium bg-palette-base-main m-3 rounded-xl">
			<Undo2 size={18} strokeWidth={2} />
		</Button>
	);
}
