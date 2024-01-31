import { createContext, useState, useEffect } from "react";

// import { addCollectionAndDocuments } from "../utils/firebase.utils.js";
// import SHOP_DATA from "../assets/shop-data.js";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap : {},
});

export const CategoriesProvider =  ({children})=>{
    const [categoriesMap, setCategoriesMap] = useState({});
    /* To upload data to firebase database 

    useEffect(()=>{
        addCollectionAndDocuments("categories", SHOP_DATA)
    },[]);
    
    */

    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoriesMap)
        }
        getCategoriesMap();
    },[]);
    const value = {categoriesMap}; 
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

