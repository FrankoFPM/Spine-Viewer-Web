import Sidebar from "./assets/components/navbar"
import BodyViewer from "./assets/components/BodyViewer"

export default function App() {
  return (
    <div className="flex">
      <div className="flex-none w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-grow h-screen">
        <BodyViewer />
      </div>
    </div>
  )
}
