import serverInstance from ".";

export const fetchProductsAPI = () => serverInstance.get('/product').then(res => res.data);