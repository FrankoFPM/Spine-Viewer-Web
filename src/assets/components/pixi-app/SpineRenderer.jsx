import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine } from '@pixi-spine/all-3.8';
import PropTypes from 'prop-types';
import Sprite from '../Sprite';
import { setupInteractivity } from './SetupInteractivity';


const path = '/assets/';


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

    useEffect(() => {
        if (canvas && character && character !== "ASSET") {
            let characterPath = path + character + '.skel';
            fetch(characterPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(content => {
                    if (content.length < 700) {
                        throw new Error('El recurso está vacío');
                    }
                    PIXI.Assets.load(characterPath).then((resource) => {
                        console.log(resource)
                        const spine = new Spine(resource.spineData);
                        console.log(spine)
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

                        console.log("renderizado")
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
        } else {
            console.log("app is null or character is null")
        }
    }, [canvas, character]);

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