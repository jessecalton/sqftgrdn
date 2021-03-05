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
                    <img v-if="element.image" :src="element.image" />
                    <span class="plant-list--text">
                        {{ element.name }}
                    </span>
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
                    <img v-if="element.image" :src="element.image" />
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
                {
                    name: "Asparagus",
                    id: 1,
                    image: require("../assets/svg/asparagus.svg"),
                },
                {
                    name: "Broccoli",
                    id: 2,
                    image: require("../assets/svg/broccoli.svg"),
                },
                {
                    name: "Cabbage",
                    id: 3,
                    image: require("../assets/svg/cabbage.svg"),
                },
                {
                    name: "Cucumber",
                    id: 4,
                    image: require("../assets/svg/cucumber.svg"),
                },
                {
                    name: "Eggplant",
                    id: 5,
                    image: require("../assets/svg/eggplant.svg"),
                },
                {
                    name: "Onion",
                    id: 6,
                    image: require("../assets/svg/onion.svg"),
                },
                {
                    name: "Squash",
                    id: 7,
                    image: require("../assets/svg/squash.svg"),
                },
                {
                    name: "Tomato",
                    id: 7,
                    image: require("../assets/svg/tomato.svg"),
                },
            ],
            list2: [
                { name: null, id: 1, image: null },
                { name: null, id: 2, image: null },
                { name: null, id: 3, image: null },
                { name: null, id: 4, image: null },
                { name: null, id: 5, image: null },
                { name: null, id: 6, image: null },
                { name: null, id: 7, image: null },
                { name: null, id: 8, image: null },
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
$eats-background: #f4f9fe;
$green_01: #00727a;

.garden {
    display: flex;
}
.grid-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: $eats-background;
    border-radius: 5px;
    height: 360px;
    overflow: hidden;
}

.grid,
.sortable-chosen.sortable-ghost {
    border: 4px dashed $green_01;
    border-radius: 10px;
    width: 150px;
    height: 150px;
    margin: 10px;
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
    &.grid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
}

img {
    .plant-list--item & {
        width: 40px;
        background-color: white;
        padding: 5px;
    }

    .list-group-item.grid & {
        width: 80px;
    }
}

.plant-list {
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: $eats-background;
    border-radius: 5px;
    padding: 0 20px;
    overflow-y: scroll;
    height: 500px;

    &--text {
        margin-left: 20px;
    }

    &--item {
        margin: 12px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &.sortable-chosen.sortable-ghost {
            border: 3px solid yellowgreen;
            & + .list-group-item {
                display: none;
            }
        }
    }
}

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: $green_01;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
</style>
