import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import ProtoType from 'prop-types';
import { SetSpriteContext } from "./context/SetSprite";
import { useContext } from "react";


export default function ModalSkins({ isOpen, onClose, name, base, onOpenChange }) {

    ModalSkins.propTypes = {
        isOpen: ProtoType.bool.isRequired,
        onClose: ProtoType.func.isRequired,
        name: ProtoType.string.isRequired,
        base: ProtoType.object.isRequired,
        onOpenChange: ProtoType.func.isRequired,
    };
    const { addSprite } = useContext(SetSpriteContext);
    const handleClick = (name, skin) => {
        const newSprite = { asset: skin, name: name };
        addSprite(newSprite);
        onClose();
        onOpenChange();
    };


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
                    base: `${base.group.toLowerCase().replace(' ', '-').replace('@', 'a')} bg-opacity-80 dark:bg-blue-900 dark:bg-opacity-80 text-white`,
                    header: "border-b-[1px] border-white",
                    footer: "border-t-[1px] border-white",
                    closeButton: "hover:bg-white/5 active:bg-white/10 text-white",
                }}
                size="xs"
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center gap-1 text-3xl">
                                {base.name}
                            </ModalHeader>
                            <ModalBody>
                                <h1 className="font-semibold">Information</h1>
                                <p>Faction: {base.group}</p>
                                <p>Type: {base.type} </p>
                                <div>
                                    <h1 className="font-semibold">Avalible Skins</h1>
                                    <div>
                                        <div className="grid grid-cols-2 rounded-md overflow-hidden">

                                            {base.skin.map((skin, index) => (
                                                <Button
                                                    key={index}
                                                    color="primary"
                                                    variant="shadow"
                                                    className={`text-white min-w-32 ${base.skin.length % 2 !== 0 && index === base.skin.length - 1 ? 'col-span-2' : ''}`}
                                                    radius="none"
                                                    onClick={() => handleClick(name, skin)}
                                                >
                                                    <div className="truncate">
                                                        {
                                                            skin.includes("_h") ? "Oath" : (skin.includes("_") ? skin : "Default")
                                                        }
                                                    </div>
                                                </Button>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="shadow" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
