import { Chip } from "@nextui-org/react";
import ProtoType from 'prop-types';

export default function FilterChip({ filter, selectedFilter, handleChipClick, handleChipClose }) {
    FilterChip.propTypes = {
        filter: ProtoType.string.isRequired,
        selectedFilter: ProtoType.string,
        handleChipClick: ProtoType.func.isRequired,
        handleChipClose: ProtoType.func.isRequired,
    };
    return (
        <Chip
            key={filter}
            classNames={{
                base: (filter === selectedFilter
                    ? "bg-green-500"
                    : "cursor-pointer bg-light-background dark:bg-dark-background")
                    + " hover:brightness-90 transition-all duration-300 border-small border-white/50",
                content: "text-white",
                closeButton: "hover:bg-white/5 active:bg-white/10 text-white",
            }}
            onClick={() => handleChipClick(filter)}
            onClose={filter === selectedFilter ? handleChipClose : null}
        >
            {filter}
        </Chip>
    );
}