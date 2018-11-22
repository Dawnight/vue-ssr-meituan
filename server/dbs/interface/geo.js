import Router from 'koa-router';
import Province from '../models/province';
import Menu from '../models/menu';
import City from '../models/city';


let geoRouter = new Router({
  prefix: '/geo'
});

const sign = 'getGeoSign';

geoRouter.get('/getPosition', async ctx => {
  // let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  let status = 200;
  let province = '广东省';
  let city = '深圳市';
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: '',
      city: ''
    };
  }
});

geoRouter.get('/province', async ctx => {
  let province = await Province.find();
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      };
    })
  };
});

geoRouter.get('/province/:id', async (ctx) => {
  let city = await City.findOne({ id: ctx.params.id });

  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name
      };
    })
  };
});

geoRouter.get('/city', async (ctx) => {
  let city = [];
  let result = await City.find();
  result.forEach(item => {
    city = city.concat(item.value);
  });
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      };
    })
  };
});

geoRouter.get('/menu', async ctx => {
  const result = await Menu.findOne();
  if (result) {
    ctx.body = {
      menu: result.menu
    };
  } else {
    ctx.body = {
      menu: {}
    };
  }

});


export default geoRouter;
