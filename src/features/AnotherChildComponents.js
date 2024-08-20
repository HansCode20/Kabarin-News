import React from "react";
import FilterPage from "../components/FilterPage";

const AnotherChildComponents = ({children}) => {
    return (
        <div>
            <FilterPage/>
            {children}
        </div>
    )
}

export default AnotherChildComponents;