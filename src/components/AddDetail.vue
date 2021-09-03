<template>
  <form @submit.prevent>
    <h4>Добавить деталь</h4>
    <label class="form-input">
      Деталь:
      <my-input
          :model-value="addDetailName"
          @update:model-value="setAddDetailName"
          name="name"
          placeholder="Name"
          type="text"

          ref="focusInput"
      />
    </label>

    <label class="form-input">
      Цена:
      <my-input
          :model-value="addDetailPrice"
          @update:model-value="setAddDetailPrice"
          name="price"
          placeholder="Price"
          type="number"
      />
    </label>

    <label class="form-input">
      Количество:
      <my-input
          :model-value="addDetailCount"
          @update:model-value="setAddDetailCount"
          name="count"
          placeholder="Count"
          type="number"
      />
    </label>


    <my-button
        class="btn"
        @click="createDetail"
        style="align-self: flex-end; margin-top: 10px"
    >
      Добавить
    </my-button>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import {mapMutations, mapState} from "vuex";
import MyButton from "@/components/UI/MyButton";

export default {
  name: 'add-detail',
  components: {MyButton, MyInput},
  props: {
    id: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      setAddDetailName: 'setAddDetailName',
      setAddDetailPrice: 'setAddDetailPrice',
      setAddDetailCount: 'setAddDetailCount',
      addDetail: 'addDetail'
    }),
    createDetail() {
      this.addDetail({id: this.$props.id, name: this.addDetailName, price: this.addDetailPrice, count: this.addDetailCount})

      this.$emit('update:show', false)
      this.setAddDetailName("");
      this.setAddDetailPrice(0);
      this.setAddDetailCount(0);
    }
  },
  computed:{
    ...mapState({
      addDetailName: state => state.addDetailName,
      addDetailPrice: state => state.addDetailPrice,
      addDetailCount: state => state.addDetailCount,
    })
  },
  mounted() {
    // console.log(this.$refs.focusInput.$el)
    this.$refs.focusInput.$el.focus();
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-input{
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>