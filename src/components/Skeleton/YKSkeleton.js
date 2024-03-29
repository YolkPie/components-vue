export default {
  name: 'YKSkeleton',
  abstract: true,
  props: {
    className: {
      type: String,
      default: 'yk-skeleton',
      required: false
    },
    showSpin: {
      type: Boolean,
      default: true,
      required: false
    },
    init: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  render(h) {
    const slots = this.$slots.default || [h('')]
    this.$nextTick().then(() => {
      this.handlerPrefix(slots, this.showSpin ? this.addSkeletPrefix : this.removeSkeletPrefix, this.init)
    })

    return slots.length > 1 ? h('div', {
      staticClass: this.showSpin ? 'yk-spinner' : ''
    }, slots) : slots
  },
  methods: {
    getAbstractComponent(vnode) {
      return vnode && vnode.componentOptions && vnode.componentOptions.Ctor.options.abstract
    },
    handlerPrefix(slots, handler, init = true) {
      slots.forEach(slot => {
        var children = slot.children || (slot.componentOptions || {}).children || ((slot.componentInstance || {})._vnode || {}).children
        if (!slot.componentOptions) {
          !init && handler(slot)
        } else if (!this.getAbstractComponent(slot) && slot.data) {
          ;(function(slot) {
            const handlerComponent = this.handlerComponent.bind(this, slot, handler, init)
            const insert = (slot.data.hook || {}).insert
            ;(slot.data.hook || {}).insert = () => { // 函数重构, 修改原有的组件hook, 并且保证insert只执行一次
              insert(slot)
              handlerComponent()
            }
            ;(slot.data.hook || {}).postpatch = handlerComponent
          }).call(this, slot)
        }
        if (slot && slot.elm && slot.elm.nodeType === 3) {
          if (this.showSpin) {
            slot.memorizedtextContent = slot.elm.textContent
            slot.elm.textContent = ''
          } else {
            slot.elm.textContent = slot.memorizedtextContent || slot.elm.textContent || slot.text
          }
        }
        children && this.handlerPrefix(children, handler, false)
      })
    },
    handlerComponent(slot, handler, init) {
      const originchildren = (((slot.componentInstance || {})._vnode || {}).componentOptions || {}).children
      const compchildren = ((slot.componentInstance || {})._vnode || {}).children
      !init && handler(slot)
      if (compchildren) this.handlerPrefix(compchildren, handler, false)
      if (originchildren) this.handlerPrefix(originchildren, handler, false)
    },
    addSkeletPrefix(slot) {
      const rootVnode = slot.componentOptions ? (slot.componentInstance || {})._vnode || {} : slot;
      if (rootVnode.elm && rootVnode.elm.nodeType === 1) {
        if (rootVnode.elm) {
          rootVnode.elm.classList.add(this.className)
          rootVnode.elm.style.width = rootVnode.elm.clientWidth + 'px'
        } else {
          ;(rootVnode.data || {}).staticClass += ` ${this.className}`
        }
      }
    },
    removeSkeletPrefix(slot) {
      const rootVnode = slot.componentOptions ? (slot.componentInstance || {})._vnode || {} : slot;
      if (rootVnode.elm && rootVnode.elm.nodeType === 1) {
        if (rootVnode.elm) {
          rootVnode.elm.classList && rootVnode.elm.classList.remove(this.className)
        } else if ((rootVnode.data || {}).staticClass) {
          rootVnode.data.staticClass = rootVnode.data.staticClass.replace(` ${this.className}`, '')
        }
      }
    }
  }
}