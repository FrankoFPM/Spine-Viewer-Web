import { useEffect, useContext, useState } from 'react';
import * as PIXI from 'pixi.js';
import SpineRenderer from './SpineRenderer';
import { SetSpriteContext } from './context/SetSprite';
import PropTypes from 'prop-types';

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

    return (
        <>
            {app && sprites.map((sprite, index) => (
                <SpineRenderer key={index} character={sprite.asset} name={sprite.name} canvas={app} />
            ))}
        </>
    );
}

export default PixiApp;