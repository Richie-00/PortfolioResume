import ReactRouter from "./Routes/ReactRouter"
import Loading from "./components/Loading"

function App() {
  return (
    <div className="bg-gray-900 w-full h-full">
      <Loading />
      <ReactRouter />
    </div>
  )
}

export default App