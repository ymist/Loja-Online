import useStore from "@/data/global_states/useProducts";
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from "@nextui-org/react";
import React from "react";

export const AccordionList = ({ categories, brands, toogleCategoryFilter, toogleBrandFilter }) => {
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

	return (
		<Accordion selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} selectionMode="multiple">
			<AccordionItem key="1" aria-label="category" title={<p className="font-medium tracking-widest text-medium ">CATEGORIA</p>}>
				<CheckboxGroup color="default">
					{categories?.map((category) => {
						return (
							<Checkbox
								onChange={(e) => {
									toogleCategoryFilter(e.target.value);
								}}
								value={category.name}>
								{category.name}
							</Checkbox>
						);
					})}
				</CheckboxGroup>
			</AccordionItem>
			<AccordionItem key="2" aria-label="brands" title={<p className="font-medium tracking-widest text-medium ">MARCA</p>}>
				<CheckboxGroup color="default">
					{brands?.map((brands) => {
						return (
							<Checkbox
								onChange={(e) => {
									toogleBrandFilter(e.target.value);
								}}
								value={brands.name}>
								{brands.name}
							</Checkbox>
						);
					})}
				</CheckboxGroup>
			</AccordionItem>
			<AccordionItem key="3" aria-label="prices" title={<p className="font-medium tracking-widest text-medium ">PREÇO</p>}></AccordionItem>
		</Accordion>
	);
};
