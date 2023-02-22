<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>


<script>
import axios from "axios";
import {BASE_URL} from "./constants";

export default {
  data(){
    return{
      guid: localStorage.getItem('guid')
    }
  },
  mounted() {
    if(!localStorage.getItem('guid')){
      axios.get(BASE_URL+'/api/generate-guid?guid=' + localStorage.getItem('guid')).then(response => {
        localStorage.setItem('guid', response.data.guid)
      }).catch(error => {
        console.log(error)
      })
    }
  },
}
</script>
