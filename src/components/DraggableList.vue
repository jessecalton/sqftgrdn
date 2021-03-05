<template>
    <div>
        <h3 class="header">
            <strong>Drag and Drop Plants into your Garden </strong>
        </h3>

        <div class="garden">
            <div class="plant-container">
                <router-link to="/" class="nav-link"
                    >Restart Garden</router-link
                >
                <h3>Plants</h3>
                <draggable
                    class="dragArea plant-list"
                    :list="filteredNursery"
                    :group="{ name: 'plants', pull: 'clone', put: false }"
                    @end="orderList"
                >
                    <div
                        class="plant-list--item"
                        v-for="element in filteredNursery"
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
                    :list="garden"
                    group="plants"
                    @add="addedItem"
                >
                    <div
                        class="list-group-item grid"
                        v-for="(element, index) in garden"
                        :key="element.name"
                        :class="adjustFlexBasis"
                    >
                        <button
                            v-if="element.image"
                            v-on:click="deleteVeg(index)"
                            id="delete-veg"
                            class="delete-veg"
                        >
                            -
                        </button>
                        {{ element.name }}
                        <img v-if="element.image" :src="element.image" />
                    </div>
                </draggable>
                <div class="garden--info">
                    <span>Zip Code: {{ zip }}</span>
                    <span>Hardiness Zone: {{ hardiness }}</span>
                </div>
                <results />
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapMutations, mapState } from "vuex";

import Results from "./Results";
export default {
    name: "draggableList",
    display: "DraggableList",
    order: 2,
    components: {
        draggable,
        Results,
    },
    data() {
        return {};
    },
    methods: {
        ...mapMutations(["setGarden", "filterNursery"]),
        log: function(evt) {
            window.console.log(evt.item.innerText);
        },

        deleteVeg: function(index) {
            this.garden.splice(index, 1, {
                id: index,
                image: null,
                name: null,
            });
        },

        orderList: function(evt) {
            // console.log(evt)
        },

        addedItem: function(evt) {
            console.log(evt);
            // Edge case for placing an item in the last quadrant
            let garden = [...this.garden];
            if (evt.newIndex === 7) {
                for (var i = evt.newIndex; i > garden.length; i--) {
                    if (garden[i].name === null && evt.newIndex === 7) {
                        garden.splice(i, 1);
                        this.$store.commit("setGarden", garden);
                        break;
                    }
                }
                // Clear up empty list item adjacent to newly placed item.
            } else {
                for (var i = evt.newIndex; i < garden.length; i++) {
                    if (garden[i].name === null) {
                        garden.splice(i, 1);
                        this.$store.commit("setGarden", garden);
                        console.log(i);
                        break;
                    }
                }
            }
            // Clean up any overflow items
            this.garden.splice(this.height * this.width);
        },
        updateGarden: function(newHeight) {
            let height = newHeight;
            let width = this.width;
            let total = height * width;
            let garden = [];
            let i;
            for (i = 0; i < total; i++) {
                garden.push({ name: null, id: i, image: null });
            }
            this.setGarden(garden);
        },
    },
    computed: {
        ...mapState([
            "filteredNursery",
            "garden",
            "width",
            "height",
            "zip",
            "hardiness",
        ]),
        adjustFlexBasis() {
            if (this.height === 3) {
                return "height-3";
            } else {
                return "height-4";
            }
        },
    },
    watch: {
        height(newHeight) {
            this.updateGarden(newHeight);
        },
    },
    created: function() {
        this.updateGarden(this.height);
        this.filterNursery();
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
    overflow: hidden;
}

.grid,
.sortable-chosen.sortable-ghost {
    border: 2.5px dashed $green_01;
    border-radius: 10px;
    width: 70px;
    height: 70px;
    margin: 10px;
}

.garden-grid {
    flex-basis: 75%;
    max-width: 500px;
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

.header {
    padding-left: 480px;
}

.list-group-item {
    &.grid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
    }
    &.height-3 {
        flex-basis: 22%;
    }
    &.height-4 {
        flex-basis: 18%;
    }
}

.delete-veg {
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 10px;
    border-color: #e5653c;
    width: 20px;
    background-color: #f4f9fe;
    border-style: solid;

    &:focus {
        outline: none;
    }
}

img {
    .plant-list--item & {
        width: 40px;
        padding: 5px;
    }

    .list-group-item.grid & {
        width: 40px;
    }
}

.plant-list {
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: $eats-background;
    border-radius: 5px;
    padding: 0;
    overflow-y: scroll;
    height: 500px;

    &--text {
        margin-left: 20px;
    }

    &--item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 12px 0;
        padding: 0 26px;

        &:hover {
            background-color: white;
            border: 2px dotted $green_01;
            width: 70%;
            height: 46px;
        }

        &.sortable-chosen.sortable-ghost {
            border: 2.5px solid yellowgreen;
            width: 10%;
            flex-direction: column-reverse;
            justify-content: center;
            text-align: center;

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

.garden--info {
    margin: 1rem 0;
}
</style>
