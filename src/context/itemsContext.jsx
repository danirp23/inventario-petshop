import { createContext } from "react";

export const ItemsContext = createContext()

export const UPLOAD_ITEMS = 'UPLOAD_ITEMS';

export const ItemsReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_ITEMS:
            return action.payload;
        default:
            return state;
    }
};

export const CategoryContext = createContext()

export const UPLOAD_CATEGORIES = 'UPLOAD_CATEGORIES';

export const CategoriesReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}
