"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useProducts from "@/data/global_states/useProducts";

export function ComboboxDemo() {
	const products = useProducts((state) => state.products);
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	const [arrayOfProducts, setArrayOfProducts] = React.useState(
		products.map((product) => {
			return { label: product.name, value: product.id };
		}),
	);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between">
					{value
						? arrayOfProducts?.find(
								(framework) => framework?.value === value,
						  )?.label
						: "Select framework..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search framework..." />
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandList>
						{arrayOfProducts?.map((framework) => (
							<CommandItem
								key={framework?.value}
								value={framework?.value}
								onSelect={(currentValue) => {
									setValue(
										currentValue === value
											? ""
											: currentValue,
									);
									setOpen(false);
								}}>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === framework?.value
											? "opacity-100"
											: "opacity-0",
									)}
								/>
								{framework?.label}
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
