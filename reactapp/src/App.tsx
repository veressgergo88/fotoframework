import { useState } from "react";
import "./App.css";
import { loadImages } from "./api";

type Image = {
  id: number
  title: string
  url: string
  smallAmount: number
  largeAmount: number
}

function App() {

  const [ isLoading, setIsLoading] = useState(false)
  const [ notificationText, setNotificationText] = useState<string | null>(null)
  const [ images, setImages ] = useState<Image[]>([])

  const [page, setPage] = useState("home")

  const [value, setValue] = useState("")

  const search = async () => {
    setIsLoading(true)
    const response = await loadImages(value)
    setIsLoading(false)
    if (!response.success)
      return setNotificationText(response.error)
    const data = response.data
    setImages(data.map(img => ({...img, smallAmount: 0, largeAmount: 0})))
    setNotificationText(null)
  }

  return (
    <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {
        page === "home" &&
        <div>
          <input type="text" placeholder="Title" value={value} onChange={e => setValue(e.target.value)}/>
          <button onClick={() => setValue("")}>Clear</button>
          <button onClick={search}>Search</button>
          <button onClick={() => setPage("about")}>to about</button>

          { isLoading? "Loading..." : images.map(img => (
            <div>
              <p>{ img.title }</p>
              <img src={img.url} alt={img.title} />
            </div>
          )) }

          { notificationText && <h1>{notificationText}</h1>}
        </div>
      }

      {
        page === "about" &&
        <div>
          <button onClick={() => setPage("home")}>to home</button>
          <h1>About page</h1>
        </div>
      }

    </div>
  );
}

export default App;
