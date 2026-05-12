    import { createContext, useState } from "react";

    export const Contexto = createContext({
        selectedCategory: "",
        setSelectedCategory: () => {},
    });

    function ContextoProvider({ children }) {
        const [selectedCategory, setSelectedCategory] = useState(''); 
        const valores = {
            selectedCategory,
            setSelectedCategory,
        };

        return (
            <Contexto.Provider value={valores}>
                {children} 
            </Contexto.Provider>
        );
    }

    export default ContextoProvider;
