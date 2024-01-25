import { Button } from "@nextui-org/react";
import { useRef, useState } from "react";

export default function UploadButtons() {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);

    const handleUploadClick = () => {
        fileRef.current.click();
    };

    const handleFileChange = (event) => {
        setFiles([]);
        const newFiles = Array.from(event.target.files);
        const fileMap = {};

        if (newFiles.length > 3) {
            alert("No puedes subir más de 3 archivos a la vez.");
            return;
        }

        for (let file of newFiles) {
            const baseName = file.name.split('.').slice(0, -1).join('.');
            const extension = file.name.split('.').pop();

            if (!fileMap[baseName]) {
                fileMap[baseName] = new Set();
            }

            if (fileMap[baseName].has(extension)) {
                alert(`Ya has subido un archivo con el nombre ${baseName} y la extensión .${extension}`);
                return;
            }

            fileMap[baseName].add(extension);
        }

        if (Object.keys(fileMap).length !== 1 || !fileMap[Object.keys(fileMap)[0]].has('skel') || !fileMap[Object.keys(fileMap)[0]].has('atlas') || !fileMap[Object.keys(fileMap)[0]].has('png')) {
            alert("Debes subir exactamente 3 archivos con las extensiones .skel, .atlas y .png y con el mismo nombre base.");
            return;
        }

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    return (
        <div className="flex items-center gap-2 mb-2">
            <Button color="success" className="text-white font-semibold" onClick={handleUploadClick}>
                Upload Assets
            </Button>
            <input type="file" className="hidden" ref={fileRef} accept=".skel,.atlas,.png" multiple onChange={handleFileChange} />
            {files.map((file, index) => (
                <span key={index}>{file.name} |</span>
            ))}
        </div>
    );
}