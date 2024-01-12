import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import SpriteController from './spriteController';
import { ScrollShadow, Button } from "@nextui-org/react";
import { useState } from 'react';
import BackgroundController from './backgroundController';

//sprite component
function Sprite({ name, isExpanded, onClick }) {
    return (
        <div
            className={`overflow-hidden ${isExpanded ? 'max-h-[262px] shadow-white' : 'max-h-9 hover:brightness-110'} cursor-pointer transition-all bg-light-background dark:bg-dark-background rounded-md shadow-md `}
            onClick={onClick}
        >
            <div className="flex items-center justify-center gap-4 text-white text-xl font-bold uppercase  h-9">
                <h1>{name}</h1>
                <FontAwesomeIcon icon={faChevronRight} className={`${isExpanded ? 'rotate-90' : 'rotate-0'} transition-all`} />
            </div>
            <div className='flex flex-col items-center gap-1 my-2'>
                <SpriteController />
            </div>
        </div>
    );
}
Sprite.propTypes = {
    name: PropTypes.string,
};

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
                <Button
                    color='success'
                    size='sm'
                    className='font-bold text-md text-white'
                >
                    ADD SPRITE
                </Button>
            </div>
        </div>
    );
}

//nav bar component
export default function Sidebar() {
    const [expandedSprite, setExpandedSprite] = useState(null);

    const handleSpriteClick = (name) => {
        setExpandedSprite(expandedSprite === name ? null : name);
    };
    return (
        <div className=" w-full h-screen flex flex-col shadow-[0_0px_16px_-2px_rgba(0,0,0,0.3)]">
            <div className="p-2 flex items-center gap-3 mt-3 mb-4">
                <img src="/src/assets/img/icon.png" alt="icon" className="h-auto w-16" />
                <h1 className="text-white text-3xl font-bold uppercase text-left">Sprite Viewer</h1>
            </div>
            <ScrollShadow hideScrollBar className="h-auto mb-2" size={5}>
                <div className="flex flex-col gap-2 mb-2">
                    <Sprite name="yukikaze" isExpanded={expandedSprite === "yukikaze"} onClick={() => handleSpriteClick("yukikaze")} />
                    <Sprite name="Yuudachi" isExpanded={expandedSprite === "Yuudachi"} onClick={() => handleSpriteClick("Yuudachi")} />
                </div>
            </ScrollShadow>
            <Buttons />
        </div>
    );
}