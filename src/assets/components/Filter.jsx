import { Chip, Divider, Pagination } from "@nextui-org/react";
import { useState, useEffect } from "react";
import filtersFactions from "../data/factions.json";
import filtersType from "../data/TypeClass.json";
import groupType from "../data/GroupType.json";
import ChipCharacter from "./CardCharacter";
import MainData from "../data/mainData.json";
import ProtoType from 'prop-types';

export default function Filter({ onOpenChange }) {

    Filter.propTypes = {
        onOpenChange: ProtoType.func.isRequired,
    };

    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedFilterType, setSelectedFilterType] = useState(null);
    const [filteredFactions, setFilteredFactions] = useState(filtersFactions);
    const [filteredTypes, setFilteredTypes] = useState(filtersType);
    const [page, setPage] = useState(0);
    const itemsPerPage = 98;
    const totalPages = Math.ceil(Object.keys(MainData).length / itemsPerPage);
    console.log(totalPages);
    useEffect(() => {
        if (selectedFilter) {
            setFilteredTypes(groupType[selectedFilter]);
        } else {
            setFilteredTypes(filtersType);
        }
    }, [selectedFilter]);

    useEffect(() => {
        if (selectedFilterType) {
            setFilteredFactions(Object.keys(groupType).filter(faction => groupType[faction].includes(selectedFilterType)));
        } else {
            setFilteredFactions(filtersFactions);
        }
    }, [selectedFilterType]);

    const handleClassChipClick = (filter) => {
        if (selectedFilterType !== filter) {
            setSelectedFilterType(filter); // Selecciona el chip
        }
    }
    const handleClassChipClose = () => {
        setSelectedFilterType(null); // Deselecciona el chip
    }

    const handleChipClick = (filter) => {
        if (selectedFilter !== filter) {
            setSelectedFilter(filter); // Selecciona el chip
        }
    };

    const handleChipClose = () => {
        setSelectedFilter(null); // Deselecciona el chip
    };

    return (
        <>
            <h1 className="font-semibold text-lg">Faction</h1>
            <div className="flex flex-wrap justify-between gap-2">
                {(selectedFilter ? [selectedFilter] : filteredFactions).map((filter, index) => (
                    <Chip
                        key={index}
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
                ))}
            </div>
            <h1 className="font-semibold text-lg">Class</h1>
            <div className="flex flex-wrap justify-between gap-2">
                {(selectedFilterType ? [selectedFilterType] : filteredTypes).map((filter, index) => (
                    <Chip
                        key={index}
                        classNames={{
                            base: (filter === selectedFilterType
                                ? "bg-green-500"
                                : "cursor-pointer bg-light-background dark:bg-dark-background")
                                + " hover:brightness-90 transition-all duration-300 border-small border-white/50",
                            content: "text-white",
                            closeButton: "hover:bg-white/5 active:bg-white/10 text-white",
                        }}
                        onClick={() => handleClassChipClick(filter)}
                        onClose={filter === selectedFilterType ? handleClassChipClose : null}
                    >
                        {filter}
                    </Chip>
                ))}
            </div>
            <Divider className="my-4" />
            <div className="flex flex-wrap justify-between gap-3">

                {selectedFilter === null && selectedFilterType === null
                    ? Object.values(MainData).slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((character, index) => (
                        <ChipCharacter
                            key={index}
                            name={character.name}
                            faction={character.group}
                            type={character.type}
                            base={character}
                            onOpenChange={onOpenChange}
                        />
                    ))
                    : Object.values(MainData)
                        .filter(character => {
                            if (selectedFilter !== null && selectedFilterType !== null) {
                                return character.group === selectedFilter && character.type === selectedFilterType;
                            } else if (selectedFilter !== null) {
                                return character.group === selectedFilter;
                            } else if (selectedFilterType !== null) {
                                return character.type === selectedFilterType;
                            } else {
                                return true;
                            }
                        })
                        .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                        .map((character, index) => (
                            <ChipCharacter
                                key={index}
                                name={character.name}
                                faction={character.group}
                                type={character.type}
                                base={character}
                                onOpenChange={onOpenChange}
                            />
                        ))
                }

            </div>
            <Pagination
                isCompact
                showControls
                total={totalPages}
                initialPage={1}
                onChange={(newPage) => setPage(newPage - 1)}
                className="flex justify-center my-2"
                classNames={
                    {
                        item: "text-white bg-transparent [&[data-hover=true]:not([data-active=true])]:bg-blue-800/50",
                        wrapper: "bg-light-background dark:bg-dark-background",
                        prev: "bg-transparent [&[data-hover=true]:not([data-active=true])]:bg-blue-800/50 text-white",
                        next: "bg-transparent [&[data-hover=true]:not([data-active=true])]:bg-blue-800/50 text-white",
                    }
                }
                siblings={3}
            />
        </>
    )
}