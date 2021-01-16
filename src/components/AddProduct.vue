<template>
<ValidationObserver  ref="form">
  <b-col  class="m-3">
    <b-card header="Add Product">
        <b-form @submit.prevent="addProduct">
                <ValidationProvider name="name" rules="required" v-slot="{errors}">
                    <b-form-group
                        label="Product Name:">
                        <b-form-input
                        id="name"    
                        v-model="form.name"
                        type="text"
                        trim>
                        </b-form-input>
                    <span class="error-message">{{ errors[0] }}</span>
                    </b-form-group>
                </ValidationProvider>

                <ValidationProvider name="brand" rules="required" v-slot="{ errors }">
                    <b-form-group  label="Brand:" >
                        <b-form-input
                        id="brand"
                        v-model="form.brand"
                        type="text"
                        trim>
                        </b-form-input>
                    <span class="error-message">{{ errors[0] }}</span>
                    </b-form-group>
                </ValidationProvider>

                <ValidationProvider name="price" rules="required|numeric" v-slot="{ errors }">
                    <b-form-group label="Price:">
                        <b-form-input
                        id="price"
                        v-model="form.price"
                        type="text"
                        trim>
                        </b-form-input>
                    <span class="error-message">{{ errors[0] }}</span>
                    </b-form-group>
                </ValidationProvider>

                <ValidationProvider name="inventoryStatus" rules="required" v-slot="{ errors }">
                    <b-form-group label="Inventory Status?" >
                    <b-form-radio name="inventoryStatus" value="true" v-model="form.inventoryStatus">In Stock
                    </b-form-radio>
                    <b-form-radio name ="inventoryStatus" value="false" v-model="form.inventoryStatus">Out Of Stock>
                    </b-form-radio>
                    <span class="error-message">{{ errors[0] }}</span>
                    </b-form-group>
                    </ValidationProvider>
            </b-form>
        <b-button variant="primary" class="mr-2" @click="addProduct">Add Product</b-button>
        <b-button type="reset" variant="danger" @click="resetEntery">Reset</b-button>
    </b-card>
</b-col>
</ValidationObserver>
</template>

<script>
export default {
data : () => ({
    form :{
        name : "",
        brand: "",
        price:"",
        inventoryStatus:""
    }
}),
  methods: {
     async addProduct() { 
        let result = await this.$refs.form.validate();
        if(result){
            console.log("product" , this.form);
            this.$store.dispatch("addProduct" , {
                name:this.form.name,
                brand: this.form.brand,
                price:"$" + this.form.price,
                inventoryStatus: this.form.inventoryStatus === "true",
            });
            this.form ={
                name:"",
                brand:"",
                price:"",
                inventoryStatus:""
            };
            this.$nextTick(() => {
                this.$refs.form.reset();
            });
            
        }},
        resetEntery(){
        this.form={
            name:"",
            brand:"",
            price:"",
            inventoryStatus:""
        }
        this.$nextTick(() => {
                this.$refs.form.reset();
            });
    }
  }
};
</script>
<style>
.error-message{
    color:red;
}
</style>