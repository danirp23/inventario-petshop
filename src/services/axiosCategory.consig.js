import axios from "axios";

const URL = "https://664579b1b8925626f891f7c4.mockapi.io/api/category";

export const axiosInstance = axios.create({
    baseURL: URL
});

export const createNewCategory = async (values) => {
    try {
        const response = await axiosInstance.post('/', values);
        return response;
    } catch (error) {
        console.error("Error al crear la categoria:", error);
        throw error;
    }
};

export const getCategory = async () => {
    try {
        const response = await axiosInstance.get('/');
        return response;
    } catch (error) {
        console.error("Error al devolver los productos:", error);
    }
};