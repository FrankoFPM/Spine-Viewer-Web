import { Button } from "@nextui-org/react";
import { useContext, useRef, useState } from "react";
import { SetAppContext } from "./context/SetApp";
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine, SkeletonBinary, TextureAtlas, AtlasAttachmentLoader } from '@pixi-spine/all-3.8';
import { setupInteractivity } from "./pixi-app/SetupInteractivity";

export default function UploadButtons() {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [counter, setCounter] = useState(1);

    const { appGlobal } = useContext(SetAppContext);


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
                const spineName = `sprite${counter}`;
                PIXI.Assets.add({
                    alias: spineName,
                    src: urlObject.atlas,
                    loadParser: "loadTxt",
                    image: PIXI.BaseTexture.from(urlObject.png),
                });

                PIXI.Assets.load(spineName).then((resource) => {
                    var rawSkeletonData = new Uint8Array(arrayBuffer);
                    var rawAtlasData = resource;
                    console.log(rawAtlasData);

                    var spineAtlas = new TextureAtlas(rawAtlasData, function (line, callback) {
                        callback(PIXI.BaseTexture.from(urlObject.png));
                    });
                    var spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas)

                    var spineBinaryParser = new SkeletonBinary(spineAtlasLoader);
                    var spineData = spineBinaryParser.readSkeletonData(rawSkeletonData);
                    console.log(spineData);
                    const spine = new Spine(spineData);
                    spine.scale.set(0.5);
                    spine.x = appGlobal.screen.width / 2;
                    spine.y = appGlobal.screen.height / 1.2;
                    if (spine.state.hasAnimation('stand2')) {
                        spine.state.setAnimation(0, 'stand2', true);
                    } else {
                        let anim = spine.state.data.skeletonData.animations[0].name;
                        spine.state.setAnimation(0, anim, true);
                    }
                    setupInteractivity(spine);
                    appGlobal.stage.addChild(spine);
                });
            })
            .catch(error => console.error("AAAAAA", error)).finally(() => {
                setCounter(counter + 1);
            });
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

        setFileData(uploadedFilesUrls);

        if (Object.keys(fileMap).length !== 1 || !fileMap[Object.keys(fileMap)[0]].has('skel') || !fileMap[Object.keys(fileMap)[0]].has('atlas') || !fileMap[Object.keys(fileMap)[0]].has('png')) {
            alert("Debes subir exactamente 3 archivos con las extensiones .skel, .atlas y .png y con el mismo nombre base.");
            return;
        }

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };
    const handleSpriteRender = () => {
        loadAssets(fileData);
    }

    return (
        <div className="flex items-center gap-2 mb-2">
            <Button color="success" className="text-white font-semibold" onClick={handleUploadClick}>
                Upload Assets
            </Button>
            <input type="file" className="hidden" ref={fileRef} accept=".skel,.atlas,.png" multiple onChange={handleFileChange} />
            {files.map((file, index) => (
                <span key={index}>{file.name} |</span>
            ))}
            <Button color="warning" className="text-white font-semibold" onClick={handleSpriteRender}>
                GO
            </Button>
        </div>
    );
}