import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import { setCategoriesMap } from "../../store/category/category.action";

import "./shop.styles.scss";

import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const getCategoriesMap = async () =>{
        const categoriesMap = await getCategoriesAndDocuments();
        dispatch(setCategoriesMap(categoriesMap));
    }
    getCategoriesMap();
  },[]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<Category/>}/>
    </Routes>
    );
};

export default Shop;
