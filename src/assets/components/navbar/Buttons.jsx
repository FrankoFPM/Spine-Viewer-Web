import { useState } from "react";
import BackgroundController from "./backgroundController";
import { Button } from "@nextui-org/react";
import ModalComponent from "../Modal";

export default function Buttons() {

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