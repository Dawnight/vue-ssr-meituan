<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="handleMouseLeave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="handleMouseEnter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="handleFloatLayerMouseEnter"
      @mouseleave="handleFloatLayerMouseLeave">
      <template
        v-for="(item, index) in currentDetail.child">
        <div :key="index">
          <h4>{{ item.title }}</h4>
          <span
            v-for="(v, idx) in item.child"
            :key="idx">{{ v }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '火锅', '甜点', '饮品', '自助餐', '快餐']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店',
              child: ['经济型', '舒适/三星', '高档四星', '豪华五星']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖']
            }
          ]
        },
        {
          type: 'movie',
          name: '猫眼电影'
        },
      ]
    };
  },
  computed: {
    currentDetail() {
      return this.menu.filter(item => item.type === this.kind)[0];
    }
  },
  methods: {
    handleMouseLeave () {
      this._timer = setTimeout(() => {
        self.kind = '';
      }, 150);
    },
    handleMouseEnter (e) {
      this.kind = e.target.querySelector('i').className;
    },
    handleFloatLayerMouseEnter () {
      clearTimeout(this._timer);
    },
    handleFloatLayerMouseLeave () {
      this.kind = '';
    }
  }
};
</script>

