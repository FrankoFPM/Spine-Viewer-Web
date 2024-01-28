import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const SetToastContext = createContext();

export function SetToastProvider({ children }) {
    const [toastId, setToastId] = useState(null);
    return (
        <SetToastContext.Provider value={{ toastId, setToastId }}>
            {children}
        </SetToastContext.Provider>
    )
}
SetToastProvider.propTypes = {
    children: PropTypes.node.isRequired,
};