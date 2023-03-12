<template>
  <div class="wrapper">
    <v-card style="padding-bottom: 15px; border-radius: 10px" v-for="item in products">
      <NuxtLink :to="'/products/'+item.id">
        <v-col>
          <div style="display: flex; justify-content: center">
            <img style="border-radius: 5px; max-width: 100%" height="170" :src="item.image" alt="">
          </div>
          <p style="font-size: 20px">{{item.price}} сомони</p>
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
          <p style="font-size: 14px">{{ item.name.substring(0, 80) }}<span v-if="item.name.length >=80">...</span></p>
        </v-col>
      </NuxtLink>
    </v-card>
  </div>
  <div style="margin-top: 30px"></div>
</template>
<script>
export default{
  props: {
    products: []
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