import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React from "react";

export const AccordionList = ({ categories, brands, toogleCategoryFilter, toogleBrandFilter, value, setValue }) => {
	const [selectedBrands, setSelectedBrands] = React.useState([]);
	const [selectedCategories, setSelectedCategories] = React.useState([]);

	return (
		<Accordion selectionMode="multiple">
			<AccordionItem key="1" aria-label="category" title={<p className="font-medium tracking-widest text-medium ">CATEGORIA</p>}>
				<CheckboxGroup color="default" onValueChange={setSelectedCategories} value={selectedCategories}>
					{categories?.map((category) => {
						return (
							<Checkbox
								onChange={(e) => {
									toogleCategoryFilter(e.target.value);
								}}
								value={category.name}>
								<span className="text-sm">{category.name}</span>
							</Checkbox>
						);
					})}
				</CheckboxGroup>
			</AccordionItem>
			<AccordionItem key="2" aria-label="brands" title={<p className="font-medium tracking-widest text-medium ">MARCA</p>}>
				<CheckboxGroup color="default" onValueChange={setSelectedBrands} value={selectedBrands}>
					{brands?.map((brands) => {
						return (
							<Checkbox
								onChange={(e) => {
									toogleBrandFilter(e.target.value);
								}}
								value={brands.name}>
								<span className="text-sm">{brands.name}</span>
							</Checkbox>
						);
					})}
				</CheckboxGroup>
			</AccordionItem>
			<AccordionItem key="3" aria-label="prices" title={<p className="font-medium tracking-widest text-medium ">PREÇO</p>}>
				<Input
					type="number"
					label="Minímo:"
					className="mb-10"
					variant="bordered"
					placeholder="0.00"
					labelPlacement="outside"
					value={value.min}
					onValueChange={(e) => {
						setValue((prev) => {
							return { ...prev, min: e };
						});
					}}
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">$</span>
						</div>
					}
				/>
				<Input
					type="number"
					label="Máximo:"
					variant="bordered"
					placeholder="0.00"
					labelPlacement="outside"
					value={value.max}
					onValueChange={(e) => {
						setValue((prev) => {
							return { ...prev, max: e };
						});
					}}
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">$</span>
						</div>
					}
				/>
			</AccordionItem>
		</Accordion>
	);
};
