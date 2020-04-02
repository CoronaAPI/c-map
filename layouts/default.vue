<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      style="z-index: 999999999"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon href="https://github.com/CoronaAPI">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer style="z-index: 999999999" :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} &nbsp;-&nbsp; </span>
      <a href="https://corona-api-landingpage.netlify.com/" target="_blank"
        >data source</a
      >
      <client-only>
        <div v-if="isFetchingData" class="ml-4">
          <v-progress-circular :size="20" indeterminate color="amber" />
          <span>fetching data</span>
        </div>
      </client-only>
      <v-spacer />
      <a
        href="https://corona-api-landingpage.netlify.com/impressum/"
        target="_blank"
        >Impressum</a
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: true,
      drawer: null,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Overview',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Table',
          to: '/numeric'
        }
      ],
      title: 'corona tracker'
    }
  },
  computed: {
    ...mapGetters({
      isFetchingData: 'isFetchingData'
    })
  }
}
</script>
