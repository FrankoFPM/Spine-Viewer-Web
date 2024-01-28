import { Button } from "@nextui-org/react";
import { useContext, useRef, useState } from "react";
import { SetAppContext } from "./context/SetApp";
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine, SkeletonBinary, TextureAtlas, AtlasAttachmentLoader } from '@pixi-spine/all-3.8';
import ProtoType from 'prop-types';
import { SetAssetsContext } from "./context/SetAssets";
import { toast } from "react-toastify";
import { SetToastContext } from "./context/SetToast";

export default function UploadButtons({ onOpenChange }) {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [active, setActive] = useState(true);
    const [nameFile, setNameFile] = useState(null);

    const { appGlobal } = useContext(SetAppContext);
    const { assets, setAssets } = useContext(SetAssetsContext);
    const { setToastId } = useContext(SetToastContext);


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
        const idtoast = toast.loading("Please wait...");
        setToastId(idtoast);

        blobUrlToArrayBuffer(urlObject.skel)
            .then(arrayBuffer => {
                const id = assets[assets.length - 1].id;
                const timestamp = Date.now();
                const spineName = `sprite${id}_${timestamp}`;
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
                    console.log(spine);
                    if (spine.spineData.version.includes("3.8")) {
                        setAssets((prevAssets) => [...prevAssets, { name: nameFile, id: id + 1, spine: spine }]);
                    } else {
                        toast.update(idtoast, {
                            render: "Spine render error",
                            type: "error",
                            isLoading: false,
                            autoClose: 2000
                        });

                        toast.error(`Incompatible version: ${spine.spineData.version}`);
                    }

                });
            })
            .catch(error => console.error("error:", error))
    }

    const handleFileChange = (event) => {
        setFiles([]);
        const newFiles = Array.from(event.target.files);
        const fileMap = {};

        if (newFiles.length > 3) {
            toast.error("You cannot upload more than 3 files at a time.");
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
                toast.error(`File ${baseName}.${extension} already uploaded`);
                return;
            }
            let url = URL.createObjectURL(file);
            uploadedFilesUrls[extension] = url;

            fileMap[baseName].add(extension);
        }

        setNameFile(Object.keys(fileMap)[0] || '');
        setFileData(uploadedFilesUrls);

        if (Object.keys(fileMap).length !== 1 || !fileMap[Object.keys(fileMap)[0]].has('skel') || !fileMap[Object.keys(fileMap)[0]].has('atlas') || !fileMap[Object.keys(fileMap)[0]].has('png')) {
            toast.error("Upload exactly 3 files: .skel, .atlas, .png with same base name");
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