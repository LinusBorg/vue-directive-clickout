# vue-directive-clickout

> a small Vue 2.0 directive to detect clicks outside of an element and run a callback function.

## Installation

### NPM

Install the package from npm
```
npm install --save vue-directive-clickout
```
Load it in your main js file and register it:
```js
import VueDirectiveClickout from 'vue-directive-clickout'

// register it globally
Vue.directive('clickout', VueDirectiveClickout)

// you can also register it locally in individual components only:
export default {
  // other component options...
  directives: {
    'clickout': VueClickoutDirective
  }
}
```

### Via script tag

Insert the script tag after you import Vue:
```html
<script src="https://unpkg.com/vue@next/dist/vue.js"></script>
```

It will be automatically registered globally (with Vue.component) as a directive with the name `v-clickout`


## Usage

Simply add the directive to any element for which you want to register clicks outside of (e.g. a modal window)
```html
<div v-clickout="close" class="modal-window">

</div>
```
and provide a method by that name in your component. The method receives the event as an argument, just like it would for a normal click event.
```js
export default {
  // ... other component options
  methods: {
    close(event) {
      console.log(event.target)
    }
  }
}
```

### The `.bubble` modifier

By default, click events *inside* of or *on* the element that the directive is defined on do not trigger the callback.

You can change this behaviour by adding the `.bubble` modifier:
```html
<div v-clickout.bubble="close" class="modal-window">
  <button>Click Me</button>
  <!-- Clicking this button  (or anywhere inside of the div) will call the "close" callback -->
</div>
```
This may be useful to have e.g. an image modal that closes when you click *anywhere*, including the image.

### The `.visible` modifier

If you add the `.visible` modifier, the callback will only be run if the element is visible\*.
This is usefull if you can't toggle a v-clickout element with `v-if` (which would remove the element from the document, and therefore the directive & event) and instead have to rely on `v-show` (which adds `display: none` to the style attribute but keeps the element in the DOM) or something similar.

<small>(\*) This means: the computed Style of the element has neither `display: none` nor
`visibility: hidden`</small>

```html
<div v-clickout.visible="close" style="display:none">
  <!-- Clicking ouside of this element will *not* trigger the callback because the element is not visible -->
  <button>Click Me</button>
</div>
```

## Limitations

You *must* pass a component method as a callback to this directive. You *can't* use an expression. For example, the following will not work:
```html
<div v-clickout.bubble="$emit('close')" class="modal-window">
  <!-- content -->
</div>
```
For any expression that does not resolve to a function, like the above example, this directive will log a warning to a console (in development mode).

## License

MIT
