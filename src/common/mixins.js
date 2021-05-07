import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemImgLentenerMinins = {
  data() {
    return {
      itemImageLentener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImageLentener = () => {
      refresh()
    }
    this.$bus.$on('ItemImgLoad', this.itemImageLentener)
    // console.log('我是混入中的内容');
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTop(0, 0,)
    }
  }
}

