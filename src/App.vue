<script setup>
  import {ref, reactive, computed, watch} from 'vue'
  import Header from './components/Header.vue'
  import Button from './components/Button.vue';
  import { calcularTotalPagar} from './helpers';
  /*
  export default {
    components: {
      Header
    }
  }*/
  const cantidad = ref(500000);

  //console.log(cantidad.value);
  
  const state = reactive({cantidad:500000})
  //console.log(state.cantidad)


  const meses = ref(6);
  const total = ref(0);
  

  const MIN = 100000;
  const MAX = 1000000;
  const STEP = 50000;

  watch([cantidad, meses], ()=>{
    total.value= calcularTotalPagar(cantidad.value, meses.value);
  }, {inmediate:true})

  const pagoMensual = computed(()=>{
    return total.value / meses.value; 
  })
  const formatearDinero =(valor) => {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    });

    return formatter.format(valor);
  }



  const handleChangeDecremento = (texto)=> {
    const valor = cantidad.value - STEP;
    if(valor < MIN) {
      return;
    }
    cantidad.value = valor; 
    //console.log(texto)
  }

  const handleChangeIncremento = (texto )=> {
    const valor = cantidad.value + STEP;
    if(valor > MAX){
      return;
    }
    cantidad.value = valor
    //console.log(texto)
  }

  
</script>

<template>
 <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
  <Header/>
  <div class="flex justify-between mt-10">
    <Button
      :operador="'-'"
      @fn="handleChangeDecremento"
    />
    <Button
      :operador="'+'"
      @fn="handleChangeIncremento"
    />
  </div>
  <div class="my-5">
    <input 
      type="range" 
      class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
      :min="MIN"
      :max="MAX"
      :step="STEP"
      v-model="cantidad"
    />
    <p class="text-center my-10 text-5xl font-extrabold text-indigo-600"> {{formatearDinero(cantidad)}}</p>
    <!-- <p v-text="`$${cantidad}`"></p> -->
    <h2 class="text-2xl font-extrabold text-gray-500 text-center">
      Elige un <span class="text-indigo-600">Plazo</span>
      a pagar
    </h2>
    <select
      class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
      v-model="meses"
    >
      <option value="6">6 Meses</option>
      <option value="12">12 Meses</option>
      <option value="24">24 Meses</option>
    </select>
  </div> 

  <div v-if="total > 0" class="my-5 space-y-3 bg-gray-50 p-5 ">
    <h2 class="text-2xl font-extrabold text-graay-500 text-center">
      Resumen <span class="text-indigo-600"> de pagos</span>
    </h2>
    <p class="text-xl text-gray-500 text-center font-bold">{{meses}} Meses</p>
    <p class="text-xl text-gray-500 text-center font-bold">Total a pagar: {{ formatearDinero(total) }} </p>
    <p class="text-xl text-gray-500 text-center font-bold">Mensuales: {{formatearDinero (pagoMensual)}}</p>
  </div>
  <p v-else class="text-center">Añade una cantidad y plazo a pagar</p>
 </div>
</template>

