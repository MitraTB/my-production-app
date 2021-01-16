<template>
  <b-container>
    <b-row class="justify-content-center">
      <AddProduct/>
    </b-row>
  </b-container>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue'
export default {
  name: 'Home',
  components: {
   AddProduct
  }
}
</script>
