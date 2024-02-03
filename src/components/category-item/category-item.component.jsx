import { useNavigate } from "react-router-dom";
import {CategoryItemContainer, BackgroundImage, Body} from "./category-item.styles";

const CategoryItem = ({category})=>{
    let {imageUrl,title, route} = category;
    const navigate = useNavigate();
    const NavigateHandler = ()=>navigate(route)
    return(
        <CategoryItemContainer onClick={NavigateHandler}>
           <BackgroundImage imageUrl={imageUrl}/>
            <Body className="category-body-container">
              <h2>{title}</h2>
              <p>shop now</p>
            </Body>
          </CategoryItemContainer>
    )
}

export default CategoryItem;