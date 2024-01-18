
import { ScrollShadow } from "@nextui-org/react";
import PixiApp from './PixiApp';
import { SetSpriteProvider } from './context/SetSprite';
import icon from '../../assets/img/icon.png';
import Buttons from "./context/navbar/Buttons";



//nav bar component
export default function Sidebar() {

    return (
        <div className=" w-full h-screen flex flex-col shadow-[0_0px_16px_-2px_rgba(0,0,0,0.3)]">
            <div className="p-2 flex items-center gap-3 mt-3 mb-4">
                <img src={icon} alt="icon" className="h-auto w-16" />
                <h1 className="text-white text-3xl font-bold uppercase text-left">Sprite Viewer</h1>
            </div>
            <SetSpriteProvider>
                <ScrollShadow hideScrollBar className="h-auto mb-2" size={5}>
                    <div className="flex flex-col gap-2 mb-2">
                        <PixiApp canvasId={"app"} />
                    </div>
                </ScrollShadow>
                <Buttons />
            </SetSpriteProvider>

        </div>
    );
}