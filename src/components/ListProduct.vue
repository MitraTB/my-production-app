<template>
   <b-col md-4> 
  <b-card
    header="Product List"
    tag="article"
    style="max-width: 100%;"
    class="m-2"
  >
    <b-card-text>
        <b-card-group deck>
      <b-card
      style="min-width:30%; max-width:30%"
      class="mt-3"
      :border-variant="product.inventoryStatus?'success':'danger'"
      v-for="product in products"
      :key="product.id"
      >
      <b-card-text
      class="text-center">
          <b-badge :variant="product.inventoryStatus?'success':'danger'">{{product.inventoryStatus?'In Stock':'Out Of Stock'}}</b-badge>
          <p class="mt-3"><strong>Name:</strong>{{ product.name}}</p>
          <p><strong>Brand:</strong>{{ product.brand}}</p>
          <p><strong>Price:</strong>{{ product.price}}</p>
          <hr>
          <b-row>
              <b-col>
                  <b-button @click="deleteProduct(product.id)" variant="danger"><i class="fas fa-trash"></i></b-button>
              </b-col>
              <b-col>
                  <EditProduct :product="product"/>
              </b-col>
          </b-row>
      </b-card-text>
      </b-card>
        </b-card-group>
    </b-card-text>
    <h1 v-if="products.length<1">there is no product</h1>
  </b-card>
   </b-col>
</template>
<script>
import EditProduct from '@/components/EditProduct.vue';
//import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default {
    components:{
        EditProduct
    },
    methods:{
        deleteProduct(productId){
          this.$store.dispatch('deleteProduct' , productId)  
        }
    },
    computed:{
        // ...mapstate({
        //     testList:'products'
        // })
        //...mapState(['products'])
        // products(){
        //     console.log('state' , this.$store.state.products );
        //     return this.$store.state.products;
        // }
        // products(){
        //     console.log('getters' , this.$store.getters.products)
        //     return this.$store.getters.products;
        // }
        ...mapGetters(['products'])
    },
   mounted(){
       this.$store.dispatch('setProduct');
   }   
};
</script>