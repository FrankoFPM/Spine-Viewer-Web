import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import SpriteController from './navbar/spriteController';

import PropTypes from 'prop-types';

function Sprite({ name, isExpanded, onClick, sprite }) {
    console.log(sprite);

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
                <SpriteController sprite={sprite} />
            </div>
        </div>
    );
}

Sprite.propTypes = {
    name: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    sprite: PropTypes.object.isRequired,
};

export default Sprite;