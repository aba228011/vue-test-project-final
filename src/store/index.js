import {createStore} from 'vuex'


class Detail {
  constructor(id, name, price, count, child = []) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
    this.child = child;
  }

  get price() {
    if (this.child && this.child.length > 0) {
      let sum = 0;
      this.child.forEach(el => {
        sum += el.price;
      })
      this._price = sum;
      return this._price;
    } else {
      return this._price;
    }
  }

  set price(value) {
    if (this.child && this.child.length > 0) {
      return;
    }
    this._price = value;
  }
}


export default createStore({
  state: {
    auto: [
      new Detail('1', "Кузов", false, 1,
          [
            new Detail('1.1', "Двери", false, 3,
                [
                  new Detail('1.1.1', "Замок", 5000, 4),
                  new Detail('1.1.2', "Ручки", 6000, 6)
                ]
            )
          ]
      ),
      new Detail('2', "Двигатель", false, 1,
          [
            new Detail('2.1', "Поршни", 10000, 5),
            new Detail('2.2', "Кольца", 2000, 3)
          ]
      )
    ],
    addDetailName: "",
    addDetailPrice: 0,
    addDetailCount: 0
  },
  mutations: {
    setAddDetailName(state, addDetailName){
      state.addDetailName = addDetailName;
    },
    setAddDetailPrice(state, addDetailPrice){
      state.addDetailPrice = Number(addDetailPrice);
    },
    setAddDetailCount(state, addDetailCount){
      state.addDetailCount = Number(addDetailCount);
    },
    addDetail(state, newDetail) {

      function preAddDetail(arr, detailParam) {

        let newDetail = new Detail(detailParam.id, detailParam.name, detailParam.price, detailParam.count)
        return arr.map(
            el => {
              if (el.id === newDetail.id) {

                if (el.child && el.child.length > 0) {
                  // console.log("RESULT")
                  newDetail.id = `${newDetail.id}.${el.child.length + 1}`
                  el.child.push(newDetail);
                  return el;
                } else {
                  el.child = [];
                  // console.log("RESULT   2")
                  newDetail.id = `${newDetail.id}.1`
                  el.child.push(newDetail);
                  return el;
                }
              } else {
                if (el.child && el.child.length > 0) {
                  // console.log("Failed")
                  el.child = preAddDetail(el.child, newDetail);
                  return el;
                } else {
                  // console.log("ELSE")
                  return el
                }
              }
            }
        )

      }

      state.auto = preAddDetail(state.auto, newDetail)
    },
    removeDetail(state, child_id) {


      function preRemoveDetail(arr, child_id) {

        if (child_id.length === 1) {
          return arr.filter(
              el => {
                return el.id !== child_id
              }
          )

        }
        let parent_id = child_id.substring(0, child_id.length - 2);

        // console.log(parent_id)

        return arr.map(
            el => {
              if (el.id === parent_id) {
                // console.log("FINISH")
                el.child = el.child.filter(e => {
                  return e.id !== child_id;
                });
                return el
              } else {
                if (el.child && el.child.length > 0) {
                  el.child = preRemoveDetail(el.child, child_id);
                  return el;
                } else {
                  return el;
                }
              }
            }
        )

      }

      state.auto = preRemoveDetail(state.auto, child_id)
      // console.log(state.auto)
    }
  },
  actions: {},
  modules: {}
})
