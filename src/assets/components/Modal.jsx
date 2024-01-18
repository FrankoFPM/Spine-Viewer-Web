import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Filter from "./Filter";


export default function ModalComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button
                color='success'
                size='sm'
                className='font-bold text-md text-white'
                onPress={onOpen}
            >
                ADD SPRITE
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                className="bg-opacity-60"
                classNames={{
                    body: "",
                    backdrop: "backdrop-opacity-80",
                    base: "bg-blue-900 bg-opacity-80 dark:bg-blue-900 dark:bg-opacity-80 text-white",
                    header: "border-b-[1px] border-white",
                    footer: "border-t-[1px] border-white",
                    closeButton: "hover:bg-white/5 active:bg-white/10 text-white",
                }}
                scrollBehavior="outside"
                size="5xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add new Sprite
                            </ModalHeader>
                            <ModalBody>
                                <Filter onOpenChange={onOpenChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="shadow" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}