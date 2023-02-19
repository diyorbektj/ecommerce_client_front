import { defineStore } from 'pinia'
import axios from "axios";
import {BASE_URL} from "~/constants";


interface CartState {
    contents: Record<string, CartPreview>;
}

export interface CartPreview {
    id: number;
    product_name: string;
    product_id: number;
    user_id: string
    product_image: string;
    quantity: number;
    price: number;
    guid: string;
    attributes: object,
    id_hash: string,
}

export const useBasketStore = defineStore({
    id: 'basket',
    state: () => ({
        contents: [] as CartPreview[]
    }),
    getters: {
        count: (state) => {
            return Object.keys(state.contents).reduce((acc, id) => {
                return acc + 1;
            }, 0);
        },
        total(state): number {
            return state.contents.reduce((acc, basket) => {
                return acc + basket.price * basket.quantity;
            }, 0);
        },
    },
    actions: {
        async AddBasket(productId: number, hash: string, selected_color: string, selected_size: string, quantity: number){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await axios.post(BASE_URL+'/api/basket/create', {id: productId, guid: localStorage.getItem('guid'), hash: hash, size: selected_color, color: selected_size, quantity: quantity}).then(response => {
                this.contents.push(response.data)
            }).catch(err => {
                console.log(err)
            });
        },
        async Basket(){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await axios.post(BASE_URL+'/api/basket/get', {guid: localStorage.getItem('guid')}).then(response => {
                this.contents = response.data
            }).catch(err => {
                console.log(err)
            });
        },
        async Increment(hash: string){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await axios.post(BASE_URL+'/api/basket/increment', {guid: localStorage.getItem('guid'), hash: hash}).then(response => {
               let basket =  this.contents.find(item => item.id_hash === hash)
                if(basket){
                    basket.quantity += 1;
                    return;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        async Decrement(hash: string){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await axios.post(BASE_URL+'/api/basket/decrement', {guid: localStorage.getItem('guid'), hash: hash}).then(response => {
                let index =  (this.contents.findIndex(item => item.id_hash === hash))
                if(this.contents[index].quantity === 1){
                    this.contents.splice(index, 1)
                    return;
                }
                this.contents[index].quantity -=1
            }).catch(err => {
                console.log(err)
            });
        },
        async ClearBasket(){
            await axios.post(BASE_URL+'/api/basket/clean_basket', {
                guid: localStorage.getItem('guid')
            }).then(response => {
                this.contents = []
            }).catch(err => {
                console.log(err)
            });
        }
    },
})