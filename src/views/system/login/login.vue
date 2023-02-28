<template>
  <div class="login-container">
    <div class="box-item desc">
      <div class="welcome">
        <p>欢迎登录VoiceAdmin Vue</p>

      </div>

    </div>
    <div class="box-item login">
      <div class="login-title">账号登录</div>
      <a-form ref="formRef" class="login-form" :model="loginForm" :rules="rules">
        <a-form-item name="loginName">
          <a-input v-model:value.trim="loginForm.loginName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="loginForm.password"
            autocomplete="on"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model:checked="rememberPwd">记住密码</a-checkbox>
          <span> ( 账号：admin, 密码：123456)</span>
        </a-form-item>
        <a-form-item>
          <div class="btn" @click="onLogin">登录</div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
  import { message } from 'ant-design-vue';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { loginApi } from '/@/api/system/login/login-api';
  import { SmartLoading } from '/@/components/framework/smart-loading';
  import { LOGIN_DEVICE_ENUM } from '/@/constants/system/login-device-const';
  import { useUserStore } from '/@/store/modules/system/user';
  import { saveTokenToCookie } from '/@/utils/cookie-util';

  import { buildRoutes } from '/@/router/index';
  import { smartSentry } from '/@/lib/smart-sentry';

  //--------------------- 登录表单 ---------------------------------

  const loginForm = reactive({
    loginName: '',
    password: '',
    loginDevice: LOGIN_DEVICE_ENUM.PC.value,
  });
  const rules = {
    loginName: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
  };

  const showPassword = ref(false);
  const router = useRouter();
  const formRef = ref();
  const rememberPwd = ref(false);

  onMounted(() => {
    document.onkeyup = (e) => {
      if (e.keyCode == 13) {
        onLogin();
      }
    };
  });

  onUnmounted(() => {
    document.onkeyup = null;
  });

  //登录
  async function onLogin() {
    formRef.value.validate().then(async () => {
      try {
        SmartLoading.show();
        const res = await loginApi.login(loginForm);
        saveTokenToCookie(res.data.token ? res.data.token : '');
        message.success('登录成功');
        //更新用户信息到pinia
        useUserStore().setUserLoginInfo(res.data);
        //构建系统的路由
        buildRoutes();
        router.push('/home');
      }
      catch (e) {
        if (e.data && e.data.code === 30001) {
          loginForm.captchaCode = '';
        }
        smartSentry.captureError(e);
      } finally {
        SmartLoading.hide();
      }
    });
  }
</script>
<style lang="less" scoped>
  @import './login.less';
</style>
