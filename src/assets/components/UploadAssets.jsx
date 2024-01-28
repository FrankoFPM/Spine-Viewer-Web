import { Button } from "@nextui-org/react";
import { useContext, useRef, useState } from "react";
import { SetAppContext } from "./context/SetApp";
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine, SkeletonBinary, TextureAtlas, AtlasAttachmentLoader } from '@pixi-spine/all-3.8';
import ProtoType from 'prop-types';
import { SetAssetsContext } from "./context/SetAssets";

export default function UploadButtons({ onOpenChange }) {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [active, setActive] = useState(true);
    const [nameFile, setNameFile] = useState(null);

    const { appGlobal } = useContext(SetAppContext);
    const { assets, setAssets } = useContext(SetAssetsContext);


    const handleUploadClick = () => {
        fileRef.current.click();
        console.log(appGlobal);
    };

    async function blobUrlToArrayBuffer(blobUrl) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        return arrayBuffer;
    }

    function loadAssets(urlObject) {

        blobUrlToArrayBuffer(urlObject.skel)
            .then(arrayBuffer => {
                const id = assets[assets.length - 1].id;
                const spineName = `sprite${id}`;
                PIXI.Assets.add({
                    alias: spineName,
                    src: urlObject.atlas,
                    loadParser: "loadTxt",
                    image: PIXI.BaseTexture.from(urlObject.png),
                });

                PIXI.Assets.load(spineName).then((resource) => {
                    var rawSkeletonData = new Uint8Array(arrayBuffer);
                    var rawAtlasData = resource;
                    //console.log(rawAtlasData);

                    var spineAtlas = new TextureAtlas(rawAtlasData, function (line, callback) {
                        callback(PIXI.BaseTexture.from(urlObject.png));
                    });
                    var spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas)

                    var spineBinaryParser = new SkeletonBinary(spineAtlasLoader);
                    var spineData = spineBinaryParser.readSkeletonData(rawSkeletonData);
                    console.log(spineData);
                    const spine = new Spine(spineData);

                    setAssets((prevAssets) => [...prevAssets, { name: nameFile, id: id + 1, spine: spine }]);
                });
            })
            .catch(error => console.error("error:", error))
    }

    const handleFileChange = (event) => {
        setFiles([]);
        const newFiles = Array.from(event.target.files);
        const fileMap = {};

        if (newFiles.length > 3) {
            alert("No puedes subir más de 3 archivos a la vez.");
            return;
        }

        let uploadedFilesUrls = {};

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
            let url = URL.createObjectURL(file);
            uploadedFilesUrls[extension] = url;

            fileMap[baseName].add(extension);
        }

        setNameFile(Object.keys(fileMap)[0] || '');
        setFileData(uploadedFilesUrls);

        if (Object.keys(fileMap).length !== 1 || !fileMap[Object.keys(fileMap)[0]].has('skel') || !fileMap[Object.keys(fileMap)[0]].has('atlas') || !fileMap[Object.keys(fileMap)[0]].has('png')) {
            alert("Debes subir exactamente 3 archivos con las extensiones .skel, .atlas y .png y con el mismo nombre base.");
            return;
        }

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setActive(false);
    };
    const handleSpriteRender = () => {
        loadAssets(fileData);
        setActive(true);
        onOpenChange();
    }

    return (
        <div className="flex items-center gap-2 mb-2 relative h-full">
            <Button color="success" className="text-white font-semibold" onClick={handleUploadClick}>
                Upload Assets
            </Button>
            <input type="file" className="hidden" ref={fileRef} accept=".skel,.atlas,.png" multiple onChange={handleFileChange} />
            <div className="absolute bottom-[-20px] w-80">
                {files.map((file, index) => (
                    <span key={index} className=" text-xs font-semibold">{file.name} |</span>
                ))}

            </div>
            <Button isDisabled={active} color="warning" className="text-white font-semibold" onClick={handleSpriteRender}>
                GO
            </Button>
        </div>
    );
}
UploadButtons.propTypes = {
    onOpenChange: ProtoType.func.isRequired,
};