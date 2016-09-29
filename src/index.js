// @flow

function isVisible(el) {
  const { display, visibility } = window.getComputedStyle(el)
  return (display !== 'none' && visibility !== 'hidden')
}

const directive = {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to a function.

    if (process.env.NODE_ENV !== 'production' && typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}'` }

      console.warn(warn)
    }

    // Define Handler and cache it on the element
    const bubbleMod = binding.modifiers.bubble
    const visibleMod = binding.modifiers.visible
    const handler = (e) => {
      const targetOk = (bubbleMod || (!el.contains(e.target) && el !== e.target))
      const visibilityOk = !visibleMod || isVisible(el)
      if (targetOk && visibilityOk) {
        binding.value(e)
      }
    }
    el.__vueClickout__ = handler


    // add Event Listeners
    document.addEventListener('click', handler)
  },

  unbind: function(el) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null

  }
}

if (window && window.Vue) {
  window.Vue.directive('clickout', directive)
}

export { directive as default }
if (process.env.NODE_ENV !== 'production') {
  console.log('Only print on development mode')
}
