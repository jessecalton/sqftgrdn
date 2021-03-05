<template>
<div> 
    <h3  class = "header"> <strong>Drag and Drop Plants into your Garden </strong> </h3>
    
    <div class="garden">
        <div class="plant-container">
            <router-link to="/" class="nav-link">Restart Garden</router-link>
            <h3>Plants</h3>
            <draggable
                class="dragArea plant-list"
                :list="nursery"
                :group="{ name: 'plants', pull: 'clone', put: false }"
                @end="orderList"
            >
                <div
                    class="plant-list--item"
                    v-for="element in nursery"
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
                    v-for="element in garden"
                    :key="element.name"
                >
                    {{ element.name }}
                    <img v-if="element.image" :src="element.image" />
                </div>
            </draggable>
            <div> Zip Code: {{zip}}</div> 
            <div> Hardiness Zone: {{hardiness}}</div>
        </div>
    </div>

    <results /> 
    </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapMutations, mapState } from 'vuex';

import Results from './Results';
export default {
    name: "draggableList",
    display: "DraggableList",
    order: 2,
    components: {
        draggable,
        Results,
    },
    data() {
        return {
            
        };
    },
    methods: {
        ...mapMutations([
            'setGarden'
        ]),
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
                for (var i = evt.newIndex; i > this.garden.length; i--) {
                    if (this.garden[i].name === null && evt.newIndex === 7) {
                        this.garden.splice(i, 1);
                        break;
                    }
                }
                // Clear up empty list item adjacent to newly placed item.
            } else {
                for (var i = evt.newIndex; i < this.garden.length; i++) {
                    if (this.garden[i].name === null) {
                        this.garden.splice(i, 1);
                        console.log(i);
                        break;
                    }
                }
            }
            // Clean up any overflow items
            this.garden.splice(8);
        },
        updateGarden: function(newHeight) {
            let height = newHeight;
            let width = this.width;
            let total = height * width;
            let garden = []
            let i;
            for (i = 0; i < total; i++ ) {
                garden.push({name: null, id: i, image: null})
            }
            this.setGarden(garden);
        }
    },
    computed: {
        ...mapState([
                "nursery",
                "garden",
                "width",
                "height",
                "zip",
                "hardiness"
            ]),
    },
    watch: {
        height (newHeight) {
            this.updateGarden(newHeight);
        }
    },
    created: function() {
        this.updateGarden(this.height)
    }
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

.header {
    padding-left:130px;
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
