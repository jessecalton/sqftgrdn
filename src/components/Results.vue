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
            html-to-pdf-options="{enableLinks: true}"
    
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
                    <div class="intro__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel auctor nisl, congue semper tellus.</div>
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
                    <div class="summary__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel auctor nisl, congue semper tellus.</div>
                </section>

                <section class="pdf-item">
                    <div class="section__title">Your Garden</div>
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
        <button @click="generateReport">Export to PDF</button>
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
 
    components: {
        VueHtml2pdf
    }
}
</script>

<style lang="scss">
// @import './../css/_variables.scss';

// dev
// .results .vue-html2pdf .layout-container {
//     left: 0 !important;
//     width: auto !important;
//     height: auto !important;

//     .content-wrapper {
//         width: auto !important;
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
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-1rem);
    font-size: 1.375rem;
    letter-spacing: .07em;
    white-space: nowrap;
    background: #FFF;
    border: 1px solid #00727A;
    padding: 0.25rem 1rem;
}

.page-2 {
    margin-bottom: 2rem;
}

// header section

.pdf__title {
    // font-family: Libre Baskerville, Arial, serif;
    font-size: 36px;
    color: #333;
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
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        width: 7.625rem;
        height: .3125rem;
        transform: translateX(-50%);
        background: linear-gradient(to bottom, #B0DDDD, #B0DDDD .0625rem, transparent .0625rem, transparent calc(100% - .0625rem), #B0DDDD calc(100% - .0625rem));
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
}

// summary section

.pdf__summary {
    text-align: left;
}

.summary__title {
    border-bottom: .25rem double #B0DDDD;
}

.summary__text {
    margin-bottom: 2.5rem;
}

// garden section

.garden__container {
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: .25rem double #00727A;
        padding-top: 2.5rem;
}

.garden__content {
    width: 300px;
    height: 300px;
    background-color: #333;
}

// table section

.table__container {
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: .25rem double #00727A;
    padding-top: 2.5rem;
}

.table__content {
    width: 100%;
    height: 300px;
    background-color: #333;
}


</style>