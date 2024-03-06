import { createAction } from "../../utils/redicer/redicer.utils"
import { CATEGORY_ACTION_TYPES } from "./category.types"

export const setCategoriesMap = (categoriesMap)=>{
    return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORies_MAP, categoriesMap)
}