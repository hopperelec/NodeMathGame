export const CATEGORY_COLORS = {
	number: "#0f0",
	sell: "#f00",
	arithmetic: "#09f",
	boolean: "#55f",
	function: "#f90",
};

type TFixedLengthArray<T, L extends number> = [...T[]] & { length: L };

export type NodeType<NumInputs extends number, NumOutputs extends number> = {
	name: string;
	input_names: TFixedLengthArray<null | string, NumInputs>;
	output_names: TFixedLengthArray<null | string, NumOutputs>;
	category: keyof typeof CATEGORY_COLORS;
	processor: (
		inputs: TFixedLengthArray<number, NumInputs>,
	) => TFixedLengthArray<number, NumOutputs>;
};

export function createNumberNodeType(value: number): NodeType<0, 1> {
	return {
		name: value.toString(),
		input_names: [],
		output_names: [null],
		category: "number",
		processor: () => [value],
	};
}

export function createArithmeticNodeType(
	name: string,
	symbol: string,
	processor: (operand1: number, operand2: number) => number,
): NodeType<2, 1> {
	return {
		name,
		input_names: ["A", "B"],
		output_names: [`A${symbol}B`],
		category: "arithmetic",
		processor: (inputs) => [processor(inputs[0], inputs[1])],
	};
}

export type PlacedNode<NumInputs extends number, NumOutputs extends number> = {
	type: NodeType<NumInputs, NumOutputs>;
	position: { x: number; y: number };
	inputs: TFixedLengthArray<number, NumInputs>;
	outputs: TFixedLengthArray<number, NumOutputs>;
};
