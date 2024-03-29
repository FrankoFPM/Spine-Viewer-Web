//contexto para anadir sprites al los componentes
import { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

export const SetSpriteContext = createContext();
export function SetSpriteProvider({ children }) {

    SetSpriteProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const [sprites, setSprites] = useState([{ asset: null, name: "yukikaze" }]);
    const addSprite = useCallback((sprite) => {
        setSprites(prevSprites => [...prevSprites, sprite]);
    }, []);
    return (
        <SetSpriteContext.Provider value={{ sprites, setSprites, addSprite }}>
            {children}
        </SetSpriteContext.Provider>
    )
}