import { Input, Button } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import ProtoTypes from 'prop-types';
import * as PIXI from 'pixi.js';
import { SetAppContext } from '../context/SetApp';

function ColorPicker({ background }) {

    const { appGlobal } = useContext(SetAppContext);

    const [color, setColor] = useState('#000000');
    const colorInputRef = useRef();

    const handleColorChange = (e) => {
        if (background) {
            appGlobal.stage.removeChild(background);
        }
        setColor(e.target.value);
        appGlobal.renderer.background.color = e.target.value
    };

    const handleInputClick = () => {
        colorInputRef.current.click();
    };

    return (
        <>
            <Input
                classNames={
                    {
                        base: "w-44 relative",
                        label: "text-white font-bold text-center group-data-[filled-within=true]:left-[20%]",
                    }
                }
                name="colorPicker"
                id="colorPicker"
                placeholder="0x000000"
                label="Background color"
                labelPlacement='outside'
                value={color}
                onChange={handleColorChange}
                color=''
                onClick={handleInputClick}
                endContent={
                    <div className="absolute inset-y-0 right-0 flex items-center mx-3">
                        <span style={{ color: color }} ><FontAwesomeIcon icon={faSquare} /></span>
                    </div>
                }
            />
            <input
                ref={colorInputRef}
                type="color"
                id="colorPicker"
                className="absolute top-[35%] left-6 -z-10 h-0"
                aria-label="pickercolor"
                value={color}
                onChange={handleColorChange}
            />

        </>
    );
}
ColorPicker.propTypes = {
    background: ProtoTypes.object,
};

function UploadBackground({ setBackground, background }) {
    const { appGlobal } = useContext(SetAppContext);

    const fileInputRef = useRef();
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            if (background) {
                appGlobal.stage.removeChild(background);
            }

            let newBackground = PIXI.Sprite.from(e.target.result);

            newBackground.width = appGlobal.screen.width;
            newBackground.height = appGlobal.screen.height;

            appGlobal.stage.addChildAt(newBackground, 0);

            setBackground(newBackground);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="m-auto">
                <span className="block w-44 font-bold text-white text-center">Import asset</span>
                <Button
                    className='w-44 text-md font-semibold text-white'
                    size='sm'
                    color='success'
                    onClick={handleUploadClick}
                >
                    Upload
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    id="fileInput"
                    className="hidden"
                    name="fileInput"
                    aria-label="inputFile"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileChange} />
            </div>
        </>
    );
}
UploadBackground.propTypes = {
    setBackground: ProtoTypes.func.isRequired,
    background: ProtoTypes.object,
};

export default function BackgroundController({ isHidden }) {

    const [background, setBackground] = useState(null);

    return (
        <>
            <div className={`${isHidden ? 'h-0' : 'h-[180px]'} flex flex-col justify-center gap-2 bg-blue-700 mx-auto w-[90%] rounded-md overflow-hidden border-t-2 border-blue-700 h-0 transition-all`}>
                <div className='flex flex-col items-center relative mt-2'>
                    <ColorPicker background={background} />
                </div>
                <h1 className="flex justify-center w-full text-white font-bold">--- Or ---</h1>
                <UploadBackground setBackground={setBackground} background={background} />
            </div>
        </>
    );
}
BackgroundController.propTypes = {
    isHidden: ProtoTypes.bool.isRequired,
};