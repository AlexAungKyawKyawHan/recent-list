<template>
  <v-container>
    <v-row>
      <h2 class="pl-5 mt-3 color">Recent Content Lists</h2>
    </v-row>

    <div
      @scroll.passive="onScroll"
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
          max-width="300"
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
    </div>
    <v-item-group v-show="this.loading === true" mandatory>
      <v-item v-for="i in 7" :key="i">
        <v-icon x-small class="check" v-if="checkScrollRange(i) == true">
          mdi-checkbox-blank-circle
        </v-icon>
        <v-icon x-small class="check" v-else-if="checkScrollRange(i) == false">
          mdi-checkbox-blank-circle-outline
        </v-icon>
      </v-item>
    </v-item-group>
  </v-container>
</template>

<script>
import favoriteIcon from "./FavoriteIcon.vue";
import visibilityIcon from "./VisibilityIcon.vue";

export default {
  name: "RecentContent",
  components: {
    favoriteIcon,
    visibilityIcon,
  },

  data: () => ({
    model: null,
    recentDatas: [],
    length: 8,
    slide: null,
    offsetTop: 0,
    scrollX: 0,
    totalPixel: 0,
    eachScrollPixel: 0,
    loading: false,
  }),
  methods: {
    onScroll(e) {
      this.scrollX = e.target.scrollLeft;
    },
    checkScrollRange(i) {
      if (
        i == 1 &&
        0 <= this.scrollX &&
        i * this.eachScrollPixel >= this.scrollX
      ) {
        return true;
      }
      if (
        i > 1 &&
        (i - 1) * this.eachScrollPixel <= this.scrollX &&
        i * this.eachScrollPixel >= this.scrollX
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    fetch("https://api.channeldk.com/v1/content?page=1&size=10")
      .then((res) => res.json())
      .then((json) => {
        this.recentDatas = json.data;
        this.totalPixel = json.data.length * 300;
        this.eachScrollPixel = this.totalPixel / 8;
        this.loading = true;
      });
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
  -ms-overflow-style: none;
  scrollbar-width: none;
}

v-btn.active {
  background-color: #03b1fc;
}
</style>

