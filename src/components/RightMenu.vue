<template>
  <transition name="fade">
    <div
      class="rightMenu"
      v-show="active"
      :style="styleObject">
      <template
        v-for="(menuGroup, menuGroupIndex) in menuGroups">
        <ul
          class="menuGroup"
          :key="menuGroupIndex">
          <li
            class="menuItem"
            v-for="(menuItem, menuItemIndex) in menuGroup"
            :key="menuItemIndex">
            {{menuItem}}
          </li>
        </ul>
        <div
          class="divider"
          v-if="menuGroupIndex != menuGroups.length - 1">  
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'rightMenu',
  data() {
    return {
      left: 0,
      top: 0,
      active: false,
      menuGroups: [[
        '新建文件夹'
      ], [
        '显示简介'
      ], [
        '更改桌面背景...',
        '整理',
        '整理方式按',
        '排序方式',
        '查看显示选项'
      ]]
    };
  },
  computed: {
    styleObject() {
      return {
        left: this.left + 'px',
        top: this.top + 'px'
      };
    }
  },
  methods: {
    onRightMouseDown(event) {
      if (event.button === 0) {
        this.active = false;
      } else if (event.button === 2) {
        this.active = true;
        this.left = event.clientX;
        this.top = event.clientY;
      }
    }
  },
  mounted() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.$parent.$el.addEventListener('mousedown', this.onRightMouseDown);
  }
};
</script>

<style lang="scss">
.rightMenu {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: rgba(238, 238, 238, 1);
  z-index: 3;
  font-size: 0.8rem;

  .menuGroup {
    margin: 4px 0;
    .menuItem {
      padding: 1px 20px;
      &:hover {
        background-color: rgba(78, 157, 251, 1);
        color: white;
      }
    }
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: rgba(223, 223, 223, 1);
  }
}
</style>
