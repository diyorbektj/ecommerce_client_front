import { defineStore } from 'pinia'
import {BASE_URL} from "~/constants";
import axios from "axios";

export const useProductStore = defineStore({
    id: 'products',
    state: () => ({
        bascket: {},
        isAuthorized: false,
        isAdmin: false,
    }),
})