/*
 * @Description:多种菜单模式
 * @Author: Xucranger
 * @Date: 2023-02-02 11:55
 */
<template>
  <!--左侧菜单 模式-->
  <SideLayout v-if="layout === LAYOUT_ENUM.SIDE.value" />
  <!--左侧展开菜单 模式-->
  <SideExpandLayout v-if="layout === LAYOUT_ENUM.SIDE_EXPAND.value" />
</template>
<script setup>
  import { computed } from 'vue';
  import SideExpandLayout from './side-expand-layout.vue';
  import { LAYOUT_ENUM } from '/@/constants/layout-const';
  import SideLayout from '/@/layout/side-layout.vue';
  import { useAppConfigStore } from '/@/store/modules/system/app-config';

  const layout = computed(() => useAppConfigStore().$state.layout);
</script>
