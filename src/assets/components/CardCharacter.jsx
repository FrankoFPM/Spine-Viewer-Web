import PropTypes from 'prop-types';
import { Chip } from "@nextui-org/react";
import { useContext } from 'react';
import { SetSpriteContext } from './context/SetSprite';

export default function ChipCharacter({ name, faction }) {

    const { addSprite } = useContext(SetSpriteContext);
    const handleClick = (name) => {
        const newSprite = { asset: "xuefeng", name: name }; // newSprite es un objeto, no un array
        addSprite(newSprite); // Agrega el nuevo sprite al estado existente

    };
    ChipCharacter.propTypes = {
        name: PropTypes.string.isRequired,
        faction: PropTypes.string.isRequired,
    };
    return (
        <>
            <Chip
                key={name + faction} // Asegúrate de que esta clave sea única para cada Chip
                className="text-white min-w-[120px] max-w-[120px] hover:brightness-90 cursor-pointer"
                variant="dot"
                classNames={{
                    base: `${faction.toLowerCase().replace(' ', '-').replace('@', 'a')}`,
                    dot: `bg-${faction.toLowerCase().replace(' ', '-').replace('@', 'a')}`,
                    content: "truncate pr-1",
                }}
                endContent={<span className="rounded-full bg-green-500"></span>}
                onClick={() => handleClick(name)}
            >
                {name}
            </Chip>
        </>

    )
}