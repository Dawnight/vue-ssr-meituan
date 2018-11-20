<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"/>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model.trim="ruleForm.name"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model.trim="ruleForm.email"/>
          <el-button
            size="mini"
            round
            @click="sendMessage">发送验证码</el-button>
          <span class="status">{{ statusMessage }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model.trim="ruleForm.code"
            maxlength="4"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model.trim="ruleForm.pwd"
            type="password"/>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model.trim="ruleForm.cpwd"
            type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="agreeRegister">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data () {
    return {
      rules: {
        name: [{ required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
        pwd: [{ required: true, type: 'string', message: '请输入密码', trigger: 'blur' }],
        cpwd: [
          { required: true, type: 'string', message: '确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请再次输入密码');
              } else if (value !== this.ruleForm.pwd) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
      },
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      statusMessage: '',
      error: ''
    };
  },
  methods: {
    sendMessage () {},
    agreeRegister () {},
  }
};
</script>

<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
