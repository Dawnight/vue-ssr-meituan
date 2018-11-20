import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'node-mailer';
import User from '../models/users';
import Passport from './utils/passport';
import Email from '../config';
import axios from './utils/axios';

const NODEMAIL = 'nodemail:';

let router = new Router({
  prefix: '/users'
});

let Store = new Redis().client;

router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body;

  if (code) {
    const saveCode = await Store.hget(`${NODEMAIL}${username}`, 'code');
    const saveExpire = await Store.hget(`${NODEMAIL}${username}`, 'expire');
    if (code === saveCode) {
      if (new Date.getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已经过期，请重新尝试'
        };
        return false;
      } else {
        ctx.body = {
          code: -1,
          msg: '请填写正确的验证码'
        };
        return false;
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    };
  }

  let user = await User.find({username});
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '账号已经注册'
    };
    return false;
  }

  let nuser = await User.create({
    username,
    password,
    email
  });

  if (nuser) {
    let res = await axios.post('/users/signin', {username, password});
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    };
  }
});

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (error, user, info, status) => {
    if (error) {
      ctx.body = {
        code: -1,
        msg: error
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: -1,
          msg: info
        };
      }
    }
  })(ctx, next);
});

router.post('/verity', async (ctx, next) => {
  let { username, email } = ctx.request.body;
  const saveExpire = Store.hget(`${NODEMAIL}${username}`, 'expire');
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁'
    };
    return false;
  }

  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    post: Email.smtp.port,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass,
    }
  });

  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: email,
    user: username,
  };

  let mailOption = {
    from: `美团邮件认证 <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《美团网站》注册码',
    html: `您在美团网中注册的邀请码是 ${ko.code}`
  };

  await transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: '邮件发送失败'
      };
      console.log(err);
    } else {
      Store.hmset(`${NODEMAIL}${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email);
    }
  });

  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  };

});

router.get('/exit', async (ctx, next) => {
  // 注销
  await ctx.logout();
  // 二次验证
  if (!ctx.isAuthenticated) {
    ctx.body = {
      code: 0
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
});

router.get('/getUser', async (ctx, next) => {
  if (ctx.isAuthenticated) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email,
    };
  } else {
    ctx.bosy = {
      user: '',
      email: ''
    };
  }
});

export default router;