/**
 * Created by wuxingjiang on 2017/4/24.
 */

export function createListView(type, children) {
  return {
    name: `${type}-view`,
    data() {
      return {
        type: type
      }
    },
    computed: {
      userLevel() {
        return this.$store.state.userLevel;
      },
      webRetg() {
        return this.$store.state.webRetg;
      },
    },
    watch: {
      
    },
    methods: {
      
    },
    render (h) {
      if(!children) {
        console.warn('children is null');
        return ;
      }
      let childrenCom = children.map(function (val, index, array) {
        return h(val, {props: {type}})
      });
      return h('div', {props: {type: type}}, childrenCom)
    }
  }
}