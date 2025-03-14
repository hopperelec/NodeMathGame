import { POINTS_STORE } from "$lib/points";

export const CATEGORY_COLORS = {
	number: "#0f0",
	sell: "#f00",
	arithmetic: "#09f",
	boolean: "#55f",
	function: "#f90",
};

export type ProcessableInputValue = number;
export type ValidOutputValue = ProcessableInputValue | null;

type FixedLengthArray<T, L extends number> = [...T[]] & { length: L };

export type NodeType<
	NumInputs extends number = number,
	NumOutputs extends number = number,
> = {
	name: string;
	inputNames: FixedLengthArray<null | string, NumInputs>;
	outputNames: FixedLengthArray<null | string, NumOutputs>;
	category: keyof typeof CATEGORY_COLORS;
	processor: (
		inputs: FixedLengthArray<ProcessableInputValue, NumInputs>,
	) => FixedLengthArray<ValidOutputValue, NumOutputs>;
};

type Inputs<NumInputs extends number> = FixedLengthArray<
	ValidOutputValue,
	NumInputs
>;
type Outputs<NumOutputs extends number> = FixedLengthArray<
	{node: PlacedNode, inputId: number} | null,
	NumOutputs
>;

export type PlacedNode<
	NumInputs extends number = number,
	NumOutputs extends number = number,
> = {
	id: number;
	type: NodeType<NumInputs, NumOutputs>;
	position: { x: number; y: number };
	inputs: Inputs<NumInputs>;
	outputs: Outputs<NumOutputs>;
};

let lastNodeId = 1; // For some reason, this can't be 0
export function createPlacedNode<
	NumInputs extends number,
	NumOutputs extends number,
>(
	type: NodeType<NumInputs, NumOutputs>,
	position: { x: number; y: number },
): PlacedNode<NumInputs, NumOutputs> {
	return {
		id: lastNodeId++,
		type,
		position,
		inputs: type.inputNames.map(() => null) as Inputs<NumInputs>,
		outputs: type.outputNames.map(() => null) as Outputs<NumOutputs>,
	};
}

export function createNumberNodeType(value: number): NodeType<0, 1> {
	return {
		name: value.toString(),
		inputNames: [],
		outputNames: [null],
		category: "number",
		processor: () => [value],
	};
}

export function createArithmeticNodeType(
	name: string,
	symbol: string,
	processor: (
		operand1: ProcessableInputValue,
		operand2: ProcessableInputValue,
	) => number,
): NodeType<2, 1> {
	return {
		name,
		inputNames: ["A", "B"],
		outputNames: [`A${symbol}B`],
		category: "arithmetic",
		processor: ([a, b]) => [processor(a, b)],
	};
}

export const SELL_NODE: NodeType<1, 0> = {
	name: "Sell",
	inputNames: [null],
	outputNames: [],
	category: "sell",
	processor: ([input]) => {
		POINTS_STORE.update((points) => points + input);
		return [];
	},
};
