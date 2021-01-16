<template>
    <div>
        <b-button @click="modalShow = !modalShow" variant="primary"><i class="far fa-edit"></i></b-button>
        <b-modal
        v-model="modalShow"
        title="Edit Product"
        @show="showModal"
        @hidden="resetModal"
        @ok="handleOk">
        <ValidationObserver ref="form">
        <b-form @submit.prevent="addProduct">
                <ValidationProvider name="name" rules="required" v-slot="{errors}">
                <b-form-group label="Name">
                <b-form-input type="text" id="name" v-model="form.name" trim></b-form-input>
                <div  class="error-message">{{ errors[0] }}</div>
                </b-form-group>
                </ValidationProvider>
                <ValidationProvider name="price" rules="required|numeric" v-slot="{errors}">
                <b-form-group label="Price">
                <b-form-input id="price"  type="text" v-model="form.price" trim></b-form-input>
                <div  class="error-message">{{ errors[0] }}</div>
                </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                name="brand"
                rules="required|alpha"
                v-slot="{ errors }"
              >
                <b-form-group label="Brand">
                <b-form-input  id="brand" type="text" v-model="form.brand" trim></b-form-input>
                <div  class="error-message">{{ errors[0]}}</div>
                </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                name="inventoryStatus"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-group label="Inventory?">
                <b-form-radio   value="true" v-model="form.inventoryStatus">In Stock</b-form-radio>
                <b-form-radio   value="false" v-model="form.inventoryStatus">Out Of Stock</b-form-radio>
                <div  class="error-message">{{ errors[0] }}</div>
                </b-form-group>
                </ValidationProvider>

    
            </b-form>
        </ValidationObserver>
      </b-modal>
    </div>
</template>
<script>
export default {
    name:"updateProduct",
    props:['product'],
    data(){
        return{
            modalShow:false,
             form:{
                name:'',
                price:'',
                brand:'',
                inventoryStatus:''
            },
          
        }
    },
    methods:{
        showModal(){
            console.log('model opened');
            this.form = {
                name:this.$props.product.name,
                price: this.$props.product.price.split('$')[1],
                brand: this.$props.product.brand,
                inventoryStatus: this.$props.product.inventoryStatus.toString()
            }
        }, 

        resetModal(){
            console.log('modal closed')
            this.form = {};
        },
        async handleOk(bvModalEvt){
            console.log('submmited');
            bvModalEvt.preventDefault();
            let result = await this.$refs.form.validate();
            console.log ('result', result);
            if(result){
                this.$store.dispatch('editProduct' , {
                    name:this.form.name,
                    price: '$' + this.form.price,
                    brand: this.form.brand,
                    inventoryStatus :this.form.inventoryStatus === 'true',
                    id: this.$props.product.id
                });
                this.modalShow = false;
                this.$nextTick(() => {
                 this.$refs.form.reset();
                });
            }
            this.$store.dispatch('setProduct');
        }
    }
}
</script>
<style>

</style>