<template>
    <div class="setup">
        <div class="setup--body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada purus neque, lobortis. <a href="#">Learn more about this tool.</a>
        </div>
        <ol class="setup--list">
            <li class="setup--list-item">
                <span class="setup--heading">Select a Garden Size</span>
                <div class="setup--size-container">
                    <div class="setup--size-option">
                        <input class="setup--size-input" type="radio" id="2x4" name="size" value="2x4" v-model="size" @change="updateSize" >
                        <label class="setup--size-label" for="2x4">2 x 4</label><br>
                    </div>
                    <div class="setup--size-option">
                        <input class="setup--size-input" type="radio" id="3x5" name="size" value="3x5" v-model="size" @change="updateSize">
                        <label class="setup--size-label" for="3x5">3 x 5</label><br>
                    </div>
                    <div class="setup--size-option">
                        <input class="setup--size-input" type="radio" id="4x8" name="size" value="4x8" v-model="size" @change="updateSize">
                        <label class="setup--size-label" for="4x8">4 x 8</label> 
                    </div>
                    <div class="setup--size-option">
                        <label class="setup--size-label" for="custom">Custom</label>
                    </div>
                </div>
            </li>
            <li class="setup--list-item">
                <span class="setup--heading">Enter your zip code to determine your Hardiness Zone (optional)</span>
                <input class="setup--zip" name="zip" type="text" v-model="zip" @keypress="isNumber">
            </li>
        </ol>
        <button class="setup--button btn" :disabled="isDisabled">Start Planning</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: "Setup",
    data: function() {
        return {
            size: null,
            zip: null
        }
    },
    methods: {
        ...mapMutations([
            'setWidth',
            'setHeight',
            'setZip',
            'setHardiness'
        ]),
        updateSize: function() {
            console.log("changing size:", this.width, this.height )
            this.setWidth(this.width);
            this.setHeight(this.height);
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }
    },
    computed: {
        sizeArr: function() {
            return this.size !== null ? this.size.split('x') : null;
        },
        width: function() {
            const width = this.size!== null ? parseInt(this.sizeArr[1]): null;
            return width;
        },
        height: function() {
            const height = this.size!== null ? parseInt(this.sizeArr[0]) : null;
            return height;
        },
        zipInt: function() {
            return parseInt(this.zip);
        },
        isDisabled: function() {
            return this.size === null;
        }
    }
}
</script>

<style lang="scss">

    .setup--body {
        width: 580px;
        margin: auto;
    }

    .setup--size-container {
        display: flex;

    }

    .setup--size-option {
        flex-grow: 1;
    }

    .setup--button {
    }
</style>
