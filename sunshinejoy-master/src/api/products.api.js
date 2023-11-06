import serverInstance from ".";

export const getProducts = ()=>serverInstance.get('/product').then(res=>res.data);
