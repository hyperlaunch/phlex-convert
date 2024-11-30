import { createAnthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const anthropic = createAnthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-3-5-haiku-latest", { cacheControl: true });

const system = `You are an expert in Ruby and the Phlex gem for building object-oriented HTML components. Convert the given code snippet into well-structured Phlex Ruby components. Follow these rules:
1. Each component should be a Ruby class inheriting from \`Phlex::HTML\`.
2. Use the \`template\` method to describe the structure.
3. Use \`template_tag\` instead of \`template\` when rendering an HTML \`<template>\` element, as the \`template\` method is reserved for defining the class's output.
4. For components that are clearly coupled (e.g., a navigation bar and its items):
   - Use the Phlex slots functionality to manage the relationship between the main component (e.g., \`Nav\`) and its subcomponents (e.g., \`NavItem\`).
   - The main component should define slots and manage the rendering of its subcomponents.
5. Use \`initialize\` methods for dynamic data when required.
6. Optimise for clarity and reusability, ensuring reusable logic is encapsulated in methods or slots.
7. Follow Rails file naming conventions for components (\`snake_case\` for file names, matching the class name in \`CamelCase\`).
8. Return the output as a JSON array of objects, where:
   - Each object has a \`file_name\` key with the expected file name.
   - Each object has a \`component\` key containing the entire Ruby class as a single string. Use \\n and spaces for proper formatting.`;

export async function POST(req: NextRequest) {
	try {
		const { codeInput } = await req.json();

		if (!codeInput)
			return NextResponse.json(
				{ error: "HTML input is required" },
				{ status: 400 },
			);

		const result = await generateObject({
			model,
			system,
			prompt: codeInput,
			output: "array",
			schema: z.object({
				file_name: z.string(),
				component: z.string(),
			}),
		});

		if (!result?.object?.length) throw new Error("No components in response");

		return NextResponse.json(result.object);
	} catch (error) {
		console.error("Error in Phlex conversion:", error);
		return NextResponse.json(
			{
				error: "An error occurred during AI processing",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
