import { Chip } from "@nextui-org/react";
import { useState } from 'react';
import ModalSkins from './ModalSkins';
import ProtoType from 'prop-types';

export default function ChipCharacter({ name, faction, base, onOpenChange }) {

    ChipCharacter.propTypes = {
        name: ProtoType.string.isRequired,
        faction: ProtoType.string.isRequired,
        base: ProtoType.object.isRequired,
        onOpenChange: ProtoType.func.isRequired,
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            <Chip
                className="text-white min-w-[120px] max-w-[120px] hover:brightness-90 cursor-pointer"
                variant="dot"
                classNames={{
                    base: `${faction.toLowerCase().replace(' ', '-').replace('@', 'a')}`,
                    dot: `bg-${faction.toLowerCase().replace(' ', '-').replace('@', 'a')}`,
                    content: "truncate pr-1",
                }}
                endContent={<span className="rounded-full bg-green-500"></span>}
                onClick={handleOpen}
            >
                {name}
            </Chip>
            <ModalSkins isOpen={isOpen} onClose={handleClose} name={name} base={base} onOpenChange={onOpenChange} />
        </>

    )
}