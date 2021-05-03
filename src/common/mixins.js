import {debounce} from "./utils";

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
    console.log('我是混入中的内容');
  }
}
