<template>
  <div
    class="folder"
    ref="folder"
    :style="styleObject"
    :class="{
      active: isActive
    }"
    @mousedown.stop="onMouseDown">
    <div class="folder-icon">
      <div class="icon"></div>
    </div>
    <div class="folder-name">
      <span class="name">
        {{name}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'folder',
  props: ['name', 'isActive'],
  data() {
    return {
      pos: {
        currentTop: 0,
        currentLeft: 0,
        previousTop: 0,
        previousLeft: 0,
        previousClientY: 0,
        previousClientX: 0
      }
    };
  },
  computed: {
    styleObject() {
      return {
        left: this.pos.currentLeft + 'px',
        top: this.pos.currentTop + 'px'
      };
    }
  },
  methods: {
    onMouseDown(event) {
      this.pos.previousClientY = event.clientY;
      this.pos.previousClientX = event.clientX;
      this.pos.previousTop = this.pos.currentTop;
      this.pos.previousLeft = this.pos.currentLeft;

      this.$refs.folder.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseUp(event) {
      this.$refs.folder.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      let movementY = event.clientY - this.pos.previousClientY;
      let movementX = event.clientX - this.pos.previousClientX;
      this.pos.currentTop = this.pos.previousTop + movementY;
      this.pos.currentLeft = this.pos.previousLeft + movementX;
    }
  }
};
</script>

<style lang="scss">
.folder {
  position: absolute;
  height: 64px;
  width: 100px;
  text-align: center;

  .folder-icon {
    height: 64px;
    width: 72px;
    margin: 0 auto;
    border-radius: 2px;

    .icon {
      background-image: url(../assets/GenericFolderIcon.png);
      background-size: 64px;
      background-repeat: no-repeat;
      background-position: center;
      height: 100%;
    }
  }

  .folder-name {
    text-align: center;
    margin-top: 3px;
    .name {
      display: inline-block;
      max-width: 96px;
      padding: 0px 2px;
      color: white;
      font-weight: 900;
      font-size: 0.8rem;
      border-radius: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }
  }

  &.active {
    .folder-icon {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 0 0 1px 1px grey;
    }
    .folder-name .name {
      background-color: dodgerblue;
    }
  }
}
</style>
