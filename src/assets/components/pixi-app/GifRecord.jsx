import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Badge } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

export default function GifRecord({ canvasId }) {


    const [active, setActive] = useState(false);
    const [record, setRecord] = useState(false);
    const [canvas, setCanvas] = useState(null);
    const [recorder, setRecorder] = useState(null);
    const chunksRef = useRef([]);

    const [numFiles, setNumFiles] = useState(0);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        setActive(true);
        setCanvas(document.getElementById(canvasId));
    }, [canvasId]);

    const startRecording = () => {
        if (!record) {
            setRecord(true);
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
                console.log(url);
                //almacenar todos los url en un array
                setUrls(prevUrls => [...prevUrls, url]);
                setNumFiles(prevNumFiles => prevNumFiles + 1);
            };

            newRecorder.start();
        } else {
            setRecord(false);
            if (recorder) {
                recorder.stop();
            }
        }
    }

    return (
        <div className="ml-5 flex gap-3 z-50 h-full items-center">
            <Button
                color="danger"
                startContent={
                    <div className={`bg-white h-3 w-3 rounded-full transition-all ${record ? 'animate-pulsate bg-red-800' : ''}`}></div>
                }
                isDisabled={!active}
                onClick={startRecording}
                className={`${record ? 'bg-red-500' : ''} min-w-24 transition-all duration-400`}
            >
                {record ? "Stop" : "Record"}
            </Button>
            <Badge content={numFiles} color={"warning"} showOutline={false}>
                <Button color="primary" className="min-w-unit-sm"><FontAwesomeIcon icon={faFolder} /></Button>
            </Badge>
        </div>
    )
}

GifRecord.propTypes = {
    canvasId: PropTypes.string.isRequired,
};