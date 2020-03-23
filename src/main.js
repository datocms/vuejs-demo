import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBriefcase, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { DatocmsImagePlugin } from "vue-datocms";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faDribbble,
  faInstagram,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import VueMeta from "vue-meta";

import App from "./App.vue";
import "./assets/tailwind.css";

library.add(faBriefcase);
library.add(faTwitter);
library.add(faGithub);
library.add(faDribbble);
library.add(faInstagram);
library.add(faYoutube);
library.add(faGlobe);
library.add(faFacebook);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(DatocmsImagePlugin);
Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
