import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import SpriteController from './spriteController';
import { ScrollShadow } from "@nextui-org/react";
import { useState } from 'react';
import BackgroundController from './backgroundController';

//sprite component
function Sprite({ name }) {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <>
            <div className={`overflow-hidden ${isExpanded ? 'max-h-[262px] shadow-white' : 'max-h-9'} cursor-pointer transition-all bg-light-background rounded-md shadow-md `} onClick={handleClick}>
                <div className="flex items-center justify-center gap-4 text-white text-xl font-bold uppercase  h-9">
                    <h1>{name}</h1>
                    <FontAwesomeIcon icon={faChevronRight} className={`${isExpanded ? 'rotate-90' : 'rotate-0'} transition-all`} />
                </div>
                <div className='flex flex-col items-center gap-1 my-2'>
                    <SpriteController />
                </div>
            </div>
        </>
    );
}
Sprite.propTypes = {
    name: PropTypes.string,
};

//nav bar component
export default function Sidebar() {
    return (
        <>
            <div className=" w-[250px] w-min-[150px] h-screen flex flex-col shadow-[0_0px_16px_-2px_rgba(0,0,0,0.3)]">
                <div className="p-2 flex items-center gap-3 mt-3 mb-4">
                    <img src="/src/assets/img/icon.png" alt="icon" className="h-auto w-16" />
                    <h1 className="text-white text-3xl font-bold uppercase text-left">Sprite Viewer</h1>
                </div>
                <ScrollShadow hideScrollBar className="h-1/2" size={5}>
                    <div className="flex flex-col gap-2 mb-2">
                        <Sprite name={"yukikaze"} />
                        <Sprite name={"yukikaze"} />
                    </div>
                </ScrollShadow>
                <BackgroundController />
            </div>
        </>
    );
}