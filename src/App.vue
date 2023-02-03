<template>
  <a-config-provider :locale="antdLocale">
    <!---全局loading--->
    <a-spin :spinning="spinning"  tip="请稍等，正在加载中..." size="large">
      <!--- 路由 -->
      <RouterView />
    </a-spin>
  </a-config-provider>
</template>

<script setup>
  import dayjs from 'dayjs';
  import { computed } from "vue";
  import { messages } from '/@/i18n/index';
  import { useAppConfigStore } from '/@/store/modules/system/app-config';
  import { useSpinStore } from './store/modules/system/spin';


  const antdLocale = computed(() => messages[useAppConfigStore().language].antdLocale);
  const dayjsLocale = computed(() => messages[useAppConfigStore().language].dayjsLocale);
  dayjs.locale(dayjsLocale);

  let spinStore = useSpinStore();
  const spinning = computed(() => spinStore.loading);
</script>
