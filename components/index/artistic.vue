<template>
  <section class="m-istyle">
    <dl @mouseover="handleMouseOver">
      <dl>有格调</dl>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点"
      >全部</dd>
      <dd
        :class="{active:kind==='party'}"
        kind="party"
        keyword="美食"
      >约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人"
      >丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影"
      >电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="出游"
      >品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in current"
        :key="item.title"
      >
        <el-card
          :body-style="{padding: '0px'}"
          shadow="never"
        >
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      kind: 'all',
      list: {
        all: [],
        party: [],
        spa: [],
        movie: [],
        travel: []
      }
    };
  },
  computed: {
    current () {
      return this.list[this.kind];
    }
  },
  methods: {
    handleMouseOver(){
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
