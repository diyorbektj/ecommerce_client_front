<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>


<script>
import axios from "axios";

export default {
  data(){
    return{
      guid: localStorage.getItem('guid')
    }
  },
  mounted() {
    if(!localStorage.getItem('guid')){
      axios.get('http://localhost:8000/api/generate-guid?guid=' + localStorage.getItem('guid')).then(response => {
        localStorage.setItem('guid', response.data.guid)
      }).catch(error => {
        console.log(error)
      })
    }
  },
}
</script>
