import serverInstance from ".";

export const updateCartAPI = ({data})=>serverInstance.patch('/cart', data).then(res=>res.data);
export const getCartAPI = ()=>serverInstance.get('/cart').then(res=>res.data);
export const deleteCartAPI = ()=>serverInstance.delete('/cart').then(res=>res.data);
export const addItemToCartAPI = ({ data }) => serverInstance.post('/cart', data).then(res => res.data);
