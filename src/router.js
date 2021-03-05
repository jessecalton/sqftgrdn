import Vue from "vue";
import Router from "vue-router";

import Setup from "@/views/Setup.vue";
import Draggable from "@/components/DraggableList.vue";


Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "setup",
            component: Setup
        },{
          path: "/draggable",
          name: "draggable",
          component: Draggable
        }
    ]
});