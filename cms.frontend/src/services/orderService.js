// services/orderService.js
import axiosClient from '../api/axiosClient';

const orderService = {
    createOrder: (data) => {
        return axiosClient.post('/orders', data);
    },
    getOrders: () => {
        return axiosClient.get('/orders');
    },
    getOrderById: (id) => {
        return axiosClient.get(`/orders/${id}`);
    }
};

export default orderService;