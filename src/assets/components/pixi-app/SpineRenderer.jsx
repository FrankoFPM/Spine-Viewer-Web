import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine } from '@pixi-spine/all-3.8';
import PropTypes from 'prop-types';
import Sprite from '../Sprite';


const path = '../../../../public/assets/';


function setupInteractivity(shiprender) {
    shiprender.eventMode = 'dynamic';
    shiprender.buttonMode = true;
    let dragging = false;
    let data;
    let offset = { x: 0, y: 0 };
    shiprender.on('pointerdown', function (event) {
        //console.log('Sprite clicked:', this);
        //selectSprite(this);
        dragging = true;
        data = event.data;
        let position = data.getLocalPosition(this.parent);
        offset.x = this.x - position.x;
        offset.y = this.y - position.y;
    });
    shiprender.on('globalpointermove', function () {
        if (dragging) {
            var newPosition = data.getLocalPosition(this.parent);
            this.x = newPosition.x + offset.x;
            this.y = newPosition.y + offset.y;
        }
    });
    shiprender.on('pointerup', function () {
        dragging = false;
        data = null;
    });
}

const SpineRenderer = ({ character, name, canvas, isExpanded, onClick }) => {
    SpineRenderer.propTypes = {
        character: PropTypes.string,
        name: PropTypes.string,
        canvas: PropTypes.object,
        isExpanded: PropTypes.bool,
        onClick: PropTypes.func,
    };
    const [spine, setSpine] = useState(null);

    useEffect(() => {
        if (canvas && character) {
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