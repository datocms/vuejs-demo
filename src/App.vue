<template>
  <div v-if="data">
    <div
      v-bind:class="[
        'bg-cover fixed top-0 right-0 bottom-0 left-0 font-sans antialiased leading-normal',
        nightMode ? 'text-gray-100' : 'text-gray-900',
        nightMode ? 'text-gray-100' : 'text-gray-900'
      ]"
      v-bind:style="{
        backgroundImage: `url('${data.theme.backgroundImage.responsiveImage.base64}')`
      }"
    >
      <div
        class="bg-cover fixed top-0 right-0 bottom-0 left-0"
        v-bind:style="{
          backgroundImage: `url('${data.theme.backgroundImage.url}')`
        }"
      >
        <div
          class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0"
        >
          <!--Main Col-->
          <div
            id="profile"
            v-bind:class="[
              'w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl opacity-75 mx-6 lg:mx-0',
              nightMode ? 'bg-gray-900' : 'bg-white'
            ]"
          >
            <div class="p-4 md:p-12 text-center lg:text-left">
              <!-- Image for mobile view-->
              <div class="block lg:hidden">
                <datocms-image
                  class="rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                  :data="data.profile.photo.mobileImage"
                />
              </div>

              <h1 class="text-3xl font-bold pt-8 lg:pt-0">
                {{ data.profile.name }}
              </h1>
              <div
                v-bind:class="[
                  'mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 opacity-25',
                  `border-${data.theme.color}-500`
                ]"
              ></div>
              <p
                class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"
              >
                <span class="pr-4"
                  ><font-awesome-icon
                    icon="briefcase"
                    v-bind:class="[
                      'h-4 fill-current',
                      `text-${data.theme.color}-700`
                    ]"
                /></span>

                {{ data.profile.profession }}
              </p>
              <p
                class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"
              >
                <span class="pr-4"
                  ><font-awesome-icon
                    icon="globe"
                    v-bind:class="[
                      'h-4 fill-current',
                      `text-${data.theme.color}-700`
                    ]"
                /></span>

                {{ data.profile.location }} -
                {{ data.profile.coordinates.latitude }}° N,
                {{ data.profile.coordinates.longitude }}° W
              </p>
              <p class="pt-8 text-sm">
                {{ data.profile.description }}
              </p>

              <div class="pt-12 pb-8">
                <a
                  v-bind:href="`mailto:${data.profile.email}`"
                  class=""
                  v-bind:class="[
                    'text-white font-bold py-2 px-4 rounded-full',
                    `bg-${data.theme.color}-700`,
                    `hover:bg-${data.theme.color}-900`
                  ]"
                >
                  Get In Touch
                </a>
              </div>

              <div
                class="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center lg:justify-start"
              >
                <a
                  v-for="profile in data.socials"
                  class="link"
                  v-bind:href="profile.url"
                  :key="profile.social"
                >
                  <font-awesome-icon
                    :icon="['fab', profile.social]"
                    size="2x"
                    class=""
                    v-bind:class="[
                      'fill-current text-gray-600 ml-3 mr-3 lg:ml-0 lg:mr-5',
                      `hover:text-${data.theme.color}-700`
                    ]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-2/5">
            <!-- Big profile image for side bar (desktop) -->
            <datocms-image
              :data="data.profile.photo.desktopImage"
              class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            />
            <!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->
          </div>

          <!-- Pin to top right corner -->
          <div class="absolute top-0 right-0 h-12 w-18 p-4">
            <button
              class="js-change-theme focus:outline-none"
              v-on:click="toggleDayNight"
            >
              {{ nightMode ? "☀️" : "🌙" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "./lib/datocms";
import { toHead } from "vue-datocms";

export default {
  name: "App",
  data() {
    return {
      nightMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      data: null
    };
  },
  methods: {
    toggleDayNight() {
      this.nightMode = !this.nightMode;
    }
  },
  metaInfo() {
    if (!this || !this.data) {
      return;
    }
    return toHead(this.data.profile.seo, this.data.site.favicon);
  },
  async mounted() {
    this.data = await request({
      query: `
        {
          site: _site {
            favicon: faviconMetaTags {
              ...metaTagsFragment
            }
          }
          profile {
            seo: _seoMetaTags {
              ...metaTagsFragment
            }
            name
            description
            profession
            location
            email
            coordinates {
              latitude
              longitude
            }
            photo {
              desktopImage: responsiveImage(imgixParams: { w: 360, h: 540, fit: crop, crop: faces, auto: format }) {
                ...imageFields
              }
              mobileImage: responsiveImage(imgixParams: { w: 192, h: 192, fit: crop, crop: faces, auto: format }) {
                ...imageFields
              }
            }
          }
          theme {
            color
            backgroundImage {
              url(imgixParams: { w: 1440, auto: format })
              responsiveImage(imgixParams: { w: 1440, auto: format }) {
                base64
              }
            }
          }
          socials: allSocials {
            social
            url
          }
        }

        fragment metaTagsFragment on Tag {
          attributes
          content
          tag
        }
        fragment imageFields on ResponsiveImage {
          srcSet
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      `
    });
  }
};
</script>
