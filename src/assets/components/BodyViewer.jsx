import { Chip, Tooltip, Switch } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBone, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import VideoRecord from "./pixi-app/VideoRecord";

function DarkMode() {
    const [darkMode, setDarkMode] = useState(() => {
        const localDarkMode = window.localStorage.getItem('darkMode');
        if (localDarkMode) {
            return localDarkMode;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    });

    useEffect(() => {
        const htmlClassList = document.documentElement.classList;
        darkMode === 'dark' ? htmlClassList.add('dark') : htmlClassList.remove('dark');
        window.localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="h-16 w-16 absolute right-0 top-0 flex">
            <Switch
                defaultSelected={darkMode !== 'dark'}
                size="lg"
                color="warning"
                startContent={<FontAwesomeIcon icon={faSun} />}
                endContent={<FontAwesomeIcon icon={faMoon} />}
                onChange={handleDarkMode}
            >
            </Switch>
        </div>
    );
}

export default function BodyViewer() {
    return (
        <>
            <DarkMode />
            <div className="w-full h-full flex flex-col">
                <canvas id="app" width="500" height="500" className="m-auto shadow-2xl rounded-md"></canvas>

                <footer className="w-full z-10 h-16  shadow-[0_-1px_10px_5px_rgba(0_0_0_/0.1)] bg-light-background dark:bg-dark-background flex items-center justify-between relative">
                    <div className="absolute bg-gradient-to-r from-teal-200 to-teal-500  inset-0 mix-blend-multiply"></div>
                    <VideoRecord canvasId={"app"} />
                    <Tooltip
                        content="Requires Spine v3.8.xx"
                        color="warning"
                        delay={200}
                    >
                        <Chip
                            startContent={
                                <FontAwesomeIcon className="mx-1" icon={faBone} />
                            }
                            classNames={{
                                base: "bg-light-background dark:bg-dark-background border-1 border-white z-10 text-slate-200 brightness-75 hover:brightness-100 transition-all duration-300 mr-5",
                                content: " shadow-black text-slate-200 font-bold",
                            }}
                        >Supported version: 3.8 </Chip>

                    </Tooltip>
                </footer>
            </div>
        </>
    );
}