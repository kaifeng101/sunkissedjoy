import serverInstance from ".";

export const placeOrderAPI = ({data})=>serverInstance.post('/order', data).then(res=>res.data);
export const fetchOrdersAPI = ()=>serverInstance.get('/order').then(res=>res.data);
export const fetchOrderAPI = ({orderId})=>serverInstance.get(`/order/${orderId}`).then(res=>res.data);
export const stripeCheckoutSessionAPI = ({data})=>serverInstance.post('/pay/create-checkout-session',data).then(res=>res.data);
export const getAdminOrderAPI = ({token})=>serverInstance.post(`/order/admin-order`, {token}).then(res=>res.data);