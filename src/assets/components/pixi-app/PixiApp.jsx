import { useEffect, useContext, useState } from 'react';
import * as PIXI from 'pixi.js';
import SpineRenderer from './SpineRenderer';
import { SetSpriteContext } from '../context/SetSprite';
import PropTypes from 'prop-types';
import { ScrollShadow } from '@nextui-org/react';
import Buttons from '../navbar/Buttons';

const PixiApp = ({ canvasId }) => {

    PixiApp.propTypes = {
        canvasId: PropTypes.string.isRequired,
    };

    const [app, setApp] = useState(null);
    const { sprites } = useContext(SetSpriteContext);

    useEffect(() => {
        const canvasElement = document.getElementById(canvasId);

        // Si el elemento canvas no existe, no ejecutes el resto del código
        if (!canvasElement) {
            return;
        }

        const pixiApp = new PIXI.Application({
            background: '0x1099bb',
            antialias: true,
            width: 800,
            height: 500,
            view: canvasElement
        });

        setApp(pixiApp);
    }, [canvasId]);
    const [expandedSprite, setExpandedSprite] = useState(null);


    const handleSpriteClick = (name) => {
        setExpandedSprite(expandedSprite === name ? null : name);
        console.log(expandedSprite);
    };

    return (
        <>
            <ScrollShadow hideScrollBar className="h-auto mb-2" size={5}>
                <div className="flex flex-col gap-2 mb-2">
                    {app && sprites.map((sprite, index) => (
                        <SpineRenderer key={index} character={sprite.asset} name={sprite.name} canvas={app} isExpanded={expandedSprite === sprite.asset + index} onClick={() => handleSpriteClick(sprite.asset + index)} />
                    ))}
                </div>
            </ScrollShadow>
            {app &&
                <Buttons app={app} />
            }

        </>
    );
}

export default PixiApp;