import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'

function ColorPicker() {
    const [color, setColor] = useState('#000000');
    const colorInputRef = useRef();

    const handleColorChange = (e) => {
        setColor(e.target.value);
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

function UploadBackground() {
    const fileInputRef = useRef();
    const handleUploadClick = () => {
        fileInputRef.current.click();
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
                    accept=".png,.jpg,.jpeg" />
            </div>
        </>
    );
}

export default function BackgroundController() {
    return (
        <>
            <div className='flex flex-col justify-center gap-2 bg-blue-700 mx-auto py-2 w-[90%] rounded-md'>
                <div className='flex flex-col items-center relative'>
                    <ColorPicker />
                </div>
                <h1 className="flex justify-center w-full text-white font-bold">--- Or ---</h1>
                <UploadBackground />
            </div>
        </>
    );
}