import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Badge } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import ModalVideo from "../ModalVideo";

export default function GifRecord({ canvasId }) {

    const [active, setActive] = useState(false);
    const [record, setRecord] = useState(false);
    const [canvas, setCanvas] = useState(null);
    const [recorder, setRecorder] = useState(null);
    const chunksRef = useRef([]);

    const [numFiles, setNumFiles] = useState(0);
    const [urls, setUrls] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        setActive(true);
        setCanvas(document.getElementById(canvasId));
    }, [canvasId]);

    const startRecording = () => {
        if (!record) {
            setRecord(true);
            setElapsedTime(0);
            timerRef.current = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
            const gl = canvas.getContext('webgl2');
            const stream = gl.canvas.captureStream();
            const options = { mimeType: 'video/webm; codecs=vp9', bitsPerSecond: 510000 };
            const newRecorder = new MediaRecorder(stream, options);
            setRecorder(newRecorder);
            chunksRef.current = [];

            newRecorder.ondataavailable = e => chunksRef.current.push(e.data);
            newRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setUrls(prevUrls => [...prevUrls, url]);
                setNumFiles(prevNumFiles => prevNumFiles + 1);
            };

            newRecorder.start();
        } else {
            setRecord(false);
            clearInterval(timerRef.current);
            if (recorder) {
                recorder.stop();
            }
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="ml-5 flex gap-3 z-50 h-full items-center">
            <Button
                color="danger"
                startContent={
                    <div className={`bg-white h-3 w-3 rounded-full transition-all ${record ? 'animate-pulsate bg-red-800' : ''}`}></div>
                }
                isDisabled={!active}
                onClick={startRecording}
                className={`${record ? 'bg-red-500' : ''} min-w-28 transition-all duration-400`}
            >
                {record ? `Stop (${elapsedTime}s)` : "Record"}
            </Button>
            <Badge content={numFiles} color={"warning"} showOutline={false}>
                <Button color="primary" className="min-w-unit-sm" onClick={handleOpenModal}><FontAwesomeIcon icon={faFolder} /></Button>
            </Badge>
            <ModalVideo isOpen={isModalOpen} onClose={handleCloseModal} urls={urls} />
        </div>
    )
}

GifRecord.propTypes = {
    canvasId: PropTypes.string.isRequired,
};