import Sidebar from "./assets/components/navbar"
import BodyViewer from "./assets/components/BodyViewer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetToastProvider } from "./assets/components/context/SetToast";
export default function App() {
  return (
    <SetToastProvider>
      <div className="flex w-screen min-w-max">
        <ToastContainer />
        <div className="flex-none w-[250px] z-20">
          <Sidebar />
        </div>
        <div className="flex-grow min-h-screen">
          <BodyViewer />
        </div>
      </div>
    </SetToastProvider>
  )
}
