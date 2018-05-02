<template>
  <div id="Weituo" class="Weituo">
    <iframe
            v-if="partnerLevel == 1"
            ref="iframe"
            id="iframepage"
            marginheight="0"
            marginwidth="0"
            :src="ifSrc"
            frameborder="0"
            style="overflow: auto;width: 100%; height:1268px;overflow-y: scroll;overflow-x: hidden"
            ></iframe>
    <list-title v-else type="AllProductWeituo"></list-title>
  </div>
</template>
<script>
  import ListTitle from '@/components/ListTitle'
  export default {
    name: 'Weituo',
    components: {
      ListTitle,
    },
    data() {
      return {
        msg: 'this is Weituo'
      }
    },
    computed: {
      ifSrc () {
        return `${this.$store.state.config.weChat}/commission/web/`
      },
      partnerLevel () {
        return this.$store.getters.partnerLevel
      }
    },
    methods: {
//      iFrameHeight () {
//        console.log('?????')
//        const ifm= this.$refs.iframe;
//        const subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
//        if(ifm != null && subWeb != null) {
//          ifm.height = subWeb.body.scrollHeight;
//          ifm.width = subWeb.body.scrollWidth;
//        }
//      }
    },
    mounted () {
      console.log(this.$refs)
    }
  }
</script>
<style lang="">
  .Weituo {
    flex: 1;
  }
</style>