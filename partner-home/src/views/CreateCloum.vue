<template>
  <div class="CreateCloum">
    <header class="c-head">
      <w-title :cssStyle="titleCssStyle" >添加栏目</w-title>
    </header>
    <section class="c-section">
      <w-input
        v-model="formValidate.cloumName"
        title="栏目名称："
        placeholderText="最多输入6个中文字符"
        :max="6"
        :errorTips="errorTips.cloumName">
      </w-input>
      <w-input
          title="定  价："
          v-model="formValidate.cloumPrice"
          placeholderText=""
          inputType="number"
          :disabled="cloumPriceDisabled"
          :errorTips="cloumPriceDisabled? '': errorTips.cloumPrice"
          tips="元/月">
        <div slot="footer">
          <w-select-box :disabled="cloumPriceDisabled" v-model="isSpecials">
              <li>特惠价格</li>
              <ul class="c-s-specials" v-show="formValidate.cloumPrice && specialsPrice && isSpecials">
                <li v-for="item in specialsPrice">
                  <span>{{item.price}}</span>元/{{item.unit}}
                </li>

              </ul>
          </w-select-box>
        </div>
      </w-input>
      <p class="c-s-tips" v-if="specialTip">{{specialTip}}</p>
      <p class="c-s-tips" v-if="cloumPriceDisabled"><span style="color: #dd5050;">温馨提示：</span><span>若价格需要调整，请联系您的专属讲师维护，或致电和讯客服：010-8569-7400。</span></p>
      <w-textarea
        v-model="formValidate.cloumDesc"
        :errorTips="errorTips.cloumDesc"
        title="栏目介绍："
        :max="150">
      </w-textarea>
    </section>
    <div class="c-footer">
      <hxpdoc></hxpdoc>
      <div class="c-f-btn-group">
          <w-button @click.native="eventCancel" class="c-f-bg-btn">取消</w-button>
          <w-button @click.native="eventSubmit" class="c-f-bg-btn">{{auditStatus == 2 ? '保存': '提交审核'}}</w-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Schema from 'async-validator'
  import {fetch} from '../store/fetch'

  import WSelectBox from '../components/w-selectBox'
  import WTitle from '../components/w-title';
  import WInput from '../components/w-input';
  import WTextarea from '../components/w-textarea';
  import HXPDOC from '../components/HXPDOC.vue'
  import WButton from '../components/w-button'
  export default {
    name: 'CreateCloum',
    components: {
      WTitle,
      WInput,
      WTextarea,
      WButton,
      WSelectBox,
      hxpdoc: HXPDOC
    },
    data () {
      return {
        formValidate: {
          cloumName:　'',
          cloumPrice: '',
          cloumDesc: ''
        },
        isSpecials: false,
        auditStatus: 1, // 栏目状态
        priceStrate: null,
        errorTips: {
          cloumName:　'',
          cloumPrice: '',
          cloumDesc: ''
        },
        ruleValidate: {
          cloumName (rule, value, callback, source, options) {
            const errors = [];
            if(!value) {
              errors.push('栏目名称不能为空')
            } else {

            }
            callback(errors);
          },
          cloumPrice: {
            required: true,
            message: '定价不能为空'
          },
          cloumDesc: {
            type: 'string',
            required: true,
            message: '栏目介绍不能为空'
          }
        },

      }
    },
    computed: {
      titleCssStyle() {
        return {
          color: '#000',
          borderLeft: '3px solid #e74c3c',
          fontSize: '24px',

        }
      },
      pid() {
        return this.$store.state.partnerId;
      },
      columId() {
        const id = this.$route.query.id
        return id == 'null' ? null: id;
      },
      specialsPrice() {
        const priceStrate = this.priceStrate
        const cloumPrice = this.formValidate.cloumPrice
        if(priceStrate && cloumPrice) {
          const specialPrice = this.priceStrate.map((item, index) => {
            if(index === 0) {
              return {
                price: Math.round(cloumPrice * 3 * 0.9),
                unit: '季度'
              }
            } else if (index === 1) {
              return {
                price: Math.round(cloumPrice * 6 * 0.8),
                unit: '半年'
              }
            } else if (index === 2) {
              return {
                price: Math.round(cloumPrice * 12 * 0.7),
                unit: '年'
              }
            }
          })
          return specialPrice
        } else {
          return null;
        }
      },
      specialTip() {
        if(this.priceStrate) {
          return `注：特惠价格以您输入单月价格为基础，系统自动计算季度、半年、年的价格。分别为${this.priceStrate[0]}折、${this.priceStrate[1]}折、${this.priceStrate[2]}折。`
        } else {
          return ''
        }
      },
      cloumPriceDisabled () {
        const status = this.columId && this.auditStatus != 3
        return status ? 'disabled' : undefined
      }
    },
    methods: {
      eventCancel () {
        this.$router.go(-1);
      },
      eventSubmit () {
        const validator = new Schema(this.ruleValidate);

        validator.validate(this.formValidate, (errors, fields) => {
          if(errors) {
            errors.forEach(({field, message}) => {
              this.errorTips[field] = message
            })
          } else {
            let params = {
              columnName: this.formValidate.cloumName,
              columnIntroduce: this.formValidate.cloumDesc,
              price: this.formValidate.cloumPrice,
              isSpecials: this.isSpecials?1:0
            }

            // 如果有ID
            if(this.columId) {
              params = Object.assign(params, {
                id: this.columId
              })
            }

            fetch.createCloum(params).then(
              res => {
                if(this.auditStatus != 2) {
                  this.$vuw.prompt.show(
                    {
                      content: `
                      <div style="line-height: 30px">
                        <p style="font-size: 26px;padding: 20px 0; color: #dd5050">审核中</p>
                        <p>我们将在12个小时内完成审核！请您耐心等待……</p>
                        <p>审核的过程中您可以去发布 <a href="/partner/home/WriteBlog" style="color: #dd5050"">免费文章</a></p>
                        <p>如有疑问，欢迎致电010-8569-7400咨询</p>
                      </div>
                    `,
                      hideEvent: () => {
                        this.$router.push('/Index/AllProduct/ArticleManagement?activeIndex=lanmu');
                      }
                    }
                  )
                } else {
                  this.$vuw.prompt.show(
                    {
                      content: `
                      <div style="line-height: 30px">
                        <p style="font-size: 26px;padding: 20px 0; color: #000">保存成功</p>
                      </div>
                    `,
                      hideEvent: () => {
                        this.$router.push('/Index/AllProduct/ArticleManagement?activeIndex=lanmu');
                      }
                    }
                  )
                }
              }
            )
          }
        })

      },
      getPriceStrate() {
        fetch.getPriceStrate().then(
          res => {
            this.priceStrate = res
          }
        )
      },
      getColumInfo (id) {
        fetch.getColumInfo(id).then(
          res => {
            this.formValidate = {
              cloumName:　res.columnName,
              cloumPrice: Number(res.price),
              cloumDesc: res.columnIntroduce
            }
            this.isSpecials = res.isSpecials == 1
            this.auditStatus = res.auditStatus
          }
        )
      }
    },
    created() {
      // 获取价格策略
      this.$store.dispatch('GET_PARTNER_ID').then(
        ()=> {
          this.getPriceStrate()
          if(this.columId) {
            this.getColumInfo(this.columId)
          }
        }
      )

    }
  }
</script>
<style lang="stylus">
  .CreateCloum {
    text-align left;
    width 1000px
    margin 0 auto
    background #fff
    padding-bottom 80px

    .c-head {
      padding 33px 0 33px 80px
    }
    .c-section {
      padding 33px 0 33px 80px
    }

    .c-s-specials {
      display flex
      li {
        padding 0 10px
        span {
          color #dd5050
        }
      }
    }

    .c-s-tips {
      color #3598db
      padding-left 170px
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