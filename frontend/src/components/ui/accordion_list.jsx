import useStore from "@/data/global_states/useProducts";
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React from "react";

export const AccordionList = ({ toogleCategoryFilter, toogleBrandFilter, value, setValue, activeCategoryFilters, activeBrandFilters }) => {
	const categories = useStore((state) => state.categories);
	const brands = useStore((state) => state.brands);

	// Função para manipular a seleção de filtros de categoria
	const handleCategoryChange = (values) => {
		// Criar um novo conjunto com os filtros selecionados
		const newFilters = new Set(values);
		// Comparar com os filtros ativos para determinar quais foram removidos
		activeCategoryFilters.forEach((category) => {
			if (!newFilters.has(category)) {
				toogleCategoryFilter(category); // Remover filtro
			}
		});
		// Adicionar novos filtros selecionados
		values.forEach((category) => {
			if (!activeCategoryFilters.has(category)) {
				toogleCategoryFilter(category); // Adicionar filtro
			}
		});
	};

	// Função para manipular a seleção de filtros de marca
	const handleBrandChange = (values) => {
		// Criar um novo conjunto com os filtros selecionados
		const newFilters = new Set(values);
		// Comparar com os filtros ativos para determinar quais foram removidos
		activeBrandFilters.forEach((brand) => {
			if (!newFilters.has(brand)) {
				toogleBrandFilter(brand); // Remover filtro
			}
		});
		// Adicionar novos filtros selecionados
		values.forEach((brand) => {
			if (!activeBrandFilters.has(brand)) {
				toogleBrandFilter(brand); // Adicionar filtro
			}
		});
	};

	return (
		<Accordion selectionMode="multiple">
			<AccordionItem key="1" aria-label="category" title={<h2 className="font-medium tracking-widest text-medium ">CATEGORIA</h2>}>
				<CheckboxGroup
					color="default"
					aria-label="categories-checkboxes"
					value={Array.from(activeCategoryFilters)}
					onValueChange={handleCategoryChange}>
					{categories?.map((category) => (
						<Checkbox key={category.id} aria-label="categories-checkbox" value={category.name}>
							<h2 className="text-sm">{category.name}</h2>
						</Checkbox>
					))}
				</CheckboxGroup>
			</AccordionItem>
			<AccordionItem key="2" aria-label="brands" title={<h2 className="font-medium tracking-widest text-medium ">MARCA</h2>}>
				<CheckboxGroup color="default" aria-label="brands-checkboxes" value={Array.from(activeBrandFilters)} onValueChange={handleBrandChange}>
					{brands?.map((brand) => (
						<Checkbox key={brand.id} aria-label="brands-checkbox" value={brand.name}>
							<h2 className="text-sm">{brand.name}</h2>
						</Checkbox>
					))}
				</CheckboxGroup>
			</AccordionItem>
			<AccordionItem key="3" aria-label="prices" title={<h2 className="font-medium tracking-widest text-medium ">PREÇO</h2>}>
				<Input
					type="number"
					label={<h2>Mínimo:</h2>}
					className="mb-10"
					variant="bordered"
					placeholder="0.00"
					labelPlacement="outside"
					value={value.min}
					onValueChange={(e) => {
						setValue((prev) => ({ ...prev, min: e }));
					}}
					startContent={
						<div className="pointer-events-none flex items-center">
							<h2 className="text-default-400 text-small">$</h2>
						</div>
					}
				/>
				<Input
					type="number"
					label={<h2>Máximo:</h2>}
					variant="bordered"
					placeholder="0.00"
					labelPlacement="outside"
					value={value.max}
					onValueChange={(e) => {
						setValue((prev) => ({ ...prev, max: e }));
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
