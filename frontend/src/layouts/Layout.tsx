import Footer from "./Footers"
import Header from "./Headers"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="w-full h-screen pt-16">
				{children}
			</main>
			<Footer />
		</>
	)
}