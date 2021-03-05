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
    
            @progress="onProgress($event)"
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
                    <div class="summary__text">You are looking at your customized garden layout. Bellow is the grid that you selected with icons representing each picked plant. To learn more about your plants needs, you can look at the table on the next page. Happy planting!</div>
                </section>

                <section class="pdf-item">
                    <div class="section__title">Your Garden Plan</div>
                    <div class="garden__container">
                        <div class="garden__content"></div>
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
                        <div class="table__content"></div>
                    </div>
                </section>
            </section>
        </vue-html2pdf>
        <button @click="generateReport">GENERATE PLAN</button>
    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';

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
 
    components: {
        VueHtml2pdf
    }
}
</script>

<style lang="scss">
@import './../css/_variables.scss';

// dev
.results .vue-html2pdf .layout-container {
    left: 0 !important;
    width: auto !important;
    height: auto !important;
    z-index: 1 !important;
    background: white !important;

    .content-wrapper {
        width: auto !important;
    }
}

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
}

.intro__social {
    display: flex;
    justify-content: center;
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
    width: 300px;
    height: 300px;
    background-color: $color-gray-80;
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
    height: 300px;
    background-color: $color-gray-80;
}


</style>