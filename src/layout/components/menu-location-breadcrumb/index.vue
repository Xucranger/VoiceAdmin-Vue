<!--
  * @Description: 面包屑
  * @Author:      Xucranger
  * @Date:        2023-02-12 16:24
-->
<template>
  <a-breadcrumb separator=">" style="display: inline" v-if="breadCrumbFlag">
    <a-breadcrumb-item v-for="(item, index) in parentMenuList" :key="index">{{ item.title }}</a-breadcrumb-item>
    <a-breadcrumb-item>{{ currentRoute.meta.title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup>
  import { useRoute } from 'vue-router';
  import { useUserStore } from '/@/store/modules/system/user';
  import { computed } from 'vue';
  import { useAppConfigStore } from '/@/store/modules/system/app-config';

  // 是否显示面包屑
  const breadCrumbFlag = computed(() =>  useAppConfigStore().$state.breadCrumbFlag);

  let currentRoute = useRoute();
  //根据路由监听面包屑
  const parentMenuList = computed(() => {
    let currentName = currentRoute.name;
    if (!currentName || typeof currentName !== 'string') {
      return [];
    }
    let menuParentIdListMap = useUserStore().getMenuParentIdListMap;
    return menuParentIdListMap.get(currentName) || [];
  });
</script>
