import Sidebar from "./assets/components/navbar"
import BodyViewer from "./assets/components/BodyViewer"

export default function App() {
  return (
    <div className="flex w-screen min-w-max">
      <div className="flex-none w-[250px] z-20">
        <Sidebar />
      </div>
      <div className="flex-grow min-h-screen">
        <BodyViewer />
      </div>
    </div>
  )
}
