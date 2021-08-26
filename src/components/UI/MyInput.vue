<template>
  <input class="input"
         :value="modelValue" @input="updateInput">
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number]
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 10px;
  padding: 10px 15px;
  color: teal;
  background: none;
  border: 2px solid darkcyan;
}
</style>