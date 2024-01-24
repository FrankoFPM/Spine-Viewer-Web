import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import SpriteController from './navbar/spriteController';

import PropTypes from 'prop-types';

function Sprite({ name, isExpanded, onClick, sprite, skin, onRemove }) {
    const skinDictionary = {
        "_h": "Oath",
        "_g": "Retrofit",
        "_dark": "Meta",
    };

    let resultSkin = "Default";
    for (let key in skinDictionary) {
        if (skin.includes(key)) {
            resultSkin = skinDictionary[key];
            break;
        }
    }

    if (resultSkin === "Default") {
        // Busca un número en la skin
        const match = skin.match(/\d+/);
        if (match) {
            resultSkin = "Skin " + match[0];
        }
    }

    return (
        <div
            className={`overflow-hidden ${isExpanded ? 'max-h-[350px] shadow-white' : 'max-h-9 hover:brightness-110'} transition-all bg-light-background dark:bg-dark-background rounded-md shadow-md `}
        >
            <div className="flex items-center justify-center gap-4 text-white h-9  cursor-pointer" onClick={onClick}>
                <h1 className="max-w-[50%] overflow-hidden whitespace-nowrap text-ellipsis text-base font-bold capitalize">{name}</h1><span className='whitespace-nowrap text-ellipsis font-normal capitalize text-xs'>{resultSkin} </span>
                <FontAwesomeIcon icon={faChevronRight} className={`${isExpanded ? 'rotate-90' : 'rotate-0'} transition-all`} />
            </div>
            <div className='flex flex-col items-center gap-1 my-2'>
                <SpriteController sprite={sprite} onRemove={onRemove} />

            </div>
        </div>
    );
}

Sprite.propTypes = {
    name: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    sprite: PropTypes.object.isRequired,
    skin: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default Sprite;