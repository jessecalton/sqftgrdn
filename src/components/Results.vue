<template>
    <div class="results">
        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="true"
            :paginate-elements-by-height="1400"
            filename="My Garden Plan"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="letter"
            :html-to-pdf-options="htmlToPdfOptions"
    
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
        >
            <section slot="pdf-content" class="pdf-container">
                <!-- PDF Content Here -->
                <section class="pdf-item">
                    <img src="../assets/logo-leaf.png" class="logo-leaf" />
                    <img src="../assets/logo.png" class="logo-spruce" />
                    <h1 class="pdf__title">Square Foot Garden Planner</h1>
                </section>

                <section class="pdf-item pdf__intro">
                    <div class="intro__text">This was produced by the Spruce’s Square Foot Garden Planner. You’re one step closer to building your dream garden.</div>
                    <div class="intro__social">
                        Share your garden plan: 
                        <a href="https://www.instagram.com" class="intro__social-logo-container">
                            <img src="../assets/instagram.svg" class="logo-social" />
                        </a>
                        <a href="https://www.pinterest.com" class="intro__social-logo-container">
                            <img src="../assets/pinterest.svg" class="logo-social" />
                        </a>
                        <a href="https://www.facebook.com" class="intro__social-logo-container">
                            <img src="../assets/facebook.svg" class="logo-social" />
                        </a>
                    </div>
                </section>

                <section class="pdf-item pdf__summary">
                    <h2 class="summary__title">Brief Summary</h2>
                    <div class="summary__text">You are looking at your personalized garden layout. To learn more about your plants needs, you can look at the table on the next page. Happy planting!</div>
                </section>

                <section class="pdf-item">
                    <div class="section__title">Your Garden Plan</div>
                    <div class="garden__container">
                        <div class="garden__content">
                            <div
                                class="grid-wrapper"
                                :list="garden"
                                group="plants"
                            >
                                <div
                                    class="list-group-item grid"
                                    v-for="(element, index) in garden"
                                    :key="element.name"
                                >
                                    <img v-if="element.image" :src="element.image" />
                                </div>
                            </div>
                            <div class="garden__details">
                                <span>Zip Code: {{ zip }}, Hardiness Zone: {{ hardiness }}</span>
                                <span class="garden__dimensions">{{ width }} x {{ height }}</span>
                            </div>
                            
                        </div>
                    </div>
                </section>

                <div class="html2pdf__page-break"/>

                <section class="pdf-item page-2">
                    <img src="../assets/logo-leaf.png" class="logo-leaf" />
                    <img src="../assets/logo.png" class="logo-spruce" />
                    <h1 class="pdf__title">Square Foot Garden Planner</h1>
                </section>

                <section class="pdf-item">
                    <div class="section__title">About the Plants</div>
                    <div class="table__container">
                        <div class="table__content">
                            <table>
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Heights</th>
                                    <th>Seeds/ ft2</th>
                                    <th>Edible Season</th>
                                    <th>Seed to Harvest</th>
                                    <th>Profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="row.name" v-for="row in garden" :key="row.name">
                                        <td><img :src="row.image" /></td>
                                        <td>{{row.name}}</td>
                                        <td>{{row.height}}</td>
                                        <td>{{row.spacing}}</td>
                                        <td>{{row.editableSeason}}</td>
                                        <td>{{row.weeksfromSeedsToHarvest}} weeks</td>
                                        <td><a :href="row.sprucePage">View</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </section>
        </vue-html2pdf>
        <button class="btn" @click="generateReport">GENERATE PDF PLAN</button>
    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import { mapMutations, mapState } from 'vuex';

export default {
    name: "Results",
    methods: {
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
    },

    data() {
        return {
            htmlToPdfOptions: {enableLinks: true},
        };
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
 
    components: {
        VueHtml2pdf,
    }
}
</script>

<style lang="scss">
@import './../css/_variables.scss';

// dev

// .results .vue-html2pdf .layout-container {
//     left: 0 !important;
//     width: auto !important;
//     height: auto !important;
//     z-index: 1 !important;
//     background: white !important;

//     .content-wrapper {
//         width: 800px !important;
//     }
// }

// main 

.pdf-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-left: 2.875rem;
    margin-right: 2.875rem;
}

.pdf-item {
    position: relative;
    width: 100%;
}

.section__title {
    font-family: Libre Baskerville, Arial, serif;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-1rem);
    font-size: 1.375rem;
    letter-spacing: .07em;
    white-space: nowrap;
    background: #FFF;
    border: 1px solid $color-brand-surfie-green;
    padding: 0.25rem 1rem;
}

.page-2 {
    margin-bottom: 2rem;
}

// header section

.pdf__title {
    font-family: Libre Baskerville, Arial, serif;
    font-size: 36px;
    color: $color-gray-80;
    margin: 1rem;
}

.logo-leaf {
    position: absolute;
    left: 0;
    height: 4.75rem;
}

.logo-spruce {
    margin-top: 0.8125rem;
    height: 6rem;
}

// intro section

.pdf__intro {
    font-family: Karla, sans-serif;

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        width: 7.625rem;
        height: .3125rem;
        transform: translateX(-50%);
        background: linear-gradient(to bottom, $color-brand-aqua, $color-brand-aqua .0625rem, transparent .0625rem, transparent calc(100% - .0625rem), $color-brand-aqua calc(100% - .0625rem));
    }
}

.intro__text {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    color: $color-gray-60;
}

.intro__social {
    display: flex;
    justify-content: center;
    color: $color-gray-80;
}

.intro__social-logo-container {
    margin-left: 1rem;
    border-bottom: none;
}

// summary section

.pdf__summary {
    text-align: left;
}

.summary__title {
    font-family: Libre Baskerville, Arial, serif;
    border-bottom: .25rem double $color-brand-aqua;
}

.summary__text {
    margin-bottom: 2.5rem;
    font-family: Karla, sans-serif;
}

// garden section
.garden__container {
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: .25rem double $color-brand-surfie-green;
    padding-top: 2.5rem;
}

.garden__content {
    display: flex;
    flex-direction: column;
    min-width: 300px;
}

.garden__details {
    color: $color-gray-60;
    text-align: left;
    margin-top: 0.5rem;
    font-family: Karla, sans-serif;
}

.garden__dimensions {
    float: right;
}

// table section

.table__container {
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: .25rem double $color-brand-surfie-green;
    padding-top: 2.5rem;
}

.table__content {
    width: 100%;
    font-family: Karla, sans-serif;
    display: flex;
    justify-content: center;

    img {
        width: 2rem;
    }

    table, th, td {
        border-collapse: collapse;
        border: 1.5px solid $color-brand-misty-blue-medium;
    }

    thead {
        font-weight: bolder;
    }

    th, td {
        padding: 0.5rem;
    }
}

// from draggable
.pdf-container {
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
    background-color: #F4F4F7;
    overflow: hidden;
}

.grid,
.sortable-chosen.sortable-ghost {
    background-color: $color-brand-aqua-spring;
    max-width: 60px;
    max-height: 60px;
    height: 60px;
    padding: 0.5rem;
    margin: 10px;
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
    padding-left: 130px;
}

.list-group-item {
    flex-basis: 20%;
    &.grid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
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

.list-group-item.grid img {
    width: 40px;
    height: 40px;
    background-color: white;
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
}

</style>