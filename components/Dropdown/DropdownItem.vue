<template lang="html">
  <li
    :class="{'divider':divider}"
    :style="{
      'color':hoverx?giveColor()+' !important':null,
      'background':hoverx?giveColor(.01)+' !important':null
    }"
    class="vs-component vs-dropdown--item"
    @click="closeParent"
    @mouseover="hoverx=true"
    @mouseout="hoverx=false">
    <router-link
      v-if="to"
      :to="to"
      v-bind="$attrs"
      :class="{'disabled':disabled}"
      class="vs-dropdown--item-link"
      v-on="$listeners"
    >
      {{ $attrs.disabled }}
      <slot/>
    </router-link>

    <a
      v-else
      v-bind="$attrs"
      :class="{'disabled':disabled}"
      class="vs-dropdown--item-link"
      v-on="$listeners"
    >
      <slot/>
    </a>
  </li>
</template>

<script>
export default {
  name: "DropdownItem",
  inheritAttrs:false,
  props:{
    to:{},
    disabled:{
      default:false,
      type:Boolean
    },
    divider:{
      default:false,
      type:Boolean
    },

  },
  data: () => ({
    hoverx: false,
    vsDropDownItem: true,
    color: null
  }),
  mounted () {
    this.changeColor()
  },
  updated() {
    this.changeColor()
  },
  methods:{
    closeParent() {
      if(this.disabled) return
      searchParent(this)
      function searchParent(_this) {
        let parent = _this.$parent
        if(!parent.$el.className) return
        if(parent.$el.className.indexOf('parent-dropdown') == -1) {
          searchParent(parent)
        } else {
          let [dropdownMenu] = parent.$children.filter(item => {
            return item.hasOwnProperty('dropdownVisible')
          })
          dropdownMenu.dropdownVisible = parent.vsDropdownVisible = false
        }
      }
    },
    changeColor() {
      let _self = this
      searchParent(this)
      function searchParent(_this){
        let parent = _this.$parent
        if(!parent.$el.className){
          return
        }
        if(parent.$el.className.indexOf('parent-dropdown') == -1) {
          searchParent(parent)
        } else {
          _self.color = parent.color
        }
      }
    },
    giveColor(opacity = 1) {
      return this.rColor(this.color,opacity)
    },
    rColor(colorx,opacity=1){
    if(/^[#]/.test(colorx)){
      let c = this.hexToRgb(colorx)
      colorx = `rgba(${c.r},${c.g},${c.b},${opacity})`
    } else if (/^[rgb]/.test(colorx)){
      let colorSplit = colorx.split(')')[0]
      if(!/^[rgba]/.test(colorx)){
        colorSplit.replace('rgb','rgba')
        colorSplit += `,${opacity})`
      } else {
        // colorSplit.replace('rgb','rgba')
        colorSplit += `)`
      }
      colorx = colorSplit
    }

    let vscolors = ['primary','success','danger','warning','dark']
    if(colorx){
      if(/[#()]/.test(colorx)){
        return colorx
      } else {
        if(vscolors.includes(colorx)){
          return `rgba(var(--vs-${colorx}),${opacity})`
        } else {
          return `rgba(var(--vs-primary),${opacity})`
        }
      }
    } else {
      return `rgba(var(--vs-primary),${opacity})`
    }
  },
  }
}
</script>