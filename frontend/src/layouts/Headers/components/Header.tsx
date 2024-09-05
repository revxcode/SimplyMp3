export default function Header() {
	return (
		<header className="fixed top-0 flex items-center justify-around w-full min-h-16 shadow-lg bg-white">
			<h2 className="font-bold text-xl text-blue-500">SimplyMp3</h2>
			<ul className="flex gap-4 sm:gap-8 text-black sm:text-base text-sm">
				<li className="">
					<a href="" className="hover:text-blue-500 duration-200">Home</a>
				</li>
				<li className="">
					<a href="" className="hover:text-blue-500 duration-200">FAQ</a>
				</li>
				<li className="">
					<a href="" className="hover:text-blue-500 duration-200">Changelog</a>
				</li>
			</ul>
		</header>
	)
}