import { Divider, Input, Pagination } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import filtersFactions from "../data/factions.json";
import filtersType from "../data/TypeClass.json";
import groupType from "../data/GroupType.json";
import ChipCharacter from "./CardCharacter";
import MainData from "../data/mainData.json";
import ProtoType from 'prop-types';
import FilterChip from "./FilterChip";
const ITEMS_PER_PAGE = 98;

export default function Filter({ onOpenChange }) {

    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedFilterType, setSelectedFilterType] = useState(null);
    const [filteredFactions, setFilteredFactions] = useState(filtersFactions);
    const [filteredTypes, setFilteredTypes] = useState(filtersType);
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(0);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const totalPages = Math.ceil(Object.keys(MainData).length / 98);
    const [total, setTotal] = useState(totalPages); // [1,2,3,4,5,6,7,8,9,10 ... 100]


    const selectType = (filter) => {
        if (selectedFilterType !== filter) {
            setSelectedFilterType(filter); // Selecciona el chip
        }
    }
    const unselectType = () => {
        setSelectedFilterType(null); // Deselecciona el chip
    }

    const selectGroup = (filter) => {
        if (selectedFilter !== filter) {
            setSelectedFilter(filter); // Selecciona el chip
        }
    };

    const unselectGroup = () => {
        setSelectedFilter(null); // Deselecciona el chip
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    };

    const filterCharacters = useCallback(() => {
        return Object.values(MainData)
            .filter(character => {
                if (inputValue !== '') {
                    return character.name.toLowerCase().includes(inputValue.toLowerCase());
                } else if (selectedFilter !== null && selectedFilterType !== null) {
                    return character.group === selectedFilter && character.type === selectedFilterType;
                } else if (selectedFilter !== null) {
                    return character.group === selectedFilter;
                } else if (selectedFilterType !== null) {
                    return character.type === selectedFilterType;
                } else {
                    return true;
                }
            });
    }, [inputValue, selectedFilter, selectedFilterType]);

    useEffect(() => {
        if (selectedFilter) {
            setFilteredTypes(groupType[selectedFilter]);
        } else {
            setFilteredTypes(filtersType);
        }

        if (selectedFilterType) {
            setFilteredFactions(Object.keys(groupType).filter(faction => groupType[faction].includes(selectedFilterType)));
        } else {
            setFilteredFactions(filtersFactions);
        }

        const characters = filterCharacters();
        setFilteredCharacters(characters);
        setTotal(Math.ceil(characters.length / ITEMS_PER_PAGE));
    }, [selectedFilter, selectedFilterType, filterCharacters]);


    return (
        <>
            <h1 className="font-semibold text-lg">Faction</h1>
            <div className="flex flex-wrap justify-between gap-2">
                {(selectedFilter ? [selectedFilter] : filteredFactions).map((filter) => (
                    <FilterChip
                        key={filter}
                        filter={filter}
                        selectedFilter={selectedFilter}
                        handleChipClick={selectGroup}
                        handleChipClose={unselectGroup}
                    />
                ))}
            </div>
            <h1 className="font-semibold text-lg">Class</h1>
            <div className="flex flex-wrap justify-between gap-2">
                {(selectedFilterType ? [selectedFilterType] : filteredTypes).map((filter) => (
                    <FilterChip
                        key={filter}
                        filter={filter}
                        selectedFilter={selectedFilterType}
                        handleChipClick={selectType}
                        handleChipClose={unselectType}
                    />
                ))}
            </div>
            <Divider className="mt-4 bg-white" />
            <div className="">
                <Input
                    label="Character"
                    className="max-w-xs ml-auto"
                    size="sm"
                    labelPlacement="outside"
                    classNames={{
                        label: " group-data-[filled-within=true]:text-white",
                    }}
                    onChange={handleInputChange}
                    description="Search in all factions and classes"
                />

            </div>
            <Divider className="mb-4 bg-white" />
            <div className="flex flex-wrap justify-between gap-3">
                {filteredCharacters.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
                    .map((character, index) => (
                        <ChipCharacter
                            key={character.name + "_" + character.group + "_" + index}
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
                total={total}
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
Filter.propTypes = {
    onOpenChange: ProtoType.func.isRequired,
};