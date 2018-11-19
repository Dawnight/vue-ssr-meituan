<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <e-menu/>
      </el-col>
      <el-col :span="19">2</el-col>
    </el-row>
    <el-row :span="24">
      31
    </el-row>
  </div>
</template>

<script>
import EMenu from '@/components/index/menu';
export default {
  components: {
    EMenu
  }
};
</script>

<style lang="scss">
@import '@/assets/css/index/index.scss';
</style>
