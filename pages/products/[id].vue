<template>
  <Head>
    <Title>{{ product.name }}</Title>
    <Meta name="description" :content="product.description"/>
  </Head>
  <v-card v-if="is_loading">
    <div class="container-card">
      <div class="skeleton skeleton-img" style="height: 250px"></div>
      <div class="pa-4">
        <div style="display: flex; justify-content: space-between">
          <div class="skeleton skeleton-text" style="width: 200px"></div>
          <div class="skeleton skeleton-text" style="width: 120px"></div>
        </div>
        <div class="skeleton skeleton-text" style="width: 100px;margin-top: 20px"></div>
        <div class="skeleton skeleton-text" style="width: 120px"></div>
        <div class="skeleton skeleton-text" style="width: 360px;"></div>
      </div>
    </div>
  </v-card>
<v-card v-else>
  <ul class="breadcrumb">
    <li><NuxtLink to="/">Главная</NuxtLink></li>
    <li><NuxtLink :to="'/categories/'+category.id">{{ category.name }}</NuxtLink></li>
    <li><NuxtLink :to="'/'+category.id">{{ subcategory.name }}</NuxtLink></li>
    <li style="color:#757575;">{{ product.name}}</li>
  </ul>
<!--  <p><img style="max-width: 100%; height: auto" src="https://img.joomcdn.net/3a471d818df6d088b956251e491cf6f707c9e3c0_400_400.jpeg" alt=""></p>-->
 <div class="container-card">
   <div style="padding-top: 40px">
     <div class="modal-content">
       <div class="modal-nav">
         <div class="modal-nav-item" v-for="(image, index) in product.images" :key="index" @click="changeSlide(index, image.path)">
           <div><img style="width: 80px; height: 100px" :src="image.path" alt="Product Image"></div>
         </div>
       </div>
       <div><img class="img-cover" :src="image" alt="Product Image"></div>
     </div>
   </div>
   <div>
     <v-col>
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
           <v-btn @click.prevent="RemoveToFavorite" style="color: #00c853; font-size: 20px" v-if="is_favorite" elevation="0"><v-icon>mdi-heart</v-icon></v-btn>
           <v-btn @click.prevent="AddToFavorite" style="color: #00c853; font-size: 20px" v-else elevation="0"><v-icon>mdi-heart-outline</v-icon></v-btn>
         </p>
       </div>
       <div class="pt-2 pb-2" style="font-size: 18px">
         <p>{{ product.name }}</p>
         <p style="font-size: 15px; padding-top: 10px">Бренд: {{ product.brand }}</p>
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
       <v-divider></v-divider>
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
               <button @click="Select_sizes(size.value)" v-else style="background: #e7e7e7; padding: 6px 8px 6px 8px; font-size: 16px; font-weight: 300; margin: 6px; border-radius: 8px;">{{ size.value }}</button>
             </div>
           </div>
         </div>
       </div>
       <v-divider class="my-6"></v-divider>
       <div style="display: flex;justify-content: space-between; padding-bottom: 10px">
         <v-btn @click="AddBasket(product.id)" class="px-8" style="font-size: 16px" color="success">В корзину</v-btn>
         <v-btn disabled class="px-6" style="font-size: 16px" color="red">Купить сейчас</v-btn>
       </div>
     </v-col>
   </div>
 </div>
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
  <ProductSkeleton v-if="is_loading" />
  <Products v-else :products="products" />
</template>

<script>
import axios from "axios";
import {useBasketStore} from "../../stores";
import {BASE_URL} from "../../constants";
import CryptoJS from "crypto-js"
import Products from "../../components/products/Products";
import ProductSkeleton from "../../components/products/ProductSkeleton";


export default {
  components: {Products, ProductSkeleton},
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
    modalOpen: false,
    currentIndex: 0,
    image: "",
    category: {},
    subcategory: {},
    is_favorite: false,
    is_loading: true
  }),
  async mounted() {
    const route = useRoute()
    await axios.get(BASE_URL+`/api/product/`+route.params.id).then(response => {
      this.product = response.data.data
      this.category = response.data.data.category
      this.subcategory = response.data.data.subcategory
      this.colors = response.data.data.colors
      this.sizes = response.data.data.sizes ?? 'NULL'
      this.image = response.data.data.images[0].path
    }).catch(err => {
      console.log(err);
    });

    await axios.get(BASE_URL+`/api/product`).then(response => {
      this.products = response.data.data
      this.is_loading = false
    }).catch(err => {
      console.log(err);
    });

    await axios.get(BASE_URL+`/api/favorite/check`, {params: {product_id: route.params.id, guid: localStorage.getItem('guid')}}).then(response => {
      this.is_favorite = response.data
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    changeSlide(index, path) {
      this.image = path
      this.currentIndex = index;
    },
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
    RemoveToFavorite(){
      const route = useRoute()
      axios.get(BASE_URL+`/api/favorite/create`, {params: {product_id: route.params.id, guid: localStorage.getItem('guid')}}).then(response => {
        this.is_favorite = false
      }).catch(err => {
        console.log(err);
      });
    },
    AddToFavorite(){
      const route = useRoute()
      axios.get(BASE_URL+`/api/favorite/create`, {params: {product_id: route.params.id, guid: localStorage.getItem('guid')}}).then(response => {
        this.is_favorite = true
      }).catch(err => {
        console.log(err);
      });
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

<style scoped>
ul.breadcrumb {
  font-size: 14px;
  padding: 10px 16px;
  list-style: none;
  background-color: #deffe3;
}
ul.breadcrumb li {
  display: inline;
  font-size: 14px;
}
ul.breadcrumb li+li:before {
  padding: 8px;
  color: black;
  content: "/\00a0";
}
ul.breadcrumb li a {
  color: #000000;
  text-decoration: none;
}
ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.modal-content {
  display: flex;
  max-width: 400px;
  justify-content: space-between;
  margin: auto;
  width: 95%;
  height: 95%;
}

.modal-nav {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: content-box;
  margin-right: 8px;
  padding-right: 1.1rem;
  width: calc(16.6%);
  height: 340px;
  scroll-behavior: smooth;
}
.modal-nav::-webkit-scrollbar {
  width: 0px;
}


.modal-nav-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
}
.container-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.img-cover{
  width: 273px;
  height: 365px
}
.img-item{
  width: 800px;
  height: 100px
}
@media (max-width: 410px) {
  .container-card {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  .img-cover{
    width: 260px;
    height: 365px
  }
  .modal-nav{
    height: 365px;
  }
  .img-item{
    width: 85px;
    height: 110px
  }
}
@media (min-width: 410px) and  (max-width: 820px) {
  .container-card {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  .modal-content{
    max-width: 100%;
  }
  .img-cover{
    width: 318px;
    height: 424px
  }
  .modal-nav{
    height: 424px;
  }
  .img-item{
    width: 85px;
    height: 110px
  }
}

/* iPads (portrait and landscape)  */
@media (min-width: 820px){
  .img-cover{
    width: 310px;
    height: 520px
  }
  .modal-nav{
    height: 520px;
  }
  .img-item{
    width: 80px;
    height: 80px
  }
  .container-card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
a{
  color: #000000;
  text-decoration: none!important;
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
}
</style>