<template>
  <div
    id="desktop"
    ref="desktop"
    :style="desktopStyle">
    <Selection></Selection>
    <RightMenu></RightMenu>
    <Folder
      v-for="(folder, index) in folders"
      :key="index"
      :name="folder"
      :data-name="folder"
      :isActive="isFolderActive(folder, activeFolders)"
      @click.native="onClickFolder">
    </Folder>
  </div>
</template>

<script>
import Folder from './Folder';
import Selection from './Selection';
import RightMenu from './RightMenu';

export default {
  name: 'desktop',
  data() {
    return {
      desktopStyle: {
        // backgroundImage: 'url(/static/desktop/Elephant.jpg)'
      },
      folders: ['vue', 'vuex', 'vue-router', 'abcdefghijklmnopqrstuvwxyz'],
      activeFolders: []
    };
  },
  methods: {
    isFolderActive(folder, activeFolders) {
      return activeFolders.indexOf(folder) !== -1;
    },
    onClickFolder(event) {
      let a;
      console.log(a.b);
      let meta = event.metaKey;
      let shift = event.shiftKey;
      let folderName = event.currentTarget.dataset.name;

      if (meta ^ shift) {
        // 多选
        if (this.activeFolders.indexOf(folderName) === -1) {
          this.activeFolders.push(folderName);
        }
      } else {
        // 单选
        this.activeFolders.splice(0, this.activeFolders.length, folderName);
      }
    }
  },
  components: {
    Folder,
    Selection,
    RightMenu
  }
};
</script>

<style lang="scss">
#desktop {
  background-size: cover;
  background-color: grey;
}
</style>
