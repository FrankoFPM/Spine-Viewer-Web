import { Slider, Tooltip, Checkbox, Select, SelectSection, SelectItem } from "@nextui-org/react";
import { useState } from 'react';
//controller for sprite component
function RangeController({ name, min, max, step, initvalue }) {
    const [value, setValue] = useState(parseFloat(initvalue));
    const [inputValue, setInputValue] = useState(initvalue);

    const handleChange = (value) => {
        if (isNaN(Number(value))) return;

        setValue(value);
        setInputValue(value.toString());
    }
    return (<Slider
        label={name}
        step={step}
        maxValue={max}
        minValue={min}
        defaultValue={initvalue}
        size='sm'
        classNames={{
            base: "w-[80%] ",
            label: "text-large text-white font-bold",
        }}
        renderValue={({ children, ...props }) => (
            <output {...props}>
                <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                    content="Press Enter to confirm"
                    placement="right"
                >
                    <input
                        className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                        type="text"
                        aria-label={`${name} value`}
                        value={inputValue}
                        onChange={(e) => {
                            const v = e.target.value;
                            setInputValue(v);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                                setValue(Number(inputValue));
                            }
                        }}
                    />
                </Tooltip>
            </output>
        )}
        value={value}
        onChange={handleChange}
    />);
}

export default function SpriteController() {
    return (
        <>
            <RangeController
                name="Zoom"
                min={0}
                max={1}
                step={0.01}
                initvalue={0.5} />
            <RangeController
                name="Speed"
                min={0}
                max={10}
                step={0.01}
                initvalue={1} />
            <div className="m-2 flex gap-2 justify-evenly w-full items-center">
                <Checkbox
                    color="primary"
                    classNames={{
                        base: "font-bold",
                        label: "text-white"
                    }} >Flip x</Checkbox>
                <Checkbox
                    color="primary"
                    classNames={{
                        base: "font-bold",
                        label: "text-white"
                    }} >Flip y</Checkbox>
            </div>
            <Select
                label="Animations"
                placeholder="Select an animation"
                labelPlacement="outside"
                classNames={{
                    base: "white font-bold w-[80%]",
                    trigger: "bg-light-background border-2 accent-blue-200 data-[focus=true]:border-blue-800 data-[open=true]:border-blue-800",
                    label: "text-large text-white font-bold ",
                    value: "text-white font-semibold"
                }}
                size='sm'
                color=''
                variant='bordered'
            >
                <SelectItem key="Lion">Lion</SelectItem>
            </Select>

        </>);
}