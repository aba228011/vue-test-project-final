<template>
  <div>
    <div ref="divToPrint">
      <h2>Сведения о деталях автомобиля</h2>
      <table class="table">
        <thead>
        <tr>
          <th>Деталь</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Стоимость</th>
          <th>Действия (кнопки)</th>
        </tr>
        </thead>

        <tbody>
        <detail-list v-for="a in auto" :key="a.id"
                     :id="a.id"
                     :name="a.name"
                     :price="a.price"
                     :count="a.count"
                     :child="a.child"
        ></detail-list>
        </tbody>
      </table>
    </div>

    <div>
      <my-button
          @click="printDocument"
      >
        Export To PDF
      </my-button>
    </div>

  </div>
</template>

<script>
import DetailList from "@/components/DetailList";

import pdfMake from 'pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

import {mapState} from "vuex";
import MyButton from "@/components/UI/MyButton";

export default {
  name: 'App',
  components: {MyButton, DetailList},
  computed: {
    ...mapState({
      auto: state => state.auto
    })
  },
  methods: {
    printDocument() {

      const pdfTable = this.$refs.divToPrint;
      // console.log(pdfTable)

      const html = htmlToPdfmake(pdfTable.innerHTML);
      console.log(html)
      html[1].table.body.forEach(el=>{
        el.pop();
      })

      const documentDefinition = {content: html};
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      // console.log(pdfMake)

      pdfMake.createPdf(documentDefinition).download('Car-Details-Table');

    }
  }

}
</script>

<style>
*{
  font-family: 'Roboto',sans-serif;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.table td {
  text-align: center;
  border: 1px solid #dddddd;
  padding: 5px;
}
</style>
