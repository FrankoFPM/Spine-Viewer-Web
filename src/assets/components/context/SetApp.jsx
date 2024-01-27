import { createContext, useState } from "react";
import PropTypes from 'prop-types';


export const SetAppContext = createContext();
export function SetAppProvider({ children }) {
    const [appGlobal, setAppGlobal] = useState(null);

    return (
        <SetAppContext.Provider value={{ appGlobal, setAppGlobal }} >
            {children}
        </SetAppContext.Provider>
    )
}
SetAppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};