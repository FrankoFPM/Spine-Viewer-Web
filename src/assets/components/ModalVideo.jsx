import { faArrowDown, faPause, faPlay, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Skeleton } from "@nextui-org/react";
import ProtoType from 'prop-types';
import { createRef, useEffect, useState } from "react";



export default function ModalVideo({ urls, isOpen, onClose }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [playingStates, setPlayingStates] = useState({});
    const [videoRefs, setVideoRefs] = useState([]);

    useEffect(() => {
        setVideoRefs((refs) => urls.map((_, i) => refs[i] || createRef()));
    }, [urls]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onClose}
                backdrop="blur"
                className="bg-opacity-60"
                classNames={{
                    body: "",
                    backdrop: "backdrop-opacity-80",
                    base: "bg-blue-900 bg-opacity-80 dark:bg-blue-900 dark:bg-opacity-80 text-white",
                    header: "border-b-[1px] border-white",
                    footer: "border-t-[1px] border-white",
                }}
                size="3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recorded videos</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-wrap gap-4 justify-around">
                                    {
                                        urls.length > 0 ? (
                                            urls.map((url, index) => (
                                                <div key={index} className="relative">
                                                    <Skeleton
                                                        className="rounded-lg overflow-visible"
                                                        isLoaded={isLoaded}
                                                    >
                                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                                            <video
                                                                ref={videoRefs[index]}
                                                                className="w-auto h-32 object-cover rounded-lg cursor-pointer"
                                                                src={url}
                                                                onLoadedData={() => setIsLoaded(true)}
                                                                loop
                                                            />
                                                        </a>
                                                        {isLoaded ? <div className="w-9 h-16  absolute z-50 right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 flex gap-1 flex-col">
                                                            <Button
                                                                className="min-w-unit-sm text-white w-9" size="sm"
                                                                color="success"
                                                                onClick={() => {
                                                                    setPlayingStates({
                                                                        ...playingStates,
                                                                        [index]: !playingStates[index]
                                                                    });
                                                                    if (playingStates[index]) {
                                                                        videoRefs[index].current.pause();
                                                                    } else {
                                                                        videoRefs[index].current.play();
                                                                    }
                                                                }}
                                                            >
                                                                {playingStates[index] ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                                                            </Button>
                                                            <a href={url} download="spine_rec.mp4">
                                                                <Button className="min-w-unit-sm w-9" size="sm" color="warning">
                                                                    <FontAwesomeIcon icon={faArrowDown} />
                                                                </Button>
                                                            </a>
                                                        </div> : null}
                                                    </Skeleton>
                                                </div>
                                            ))

                                        ) : (
                                            <div className="my-5 flex items-center flex-col gap-2">
                                                <FontAwesomeIcon icon={faTriangleExclamation} className="text-5xl" />
                                                <p className="text-center">
                                                    No videos available.
                                                    <br />
                                                    Please record a video to continue.
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <p className="text-sm text-red-500 my-auto font-semibold">Note: Videos are not saved when you close or refresh this app</p>
                                <Button color="danger" variant="shadow" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
ModalVideo.propTypes = {
    urls: ProtoType.array.isRequired,
    isOpen: ProtoType.bool.isRequired,
    onClose: ProtoType.func.isRequired,
};