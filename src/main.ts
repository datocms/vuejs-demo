import './style.css'

import { createApp } from 'vue'

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

import { createHead } from "@vueuse/head"

import App from "./App.vue";

library.add(faBriefcase);
library.add(faTwitter);
library.add(faGithub);
library.add(faDribbble);
library.add(faInstagram);
library.add(faYoutube);
library.add(faGlobe);
library.add(faFacebook);

const app = createApp(App)

const head = createHead()

app.use(head)
app.use(DatocmsImagePlugin);

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
