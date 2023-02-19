<template>
  <Head>
    <Title>Seb.tj Покупки на каждый день или просто так</Title>
    <Meta name="description" content="Товары по ценам, которые не найти в магазинах вашего города, доставка бесплатно!"/>
  </Head>
    <Products :products="products"></Products>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../constants";
import Products from "../components/products/Products";

export default {
  name: "index",
  components: {Products},
  data()
  {
    return {
      show: false,
      rating: 2,
      products: []
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/product`).then(response => {
      this.products = response.data.data
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