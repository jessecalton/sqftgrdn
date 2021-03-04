<template>
  <div class="garden">
    <div class="plant-container">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea plant-list"
        :list="list1"
        :group="{ name: 'people', pull: true, put: false }"

        @end="orderList"
      >
        <div
          class="plant-list--item"
          v-for="element in list1"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <div class="garden-grid">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group grid-wrapper"
        :list="list2"
        group="people"
        @add="addedItem"
      >
        <div
          class="list-group-item grid"
          v-for="element in list2"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>
<!-- 
    <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "draggableList",
  display: "DraggableList",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "Carrots", id: 1, image: "/assets/svg/carrots.svg" },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      list2: [
        { name: null, id: 1 },
        { name: null, id: 2 },
        { name: null, id: 3 },
        { name: null, id: 4 },
        { name: null, id: 5 },
        { name: null, id: 6 },
        { name: null, id: 7 }
      ],
      funString: "Hey gang"
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt.item.innerText);
    },
    orderList: function() {
      this.list2 = this.list2.sort((one, two) => {
        return one.order - two.order;
      })
    },
    addedItem: function(evt) {
      var newItem = JSON.parse(JSON.stringify(this.list2));
      this.$delete(newItem, evt.newIndex);
      
      // this.list2 = oldList.map((item, index) => {
      //   if (index === evt.newIndex) {
      //     console.log(index)
      //     item.order = evt.newIndex;
      //     item.name = evt.item.innerText;
      //   }
      //   return item
      // })
      console.log(newItem)
      return newItem
      this.funString = "help"
      this.$nextTick(() => console.log(this.funString))
      return 
    }
  },
  computed: {
  }
};
</script>
<style scoped lang="scss">

.garden {
  display: flex;
}
.grid-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  flex-wrap: wrap;
}

.grid {
  border: 1px solid black;
  width: 150px;
  height: 150px;
  margin: 10px;
}

.garden-grid {
  flex-basis: 75%;
}

.plant-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-basis: 25%;
  margin-left: 100px;
}

.plant-list {
  text-align: left;
  display: flex;
  flex-direction: column;

  &--item {
    margin: 12px 0;
  }
}
</style>