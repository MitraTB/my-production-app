<template>
    <div>
        <b-container>
            <b-row class="m-3">
        <ListProduct/>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import ListProduct from '@/components/ListProduct.vue';
export default {
    components:{
        ListProduct
    }
}
</script>