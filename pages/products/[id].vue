<template style="max-width: 800px; margin: 0 auto">
  <Head>
    <Title>{{ product.name }}</Title>
    <Meta name="description" :content="product.description"/>
  </Head>
<v-card style="padding: 4px">
<!--  <p><img style="max-width: 100%; height: auto" src="https://img.joomcdn.net/3a471d818df6d088b956251e491cf6f707c9e3c0_400_400.jpeg" alt=""></p>-->
  <section class="gallery product-images" style="display: flex; justify-content: center">
    <div v-for="(item, index) in product.images" :key="index" class="gallery__item" style="display: flex; justify-content: center">
      <input type="radio" :id='"img-"+index' checked name="gallery" class="gallery__selector"/>
      <img style="max-width: 100%; height: 300px" class="gallery__img" :src="item.path" alt=""/>
      <label :for='"img-"+index' class="gallery__thumb"><img style="width: 100px; height: 100px" :src="item.path" alt=""/></label>
    </div>

  </section>
  <v-col>
    <div class="pa-2">
      <p>{{ product.name }}</p>
    </div>
    <div style="display: flex;justify-content: space-between">
      <p><v-rating
          v-model="rating"
          :value="rating"
          background-color="green lighten-2"
          color="green"
          size="25"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
      ></v-rating></p>
      <p style="color: #ff0000">
        <v-icon>mdi-heart</v-icon>
      <span>12</span>
      </p>
    </div>
    <div style="font-size: 12px; margin-top: 8px;">{{ product.description }}</div>
    <div class="py-4">
      <div class="py-4">
        <button @click="Decrement" style="padding: 2px 10px; background: #ffffff; border: 1px solid #c6c6c6; border-radius: 9999999px">-</button>
        <input :value="quantity" type="number" style="width: 40px; height: 32px; border: 1px solid #c6c6c6; border-radius: 15px; padding-left: 8px;">
        <button @click="Increment" style="padding: 2px 10px; background: #ffffff; border: 1px solid #c6c6c6; border-radius: 9999999px">+</button>
      </div>
      <p style="font-size: 25px">{{product.price}} сомони</p>
    </div>
    <div style="display: flex;justify-content: space-between">
      <v-btn @click="AddBasket(product.id)" class="px-8" style="font-size: 16px" color="success">В корзину</v-btn>
      <v-btn disabled class="px-6" style="font-size: 16px" color="red">Купить сейчас</v-btn>
    </div>
    <div v-if="errors" style="margin-top: 10px; margin-bottom: 10px">
      <v-alert
          color="error"
          icon="$error"
          title=""
          text="Пожалуйста выберите цвет и размер товара"
      ></v-alert>
    </div>
    <div>
      <div>
        <div class="py-4" style="font-size: 20px">Цвет: {{ selected_color }}</div>

        <div style="display: flex; align-items: center">
          <div v-for="color in colors">
            <button @click="Select_colors(color.value)" v-if="selected_color === color.value" :style="'background:'+color.color_code+'; border-radius: 999999px; height: 35px; width: 35px; border: 3px solid green; margin: 4px'">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="color: #00d028;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

            </button>
            <button @click="Select_colors(color.value)" v-else :style="'background:'+color.color_code+'; border-radius: 999999px; height: 35px; width: 35px; border: 2px solid #b7b7b7; margin: 4px'"></button>
          </div>
        </div>
      </div>
      <div v-if="sizes !=='NULL' || sizes !==''">
        <div class="py-4" style="font-size: 20px">Размер: {{ selected_size }}</div>
        <div style="display: flex; align-items: center">
          <div v-for="size in sizes">
            <button @click="Select_sizes(size.value)" v-if="selected_size === size.value"  style="background: #e7e7e7; padding: 6px 8px 6px 8px; font-size: 16px; font-weight: 300; margin: 6px; border-radius: 8px; border: 2px solid #000000">{{ size.value }}</button>
            <button @click="Select_sizes(size.value)" v-else style="background: #e7e7e7; padding: 6px 8px 6px 8px; font-size: 16px; font-weight: 300; margin: 6px; border-radius: 8px;">{{ size.value }}</button>
          </div>
        </div>
      </div>
    </div>
  </v-col>
</v-card>
  <v-snackbar
      v-model="snackbar"
      multi-line
      timeout="2500"
  >
    Товар добавлен в корзину

    <template v-slot:actions>
      <v-btn
          color="green"
          variant="text"
          @click="snackbar = false"
      >
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
<v-card-text style="font-size: 24px; font-weight: bold">Похожие товары</v-card-text>
  <Products :products="products" />
</template>

<script>
import axios from "axios";
import {useBasketStore} from "../../stores";
import {BASE_URL} from "../../constants";
import CryptoJS from "crypto-js"
import Products from "../../components/products/Products";
import products from "../../components/products/Products";


export default {
  components: {Products},
  data: () => ({
    snackbar: false,
    rating: 1,
    product: {},
    products: [],
    colors: [],
    sizes: [],
    selected_color: "",
    sizes_product: [],
    selected_size: "",
    quantity: 1,
    errors: false,
  }),
  mounted() {
    axios.get(BASE_URL+`/api/product`).then(response => {
      this.products = response.data.data
    }).catch(err => {
      console.log(err);
    });
    const route = useRoute()
    axios.get(BASE_URL+`/api/product/`+route.params.id).then(response => {
      this.product = response.data.data
      this.colors = response.data.data.colors
      this.sizes = response.data.data.sizes ?? 'NULL'
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    AddBasket(id){
      if(this.selected_color !== '' && this.selected_size === 'NULL' || this.selected_size !== '')
      {
        const someStore = useBasketStore()
        var hash = CryptoJS.MD5(id+this.selected_color+this.selected_size).toString()
        someStore.AddBasket(id, hash, this.selected_color, this.selected_size, this.quantity)
        this.snackbar=true;
        this.errors = false
      }else{
        this.errors = true;
      }
    },
    Select_colors(color){
      this.selected_color = color;
    },
    Select_sizes(size){
      this.selected_size = size;
    },
    Increment(){
      this.quantity+=1;
    },
    Decrement(){
      this.quantity-=1;
    }
  }
}
</script>
<style lang="scss" scoped>
@use "sass:math";
* {
  box-sizing: border-box;
}

$max-img-width: 350px;
$max-img-height: 400px;

img {
  max-width: 100%;
  //vertical-align: top;
}

.gallery {
  display: flex;
  margin: 0px auto;
  max-width: 100%;
  position: relative;
  padding-top: 300px;

  @media screen and (min-width: 400px){
    padding-top: 350px;
  }

  @media screen and (min-width: 600px){
    padding-top: 360px;
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &__thumb {
    padding-top: 6px;
    margin: 6px;
    display: block;
  }

  &__selector {
    position: absolute;
    opacity: 0;
    visibility: hidden;

    &:checked {
      + .gallery__img {
        opacity: 1;
      }
      ~ .gallery__thumb > img {
        box-shadow: 0 0 0 3px rgb(5,177,135);;
      }
    }
  }


}
</style>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.product-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
a{
  color: #000000;
  text-decoration: none!important;
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
}
</style>