import { Slider, Tooltip, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { useState } from 'react';
import ProtoTypes from 'prop-types';
//controller for sprite component
function RangeController({ name, min, max, step, initvalue, setChange }) {

    RangeController.propTypes = {
        name: ProtoTypes.string.isRequired,
        min: ProtoTypes.number.isRequired,
        max: ProtoTypes.number.isRequired,
        step: ProtoTypes.number.isRequired,
        initvalue: ProtoTypes.number.isRequired,
        setChange: ProtoTypes.func.isRequired,
    };
    const [value, setValue] = useState(parseFloat(initvalue));
    const [inputValue, setInputValue] = useState(initvalue);

    const handleChange = (value) => {
        if (isNaN(Number(value))) return;

        setValue(value);
        setInputValue(value.toString());
        setChange(value);
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
        renderValue={({ ...props }) => (
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

export default function SpriteController({ sprite }) {
    SpriteController.propTypes = {
        sprite: ProtoTypes.object.isRequired,
    };
    const animations = sprite?.state?.data?.skeletonData?.animations || [];

    const [flipX, setFlipX] = useState(false);
    const [flipY, setFlipY] = useState(false);

    const handleFlipX = (event) => {
        setFlipX(event.target.checked);
        sprite.scale.x = event.target.checked ? Math.abs(sprite.scale.x) * -1 : Math.abs(sprite.scale.x);
    };

    const handleFlipY = (event) => {
        setFlipY(event.target.checked);
        sprite.scale.y = event.target.checked ? Math.abs(sprite.scale.y) * -1 : Math.abs(sprite.scale.y);
    };

    const handleAnimationChange = (e) => {

        const animationName = e.target.value
        console.log(animationName);
        sprite.state.setAnimation(0, animationName, true);
    };

    const handleZoomChange = (zoom) => {
        sprite.scale.x = zoom;
        sprite.scale.y = zoom;
    };

    const handleSpeedChange = (speed) => {
        sprite.state.timeScale = speed;
    };

    return (
        <>
            <RangeController
                name="Zoom"
                min={0}
                max={1}
                step={0.01}
                initvalue={0.5}
                setChange={handleZoomChange}
            />
            <RangeController
                name="Speed"
                min={0}
                max={10}
                step={0.01}
                initvalue={1}
                setChange={handleSpeedChange}
            />
            <div className="m-2 flex gap-2 justify-evenly w-full items-center">
                <Checkbox
                    checked={flipX}
                    onChange={handleFlipX}
                    color="primary"
                    classNames={{
                        base: "font-bold",
                        label: "text-white"
                    }} >Flip x</Checkbox>
                <Checkbox
                    checked={flipY}
                    onChange={handleFlipY}
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
                onChange={handleAnimationChange}
            >
                {animations.map((animation) => (
                    <SelectItem key={animation.name} value={animation.name}>{animation.name}</SelectItem>
                ))}
            </Select>

        </>);
}