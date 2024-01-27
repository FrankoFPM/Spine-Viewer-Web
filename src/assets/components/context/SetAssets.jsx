import { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

export const SetAssetsContext = createContext();
export function SetAssetsProvider({ children }) {

    const [assets, setAssets] = useState([{ name: null, id: 0, spine: null }]);
    const addAsset = useCallback((asset) => {
        setAssets(prevAssets => [...prevAssets, asset]);
    }, []);
    return (
        <SetAssetsContext.Provider value={{ assets, setAssets, addAsset }}>
            {children}
        </SetAssetsContext.Provider>
    )
}
SetAssetsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};