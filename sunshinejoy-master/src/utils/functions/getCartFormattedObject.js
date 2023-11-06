export const getCartFormattedObject = ({numberOfPersonTobeDrawn,selectedImage,additionalComments,drawingStyle, selectedProducts}) => {
    return {
        numberOfPeople : numberOfPersonTobeDrawn,
        drawingStyle : drawingStyle._id,
        products : selectedProducts.map(item=>({productId : item.product._id,quantity : item.quantity, content : item.content})),
        momentsImage : selectedImage,
        additionalComments,
    }
}