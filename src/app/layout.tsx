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
		<html lang="en">
			<body
				className={`min-h-screen bg-zinc-950 text-zinc-300 p-6 flex flex-col items-center text-sm ${font.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
