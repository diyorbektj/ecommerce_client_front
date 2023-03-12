<template>
  <Head>
    <Title>Seb.tj Покупки на каждый день или просто так</Title>
    <Meta name="description" content="Товары по ценам, которые не найти в магазинах вашего города, доставка бесплатно!"/>
  </Head>
  <div v-if="is_loading" class="skeleton skeleton-img" style="height: 200px; width: 100%"></div>
  <swiper v-else
      :auto-height="true"
      :centeredSlides="true"
      :autoplay='{
        "delay": 4500,
        "disableOnInteraction": false
      }'
      :space-between="60"
      :cssMode="true"
      :navigation="true"
      :mousewheel="true"
      :keyboard="true"
      :modules="modules"
      class="mySwiper"
  >
    <swiper-slide class="img-slider" v-for="image in images"><img style="border-radius: 15px" :src="image"></swiper-slide>
      </swiper>
    <ProductsSkeletion v-if="is_loading"></ProductsSkeletion>
    <Products v-else :products="products"></Products>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../constants";
import Products from "../components/products/Products";
import ProductsSkeletion from "../components/products/ProductSkeleton";
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';


import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';


export default {
  name: "index",
  components: {
    Products,
    Swiper,
    SwiperSlide,
    ProductsSkeletion
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Mousewheel, Keyboard, Autoplay],
    };
  },
  data()
  {
    return {
      show: false,
      rating: 2,
      products: [],
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      is_loading: true,
      images: []
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/product`).then(response => {
      this.products = response.data.data
      this.images = [
          "https://images.uzum.uz/cfqovovhj8j9g69850t0/main_page_banner.jpg",
          "https://images.uzum.uz/cfrnt27hgiov1qics20g/main_page_banner.jpg",
          "https://images.uzum.uz/cfu7a27hgiov1qid4r7g/main_page_banner.jpg",
          "https://images.uzum.uz/cfrnvbng49devoa90aag/main_page_banner.jpg"
      ]
      this.is_loading = false
    }).catch(err => {
      console.log(err);
    });
  }

}
</script>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  background-color: white;
  background-color: rgba(255, 255, 255, 0.5);
  right:10px;
  padding: 30px;
  color: #000 !important;
  fill: black !important;
  stroke: black !important;
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: flex;
  width: 100%;
  height: 100%;
  /*object-fit: cover;*/
}
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
.img-slider{
  width: 949px;
  height: 300px;
  margin-left: 5px;
  margin-right: 5px;
}
@media (max-width: 410px) {
  .img-slider{
    width: 290px;
    height: 200px;
    margin-left: 5px;
    margin-right: 5px;
  }
}
@media (min-width: 410px) and  (max-width: 820px) {
  .img-slider{
    width: 410px;
    height: 200px;
    margin-left: 5px;
    margin-right: 5px;
  }
}

/* iPads (portrait and landscape)  */
@media (min-width: 820px){
  .img-slider{
    width: 949px;
    height: 360px
  }
}
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-text {
  height: 0.8rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-img {
  width: 100%;
  height: 100px;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-text__body {
  width: 75%;
}

.skeleton-footer {
  width: 30%;
}
</style>