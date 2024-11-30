"use client";

import {
	ArrowRightIcon,
	ClipboardIcon,
	Loader2Icon,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Snippet = {
	file_name: string;
	component: string;
};

export default function PhlexConverter() {
	const [inputCode, setInputCode] = useState("");
	const [convertedSnippets, setConvertedSnippets] = useState<Snippet[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData(e.currentTarget);
		const codeInput = formData.get("codeinput");

		const req = await fetch("/convert", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ codeInput }),
		});

		const snippets: Snippet[] = await req.json();

		setConvertedSnippets(snippets);
		setInputCode("");
		setIsLoading(false);
	};

	const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
		}
	};

	return (
		<div className="w-full max-w-3xl space-y-4">
			<form onSubmit={handleSubmit} className="relative">
				<textarea
					className="w-full h-48 p-3 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500  focus:ring-offset-2 focus:ring-offset-zinc-950 resize-none pr-14 scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
					placeholder="Paste your code here and press Enter to convert..."
					name="codeinput"
					value={inputCode}
					onChange={(e) => setInputCode(e.target.value)}
					onKeyDown={handleKeyDown}
					required
				/>
				<button
					type="submit"
					className="absolute bottom-3 right-2 text-white hover:text-lime-400 transition-colors bg-zinc-800 rounded-lg p-2"
					aria-label="Convert to Phlex"
				>
					<ArrowRightIcon size={20} />
				</button>
			</form>
			{!isLoading && convertedSnippets.length === 0 && (
				<div className="mx-auto max-w-lg">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-500 flex items-center justify-center">
							<Sparkles className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-2xl font-bold text-white">Phlex Convert</h1>
					</div>
					<p className="text-zinc-400 mt-4 text-left">
						Paste your HTML code above and press Enter or click the arrow to
						convert it to Phlex Ruby components. The converter will use Claude
						Haiku to create well-structured, object-oriented components using
						the{" "}
						<Link
							className="text-lime-400 hover:text-lime-300 transition-colors"
							href="https://rubygems.org/gems/phlex"
						>
							Phlex gem
						</Link>
						, including proper use of slots and template_tag when necessary.
						Your converted Phlex components will appear here as formatted,
						copyable Ruby snippets.
					</p>
					<div className="text-zinc-500 text-sm mt-8">
						Built by{" "}
						<Link
							href="https://chrsgrrtt.com"
							className="text-lime-400 hover:text-lime-300 transition-colors"
						>
							Chris Garrett
						</Link>{" "}
						(
						<Link
							href="https://hyperlaunch.com"
							className="text-lime-400 hover:text-lime-300 transition-colors"
						>
							Hyperlaunch
						</Link>
						)
					</div>
				</div>
			)}
			{isLoading ? (
				<div className="flex justify-center items-center py-8">
					<Loader2Icon className="animate-spin text-lime-400" size={32} />
				</div>
			) : (
				convertedSnippets.map((snippet) => (
					<div
						key={snippet.file_name}
						className="bg-zinc-900 rounded-lg overflow-hidden"
					>
						<div className="bg-zinc-800 px-3 py-2 text-white text-sm font-medium flex justify-between items-center">
							<span>{snippet.file_name}</span>
							<button
								type="button"
								onClick={() => copyToClipboard(snippet.component)}
								className="text-zinc-400 hover:text-lime-400 transition-colors"
								aria-label="Copy to clipboard"
							>
								<ClipboardIcon size={14} />
							</button>
						</div>
						<SyntaxHighlighter
							language="ruby"
							style={vscDarkPlus}
							customStyle={{
								margin: 0,
								borderRadius: 0,
								background: "transparent",
							}}
							className="scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
							codeTagProps={{ style: { fontSize: "0.75rem" } }}
						>
							{snippet.component}
						</SyntaxHighlighter>
					</div>
				))
			)}
		</div>
	);
}
