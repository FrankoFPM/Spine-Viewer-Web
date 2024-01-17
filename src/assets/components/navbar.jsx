
import { ScrollShadow, Button } from "@nextui-org/react";
import { useState } from 'react';
import BackgroundController from './backgroundController';
import PixiApp from './PixiApp';
import ModalComponent from './Modal';
import { SetSpriteProvider } from './context/SetSprite';
import icon from '../../assets/img/icon.png';

function Buttons() {
    const [isHidden, setIsHidden] = useState(true);

    const handleBackgroundClick = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className='mt-auto mb-2 flex flex-col gap-2'>
            <BackgroundController isHidden={isHidden} />
            <div className="flex flex-col gap-2 w-[80%] m-auto">
                <Button
                    color='primary'
                    size='sm'
                    className='font-bold text-md'
                    onClick={handleBackgroundClick}
                >
                    BACKGROUND
                </Button>
                <ModalComponent />
            </div>
        </div>
    );
}

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