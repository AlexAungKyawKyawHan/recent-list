<template>
  <v-container>
    <v-row>
      <h2 class="pl-5 mt-3 color">Recent Content Lists</h2>
    </v-row>

    <v-infinite-scroll
      class="item"
      :offset="20"
      style="max-height: 80vh; overflow-x: scroll; display: flex"
    >
      <v-spacer
        v-model="slide"
        v-for="recentData in recentDatas"
        :key="recentData.id"
        id="scroll-target"
      >
        <v-card
          v-scroll:#scroll-target="onScroll"
          outlined
          class="ma-2"
          max-width="290"
        >
          <v-img
            v-if="recentData.headerImage != null"
            class="white--text align-end"
            height="200px"
            :src="`https://api.channeldk.com/v1/content-photo/${recentData.headerImage.fileOriginalName}`"
          >
            <v-row class="vertical-icon-padding">
              <v-btn class="btn-margin" color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p color="teal-darken-4" class="multi-line-truncate">
                  <span>{{ recentData.title }}</span>
                </p>
              </v-col>
            </v-row>
          </v-img>
          <v-card-actions>
            <v-row>
              <v-col sm="2"></v-col>
              <v-col sm="10"></v-col>
              <p class="pr-12 pt-3" color="orange" text>
                {{ recentData.updatedAt | formatDate }}
              </p>
              <v-col sm="2"> </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions>
            <v-row>
              <v-col sm="4">
                <div class="grid">
                  <favorite-icon color="red" />
                  <span>{{ recentData.__v }}</span>
                </div>
              </v-col>
              <v-col sm="4">
                <v-icon class="pl-5" sm color="orange darken-2">
                  mdi-message-text
                </v-icon>
              </v-col>

              <v-col sm="4">
                <div class="grid">
                  <visibility-icon /><span>{{ recentData.viewCount }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-spacer>
    </v-infinite-scroll>
    {{ offsetTop }}
    <v-item-group mandatory>
      <v-item v-for="(recentData, index) in recentDatas" :key="index">
        <v-btn @click="slide = index" height="15px" width="15px" icon>
          <ellipse-icon />
        </v-btn>
      </v-item>
    </v-item-group>
  </v-container>
</template>

<script>
import favoriteIcon from "./FavoriteIcon.vue";
import visibilityIcon from "./VisibilityIcon.vue";
import ellipseIcon from "./EllipseIcon.vue";

export default {
  name: "RecentContent",
  components: {
    favoriteIcon,
    visibilityIcon,
    ellipseIcon,
  },

  data: () => ({
    model: null,
    recentDatas: [],
    length: 8,
    slide: null,
    offsetTop: 0,
    // currentSection: "",
  }),
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
      console.log(this.offsetTop, "this is scroll");
    },
  },

  mounted() {
    fetch("https://api.channeldk.com/v1/content?page=1&size=10")
      .then((res) => res.json())
      .then((json) => {
        this.recentDatas = json.data;
      });

    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.intersectionRatio > 0) {
    //       this.currentSection = entry.target.getAttribute("id");
    //     }
    //   });
    //   document.querySelectorAll("v-card").forEach((section) => {
    //     observer.observe(section);
    //   });
    // });
  },
};
</script>
<style scoped>
.multi-line-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: -1px;
  padding-left: 5px;
  font-size: 16px;
  opacity: 0.5;
  background: linear-gradient(
    90deg,
    #946d73 0%,
    #a27e84 0.01%,
    #a1598e 55.68%,
    #6b519c 98.43%
  );
}
.vertical-icon-padding {
  padding-left: 265px;
}
.grid {
  display: flex;
  padding-left: 10px;
}
.color {
  color: #03b1fc;
}
.grid2 {
  display: flex;
}
.btn-margin {
  margin-top: -139px;
}
.item::-webkit-scrollbar {
  display: none;
}
.item {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
v-btn.active {
  background-color: #03b1fc;
}
</style>
// :class="{ active: (index = currentSection) }"
