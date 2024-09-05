import { Clipboard, Download, Send } from "lucide-react"
import { useState } from "react"
import { YouTubeUrlParse } from "@/hooks/useYoutubeUrlParse"
import axios from "axios"

type Data = {
	code: number
	url?: string
	message: string
	duration?: number
	filesize?: number
	title?: string
	status: string
}

export default function Home() {
	const [currentUrlData, setCurrentUrlData] = useState<Data>({} as Data)
	const [isUrlHistorys, setUrlHistorys] = useState<Data[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

	const fetchToServer = () => {
		const videoUrl = (document.getElementById("url") as HTMLInputElement).value
		const videoId = YouTubeUrlParse(videoUrl)

		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await axios.get(`${baseUrl}/api/v1/convert/${videoId}`)
				// console.log(response.data)
				if (response.data.status == "ok") {
					(document.getElementById("url") as HTMLInputElement).value = ""
					setUrlHistorys((prev) => [...prev, response.data])
					setCurrentUrlData(response.data)
				}
				setIsLoading(false)
				return response.data
			} catch (error) {
				console.log(error)
			}
		}

		if (videoUrl != "") {
			fetchData()
		}
	}

	const handlePaste = async () => {
		const inputElement = (document.getElementById("url") as HTMLInputElement)
		try {
			const copyText = await navigator.clipboard.readText()
			const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
			const urlYtValidate = copyText.match(regex) || ""
			if (urlYtValidate[0] != inputElement.value && urlYtValidate != "") {
				inputElement.value = copyText
			} else {
				inputElement.value = "Invalid url!"
				setTimeout(() => {
					inputElement.value = ""
				}, 2000)
			}
		} catch (error) {
			console.error('Failed to read clipboard:', error)
		}
	}

	return (
		<div className="flex justify-center w-full h-full bg-blue-500">
			<div className="py-4 w-full max-w-xs sm:max-w-xl">
				<label htmlFor="url" className="relative">
					<input id="url" name="url" type="text" placeholder="Enter url here..." className="bg-white w-full py-2 px-10 rounded-full outline-none text-gray-600 border-none shadow-lg"
						autoComplete="off"
						autoFocus
						onKeyDown={(e) => {
							if (e.key === "Enter" && (document.getElementById("url") as HTMLInputElement).value != "") {
								fetchToServer()
							}
						}}
					/>
					<button className="absolute -left-1 bg-gray-200 hover:bg-gray-300 active:bg-red-400 duration-300 p-2 rounded-full outline-none text-gray-600 border-none hover:scale-95"
						onClick={handlePaste}
					>
						<Clipboard className="w-6 h-6" />
					</button>
					<button className="absolute -right-1 bg-gray-200 hover:bg-gray-300 active:bg-blue-400 duration-300 p-2 rounded-full outline-none text-gray-600 border-none hover:scale-95"
						onClick={fetchToServer}
					>
						<Send className="w-6 h-6" />
					</button>
				</label>
				<div className="pt-4 px-4">
					{isLoading ? (
						<div className="flex w-full justify-center">
							<div className="loading-animation"></div>
						</div>
					) : currentUrlData.code == 200 ? (
						<div className="flex flex-col gap-4 w-full h-[80vh] overflow-y-auto">
							{isUrlHistorys.length == 0 ? "https://www.youtube.com/watch?v=xxxxxxxxx" : 
								// Reverse the array before mapping
								isUrlHistorys.slice().reverse().map((item, index) => (
									<div key={index} className="flex items-center justify-between gap-2 px-4 w-full h-10 bg-white rounded-md overflow-hidden shadow-lg">
										<span className="text-gray-500 text-nowrap truncate text-sm">{item.title}</span>
										<button type="button" onClick={() => open(item.url, "_self")}>
											<Download className="bg-blue-500 w-7 h-7 rounded-md p-1 hover:bg-blue-600 duration-200 delay-75" />
										</button>
									</div>
								))
							}
						</div>
					) : (
						<span className="text-gray-200 font-semibold">{isUrlHistorys.length == 0 ? "Example Url" : "All History"} :
							https://www.youtube.com/watch?v=xxxxxxxxx
						</span>
					)
					}
				</div>
			</div>
		</div >
	)
}