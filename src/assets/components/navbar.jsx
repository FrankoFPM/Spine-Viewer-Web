
import PixiApp from './pixi-app/PixiApp';
import { SetSpriteProvider } from './context/SetSprite';
import icon from '../../assets/img/icon.png';
import { SetAppProvider } from './context/SetApp';
import { SetAssetsProvider } from './context/SetAssets';

export default function Sidebar() {

    return (
        <div className=" w-full h-screen flex flex-col shadow-[0_0px_16px_-2px_rgba(0,0,0,0.3)]">
            <div className="p-2 flex items-center gap-3 mt-3 mb-4">
                <img src={icon} alt="icon" className="h-auto w-16" />
                <h1 className="text-white text-3xl font-bold uppercase text-left">Spine Viewer</h1>
            </div>
            <SetSpriteProvider>
                <SetAppProvider>
                    <SetAssetsProvider>
                        <PixiApp canvasId={"app"} />
                    </SetAssetsProvider>
                </SetAppProvider>
            </SetSpriteProvider>

        </div>
    );
}