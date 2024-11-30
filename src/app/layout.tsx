import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const font = Inconsolata({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Phlex Convert",
	description: "Convert any code snippet to structured Phlex components",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin bg-zinc-950 text-zinc-300 text-pretty"
		>
			<body
				className={`min-h-svh p-6 flex flex-col items-center text-sm ${font.className} antialiased scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 scrollbar-thin`}
			>
				{children}
			</body>
		</html>
	);
}
