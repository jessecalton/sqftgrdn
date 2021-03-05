<template>
    <div class="garden">
        <div class="plant-container">
            <h3>Plants</h3>
            <draggable
                class="dragArea plant-list"
                :list="list1"
                :group="{ name: 'plants', pull: 'clone', put: false }"
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
            <h3>Garden</h3>
            <draggable
                class="dragArea list-group grid-wrapper"
                :list="list2"
                group="plants"
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
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    name: "draggableList",
    display: "DraggableList",
    order: 2,
    components: {
        draggable,
    },
    data() {
        return {
            list1: [
                { name: "Carrots", id: 1, image: "/assets/svg/carrots.svg" },
                { name: "Lettuce", id: 2 },
                { name: "Kale", id: 3 },
                { name: "Chard", id: 4 },
                { name: "Avocado", id: 5 },
                { name: "Tomato", id: 6 },
                { name: "OG Kush", id: 7 },
            ],
            list2: [
                { name: null, id: 1 },
                { name: null, id: 2 },
                { name: null, id: 3 },
                { name: null, id: 4 },
                { name: null, id: 5 },
                { name: null, id: 6 },
                { name: null, id: 7 },
                { name: null, id: 8 },
            ],
        };
    },
    methods: {
        log: function(evt) {
            window.console.log(evt.item.innerText);
        },

        orderList: function(evt) {
            // console.log(evt)
        },

        addedItem: function(evt) {
            console.log(evt);
            // Edge case for placing an item in the last quadrant
            if (evt.newIndex === 7) {
                for (var i = evt.newIndex; i > this.list2.length; i--) {
                    if (this.list2[i].name === null && evt.newIndex === 7) {
                        this.list2.splice(i, 1);
                        break;
                    }
                }
                // Clear up empty list item adjacent to newly placed item.
            } else {
                for (var i = evt.newIndex; i < this.list2.length; i++) {
                    if (this.list2[i].name === null) {
                        this.list2.splice(i, 1);
                        console.log(i);
                        break;
                    }
                }
            }
            // Clean up any overflow items
            this.list2.splice(8);
        },
    },
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
    height: 344px;
    overflow: hidden;
}

.grid,
.sortable-chosen.sortable-ghost {
    border: 1px solid black;
    width: 150px;
    height: 150px;
    margin: 10px;
}

.plant-list--item.sortable-chosen.sortable-ghost {
    border: 3px solid yellowgreen;
    & + .list-group-item {
        display: none;
    }
}

.garden-grid {
    flex-basis: 75%;
    max-width: 800px;
}

.plant-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-basis: 25%;
    margin-left: 100px;
}

.highlight {
    border: 3px solid yellowgreen;
}

.list-group-item {
    flex-basis: 20%;
}

.plant-list {
    text-align: left;
    display: flex;
    flex-direction: column;

    &--item {
        margin: 12px 0;
        &.sortable-chosen.sortable-ghost {
            border: 3px solid yellowgreen;
            & + .list-group-item {
                visibility: collapse;
            }
        }
    }
}
</style>
