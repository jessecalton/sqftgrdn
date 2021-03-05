<template>
    <div class="setup">
        <div class="setup--body">
            Welcome to the Spruce’s Virtual Square Foot Garden Planner! We’re here to help you build your dream garden. We have a curated library of plants that you can use to create your personalized garden plan. Follow the instructions below to get started!
        </div>
        <ol class="setup--list">
            <li class="setup--list-item">
                <span class="setup--heading">Select a Garden Size</span>
                <div class="setup--size-container">
                    <div class="setup--size-option">
                        <input 
                            class="setup--size-input" 
                            type="radio" 
                            id="4x4" 
                            name="size" 
                            value="4x4" 
                            v-model="size" 
                            @change="updateSize" >
                        <label class="setup--size-label four-by-four" for="4x4">
                            <div class="setup--label__dimensions">4ft x 4ft</div>
                        </label>
                    </div>
                    <div class="setup--size-option">
                        <input 
                            class="setup--size-input" 
                            type="radio" 
                            id="3x8" 
                            name="size" 
                            value="3x8" 
                            v-model="size" 
                            @change="updateSize">
                        <label class="setup--size-label three-by-five" for="3x5">
                            <div class="setup--label__dimensions">3ft x 8ft</div>
                        </label>
                    </div>
                    <div class="setup--size-option">
                        <input 
                            class="setup--size-input" 
                            type="radio" 
                            id="3x2" 
                            name="size" 
                            value="3x2" 
                            v-model="size" 
                            @change="updateSize">
                        <label class="setup--size-label three-by-two" for="3x2">
                            <div class="setup--label__dimensions">3ft x 2ft</div>
                        </label>
                    </div>
                    <div class="setup--size-option">
                        <input 
                            class="setup--size-input" 
                            type="radio" 
                            id="custom" 
                            name="size" 
                            value="custom" 
                            disabled>
                        <label class="setup--size-label custom" for="custom">
                            <div class="setup--label__option">Custom</div>
                            <div class="setup--label__dimensions">(Coming soon!)</div>
                        </label>
                    </div>
                </div>
            </li>
            <li class="setup--list-item">
                <span class="setup--heading">Enter your zip code to determine your <a href = "https://www.thespruce.com/find-your-usda-zone-3269819" target = _blank >Hardiness Zone</a> (optional) <img src = '../assets/info.png' class ="img-icon setup__tooltip" title = "Your hardiness zone will determine which plants are suitable for your climate."></span> 
                
                <input 
                    class="setup--zip" 
                    name="zip" 
                    type="text" 
                    placeholder="Zip Code"
                    v-model="zip" 
                    @keypress="isNumber"
                    @blur="handleBlurZip">
            </li>
        </ol>
        <button 
            class="setup--button btn" 
            :disabled="isDisabled"
            @click.prevent="clickStart">
            <router-link to="/draggable" class="nav-link">Start Planning</router-link>
        </button>
         
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

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
        ...mapActions([
            'getHardiness'
        ]),
        clickStart: function() {

        },
        handleBlurZip: function() {
            const zip = this.zip;
            this.setZip(zip);
            this.getHardiness();
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        updateSize: function() {
            this.setWidth(this.width);
            this.setHeight(this.height);
        },
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

@import '../css/_variables.scss';

    .setup--body {
        width: 560px;
        margin: 0 auto 2rem;
        line-height: 1.5rem;
    }

    .setup--size-container {
        display: flex;

    }

    .setup--size-option {
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }

    .setup--size-label {
        background: $color-gray-07;
        display: block;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: .5rem;
        font-size: 0.875rem;
    }

    .setup--size-input:checked+.setup--size-label {
        background: $color-brand-aqua;
    }

    .setup--list-item {
        margin-bottom: 1rem;
        padding-left: 1rem;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: -1.75rem;
            top: -0.375rem;
            height: 2.125rem;
            width: 2.125rem;
            background-color: #F2FBFA;
            border-radius: 1rem;
            z-index: -1;
        }
    }

    .setup--heading {
        margin-bottom: 1rem;
        display: block;
    }

    .four-by-four, .custom {
        width: 104px;
        height: 104px;
    }

    .three-by-five {
        width: 152px;
        height: 104px;
    }

    .three-by-two {
        width: 79px;
        height: 104px;
    }
    
     .img-icon {
        width: 15px;
        height: 15px;
        padding-left:3px;
        top: 5px;
    }
    .setup--zip {
        display: block;
        padding: .5rem;
        font-size: 1rem;
        font-family: Karla, sans-serif;
    }

    .setup--tooltip {
        display: inline;
    }

    .setup--button {
        display: block;
        margin: auto;
    }

    .nav-link {
        &::before {
            content: '<  ';
            color: #23AFAF;
        }

        .btn & {
            color: $color-white;

            &::before {
                content: none;
            }
        }
    }
</style>
