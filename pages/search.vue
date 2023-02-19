<template>
  <Head>
    <Title>Поиск товаров</Title>
    <Meta name="description" content="Товары по ценам, которые не найти в магазинах вашего города, доставка бесплатно!"/>
  </Head>
  <div class="pa-8" style="display: flex; justify-content: space-between;">
    <div style="font-size: 24px; font-weight: bold">Поиск товаров</div>
  </div>
  <div style="padding: 10px">
    <v-text-field v-model="keyword" placeholder="Search" background-color="#ffffff"></v-text-field>
  </div>
  <Products :products="products" />
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../constants";
import Products from "../components/products/Products";

export default {
  components: {Products},
  data: () => ({
    sheet: false,
    rating: 1,
    keyword: "",
    products: [],
  }),
  watch:{
    keyword(after, before) {
      this.Search();
    }
  },
  methods: {
    Search(){
      axios.get(BASE_URL+"/api/product/search", { params: { search: this.keyword }})
          .then(response => {
            this.products = response.data.data
          });
    },
  },
  mounted() {
    axios.get(BASE_URL+"/api/product/", { params: { search: this.keyword }})
        .then(response => {
          this.products = response.data.data
        });
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
a{
  color: #000000;
  text-decoration: none!important;
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
}
</style>