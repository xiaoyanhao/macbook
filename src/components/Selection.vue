<template>
  <transition name="fade">
    <div
      class="selection"
      v-if="active"
      :style="styleObject">
    </div>
  </transition>
</template>

<script>
export default {
  name: 'selection',
  data() {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      clientX: 0,
      clientY: 0,
      active: false
    };
  },
  computed: {
    styleObject() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
        width: this.width + 'px',
        height: this.height + 'px'
      };
    }
  },
  methods: {
    onLeftMouseDown(event) {
      if (event.button !== 0) {
        return;
      }
      this.active = true;
      this.clientX = event.clientX;
      this.clientY = event.clientY;
      this.$parent.$el.addEventListener('mousemove', this.expandSelection);
    },
    onLeftMouseUp(event) {
      if (event.button !== 0) {
        return;
      }
      this.active = false;
      this.width = 0;
      this.height = 0;
      this.$parent.$el.removeEventListener('mousemove', this.expandSelection);
    },
    expandSelection(event) {
      this.width = Math.abs(event.clientX - this.clientX);
      this.height = Math.abs(event.clientY - this.clientY);

      if (event.clientY < this.clientY && event.clientX > this.clientX) {
        // 第一象限
        this.left = this.clientX;
        this.top = this.clientY - this.height;
      } else if (event.clientY <= this.clientY && event.clientX <= this.clientX) {
        // 第二象限 + x负半轴 + y正半轴 + 原点
        this.left = this.clientX - this.width;
        this.top = this.clientY - this.height;
      } else if (event.clientY > this.clientY && event.clientX < this.clientX) {
        // 第三象限
        this.left = this.clientX - this.width;
        this.top = this.clientY;
      } else if (event.clientY >= this.clientY && event.clientX >= this.clientX) {
        // 第四象限 + x正半轴 + y负半轴
        this.left = this.clientX;
        this.top = this.clientY;
      }
    }
  },
  mounted() {
    this.$parent.$el.addEventListener('mousedown', this.onLeftMouseDown);
    this.$parent.$el.addEventListener('mouseup', this.onLeftMouseUp);
  }
};
</script>

<style lang="scss">
.selection {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
</style>
