import ConfirmComponent from '@/components/w-confirm'
import { mergeOptions } from '@/libs/plugin_helper'

let _vm

const plugin = {
  install(vue, options = {}) {
    const Confirm = vue.extend(ConfirmComponent)

    if(!_vm) {
      _vm = new Confirm({
        el: document.createElement('div'),
        propsData: {
          
        }
      })
      document.body.appendChild(_vm.$el)
    }

    const confirm = {
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
        })

        // 移除事件
        _vm.$off('on_cancel')
        _vm.$off('on_confirm')
        // 添加事件
        
        _vm.$on('on_cancel', () => {
          options && options.onCancel && options.onCancel()
        })
          _vm.$on('on_confirm', () => {
          options && options.onConfirm && options.onConfirm()
        })

        _vm.showValue = true
      },
      hide () {
        _vm.showValue = false
      }
    }
    if(!vue.$vuw) {
      vue.$vuw = {
        confirm
      }
    } else {
      vue.$vuw.confirm = confirm
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