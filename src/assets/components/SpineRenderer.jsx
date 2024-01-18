import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine } from '@pixi-spine/all-3.8';
import PropTypes from 'prop-types';
import Sprite from './Sprite';


const path = '../../../public/assets/';


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

const SpineRenderer = ({ character, name, canvas }) => {
    SpineRenderer.propTypes = {
        character: PropTypes.string,
        name: PropTypes.string,
        canvas: PropTypes.object,
    };
    const [spine, setSpine] = useState(null);

    useEffect(() => {
        if (canvas) {
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
                        spine.state.setAnimation(0, 'stand2', true);
                        setupInteractivity(spine);
                        canvas.stage.addChild(spine);

                        console.log("renderizado")
                        setSpine(spine);
                    }).catch((err) => {
                        console.log(err);
                    });
                })


        } else {
            console.log("app is null")
        }
    }, [canvas, character]);
    const [expandedSprite, setExpandedSprite] = useState(null);


    const handleSpriteClick = (name) => {
        setExpandedSprite(expandedSprite === name ? null : name);
    };
    return (
        <>
            {spine && <Sprite sprite={spine} name={name} isExpanded={expandedSprite === name} onClick={() => handleSpriteClick(name)} />}
        </>
    );
}

export default SpineRenderer;