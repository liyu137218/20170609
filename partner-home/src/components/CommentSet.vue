<template>
  <div class="CommentSet">
    <w-select-box
        v-model="item.checked"
        v-for="(item, i) in formValue"
        class="comment-list"
        :key = item
        @click.native = "eventClick(item.value)"
        >
      <div v-html="item.label"></div>
    </w-select-box>
    <div class="c-footer">
      <div class="c-f-btn-group">
        <w-button class="c-f-bg-btn" @click.native="eventSave">保存</w-button>
      </div>
    </div>
  </div>
</template>
<script>
  import WSelectBox from '../components/w-selectBox'
  import WButton from '../components/w-button'
  import {fetch} from '../store/fetch'
  export default {
    name: 'CommentSet',
    components: {
      WSelectBox,
      WButton
    },
    data() {
      return {
        formValue: {
          allow: {
            checked: false,
            value: 1,
            label: '允许评论<span style="color: #a0a0a0;">(收费文章只允许VIP用户评论)</span>'
          },
          notAllow: {
            checked: false,
            value: 2,
            label: '不允许评论'
          },
          allowVIP: {
            checked: false,
            value: 3,
            label: '只允许VIP用户评论'
          },
        },
        choseValue: 1
      }
    },
    computed: {
      pid() {
        return this.$store.state.partnerId;
      },
      nickName() {
        return this.$store.state.userInfo.nickname;
      },
    },
    methods: {
      // 选择
      eventClick (val) {
        this.choseValue = val;

        for(let i in this.formValue) {
          if (this.formValue[i].value  == val) {
            this.formValue[i].checked = true

          } else {
            this.formValue[i].checked = false
          }

        }

      },
      getComment () {
        fetch.getCommentSetting().then(
          res => {
            console.log(res)
            this.eventClick(res)
          }
        )
      },
      // 设置comment
      eventSave () {
        fetch.setComment(this.choseValue).then(
          () => {
            this.$vuw.prompt.show({
              content: '保存成功'
            })
          }
        )
      }
    },
    created() {
      this.getComment()
      dplus_Click("点击事件", {
        "事件功能": "评论设置",
        "类型": "互动",
        "事件类别": "非体验",
        "所属平台": "基础平台",
        "合作者ID": this.pid,
        "合作者名称": this.nickName,
      })
    }
  }
</script>
<style lang="stylus">
  .CommentSet {
    padding 20px
    .comment-list {
      padding 10px 0
    }

    .c-f-btn-group {
      display flex
      justify-content center
      padding 30px 0
      .c-f-bg-btn {
        margin 0 20px
        box-sizing border-box
        width 140px
        height 40px
      }
    }
  }
</style>