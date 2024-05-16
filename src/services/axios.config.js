import axios from "axios";

const URL = "https://664579b1b8925626f891f7c4.mockapi.io/api/stockProducts";

export const axiosInstance = axios.create({
    baseURL: URL
});

export const createNewProduct = async (values) => {
    try {
        const response = await axiosInstance.post('/', values);
        return response;
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
};

export const getProducts = async (values) => {
    try {
        const response = await axiosInstance.get('/');
        return response;
    } catch (error) {
        console.error("Error al devolver los productos:", error);
        throw error;
    }
};
