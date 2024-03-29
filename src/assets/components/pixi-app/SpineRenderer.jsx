import { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine } from '@pixi-spine/all-3.8';
import PropTypes from 'prop-types';
import Sprite from '../Sprite';
import { setupInteractivity } from './SetupInteractivity';
import { SetToastContext } from '../context/SetToast';
import { toast } from 'react-toastify';


const path = './assets/';


const SpineRenderer = ({ character, name, canvas, isExpanded, onClick, Assetspine }) => {
    SpineRenderer.propTypes = {
        character: PropTypes.string,
        name: PropTypes.string,
        canvas: PropTypes.object,
        isExpanded: PropTypes.bool,
        onClick: PropTypes.func,
        Assetspine: PropTypes.object,
    };
    const [spine, setSpine] = useState(null);
    const { toastId } = useContext(SetToastContext);

    useEffect(() => {
        if (canvas && character && character !== "ASSET") {
            let characterPath = path + character + '.skel';
            fetch(characterPath)
                .then(response => {
                    if (!response.ok) {
                        toast.update(toastId, {
                            render: `HTTP error! status: ${response.status}`,
                            type: "error",
                            isLoading: false,
                            autoClose: 2500
                        });
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(content => {
                    if (content.length < 1000 || content.includes('html')) {
                        toast.update(toastId, {
                            render: "Spine render failed (Resource is empty)",
                            type: "error",
                            isLoading: false,
                            autoClose: 2500
                        });
                        throw new Error('Resource is empty');
                    }
                    PIXI.Assets.load(characterPath).then((resource) => {
                        //console.log(resource)
                        const spine = new Spine(resource.spineData);
                        //console.log(spine)
                        spine.scale.set(0.5);
                        spine.x = canvas.screen.width / 2;
                        spine.y = canvas.screen.height / 1.2;
                        if (spine.state.hasAnimation('stand2')) {
                            spine.state.setAnimation(0, 'stand2', true);
                        } else {
                            let anim = spine.state.data.skeletonData.animations[0].name;
                            spine.state.setAnimation(0, anim, true);
                        }
                        setupInteractivity(spine);
                        canvas.stage.addChild(spine);

                        //console.log(toastId)

                        toast.update(toastId, {
                            render: "Spine rendered successfully",
                            type: "success",
                            isLoading: false,
                            autoClose: 2500
                        });

                        setSpine(spine);
                    }).catch((err) => {
                        console.log(err);
                    });
                })
        } else if (canvas && Assetspine) {
            Assetspine.scale.set(0.5);
            Assetspine.x = canvas.screen.width / 2;
            Assetspine.y = canvas.screen.height / 1.2;
            if (Assetspine.state.hasAnimation('stand2')) {
                Assetspine.state.setAnimation(0, 'stand2', true);
            } else {
                let anim = Assetspine.state.data.skeletonData.animations[0].name;
                Assetspine.state.setAnimation(0, anim, true);
            }
            setupInteractivity(Assetspine);
            canvas.stage.addChild(Assetspine);
            setSpine(Assetspine);
            toast.update(toastId, {
                render: "Spine rendered successfully",
                type: "success",
                isLoading: false,
                autoClose: 2500
            });

        }
    }, [canvas, character, Assetspine]);

    const [isSpriteVisible, setIsSpriteVisible] = useState(true);

    const handleRemoveSprite = () => {
        setIsSpriteVisible(false);
    };

    return (
        <>
            {spine && isSpriteVisible && <Sprite sprite={spine} name={name} skin={character} isExpanded={isExpanded} onClick={onClick} onRemove={handleRemoveSprite} />}
        </>
    );
}

export default SpineRenderer;