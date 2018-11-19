<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <m-header/>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      footer
    </el-footer>
  </el-container>
</template>

<script>
import MHeader from '@/components/public/header/index';

export default {
  components: {
    MHeader
  }
};
</script>
