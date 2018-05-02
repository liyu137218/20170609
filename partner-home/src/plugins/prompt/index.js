/**
 * Created by wuxingjiang on 2017/7/18.
 */
import PromptComponent from '@/components/w-prompt'
import { mergeOptions } from '@/libs/plugin_helper'

let _vm

const plugin = {
  install(vue, options = {}) {
    const Prompt = vue.extend(PromptComponent)

    if(!_vm) {
      _vm = new Prompt({
        el: document.createElement('div'),
        propsData: {

        }
      });
      document.body.appendChild(_vm.$el)
    }

    const prompt = {
      show (options) {
        if(typeof options === 'object') {
          mergeOptions(_vm, options)
        }
        if(typeof options === 'object' && (options.onShow || options.inHide)) {
          options.onShow && options.onShow()
        }
        this.$watcher && this.$watcher();
        this.$watcher = _vm.$watch('showValue', (val) => {
          if(!val && options && options.onHide) {
            options.onHide()
          }
        });

        // 移除事件
        _vm.$off('on_hideEvent')
        // 添加事件

        _vm.$on('on_hideEvent', () => {
          options && options.hideEvent && options.hideEvent()
        })

        _vm.showValue = true
      },
      hide () {
        _vm.showValue = false
      }
    }
    if(!vue.$vuw) {
      vue.$vuw = {
        prompt
      }
    } else {
      vue.$vuw.prompt = prompt
    }

    vue.mixin({
      created: function () {
        this.$vuw = vue.$vuw
      }
    })
  }
}

export default plugin
export const install = plugin.install