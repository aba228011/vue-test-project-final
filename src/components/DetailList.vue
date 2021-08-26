<template>

  <tr>
    <td>{{ id }}   {{ name }}</td>
    <td>{{ price }}</td>
    <td>{{ count }}</td>
    <td>{{ price * count }}</td>
    <td>
      <my-button
          @click="removeDetail(id)"
      >Удалить</my-button>

      <my-button @click="showDialog">Добавить</my-button>
    </td>
  </tr>


  <detail-list

      v-for="c in child"
      :key="c.id"

      :id="c.id"
      :name="c.name"
      :price="c.price"
      :count="c.count"
      :child="c.child"

  >
  </detail-list>


  <my-dialog v-model:show="dialogVisible">
    <add-detail
        v-model:show="dialogVisible"
        :id = "id"
        @createDetail = "createDetail"
    />
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/UI/MyDialog";
import {mapMutations} from "vuex";
import AddDetail from "@/components/AddDetail";
import MyButton from "@/components/UI/MyButton";

export default {
  name: 'detail-list',
  components: {MyButton, AddDetail, MyDialog},
  data() {
    return {
      dialogVisible: false
    }
  },
  props: ['id', 'name', 'price', 'count', 'child'],
  methods: {
    ...mapMutations({
      removeDetail: 'removeDetail'
    }),
    showDialog(){
      this.dialogVisible=true;
    },
    createDetail(newDetail, id) {
      this.$emit('createDetail', newDetail, id)
    }
  }

}
</script>

<style scoped>
</style>