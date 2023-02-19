<template>
  <Head>
    <Title>{{ category.name }}</Title>
    <Meta name="description" content="Товары по ценам, которые не найти в магазинах вашего города, доставка бесплатно!"/>
  </Head>
  <div class="pa-8" style="display: flex; justify-content: space-between;">
    <div style="font-size: 24px; font-weight: bold">{{ category.name }}</div>
    <v-btn color="success"><v-icon>mdi-filter</v-icon></v-btn>
  </div>
  <Products :products="products" />
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";
import Products from "../../components/products/Products";

export default {
  components: {Products},
  data: () => ({
    sheet: false,
    rating: 1,
    products: [],
    category: {}
  }),
  mounted() {
    const route = useRoute()
    axios.get(BASE_URL+`/api/product/category/`+route.params.id).then(response => {
      this.products = response.data.data
    }).catch(err => {
      console.log(err);
    });
    axios.get(BASE_URL+`/api/category/`+route.params.id).then(response => {
      this.category = response.data
    }).catch(err => {
      console.log(err);
    });
  }
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