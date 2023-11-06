import { useState } from "react";
import PRODUCT_DATA from '../utils/data/temp/products.json';
import DRAWING_STYLES_DATA from '../utils/data/temp/drawingStyles.json';
export default function useContent() {
    const [drawingStyles,setDrawingStyles] = useState(DRAWING_STYLES_DATA);
    const [products,setProducts] = useState(PRODUCT_DATA);
    
    return {
        drawingStyles,
        products
    }
}


