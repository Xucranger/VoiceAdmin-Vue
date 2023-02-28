<!--
  * @Description: 采样点选择
  * @Author:      Xucranger
  * @Date:        2023-02-06 06:22
-->
<template>
  <a-cascader
      v-model:value="value"
      :options="options"
      expand-trigger="hover"
      placeholder="选择采样点"
      class="smart-query-form-item"
  />
</template>

<script>
const options = [{
  value: 'zhongguoshiyou',
  label: '中国石油',
  children: [{
    value: 'daqingshihua',
    label: '大庆石化',
    children: [{
      value: 'moss',
      label: 'yayatu',
    }],
  }],
}, {
  value: 'gezhongshiyou',
  label: '中国足球',
  children: [{
    value: 'fuckyou',
    label: '日你妈',
    children: [{
      value: 'rinima',
      label: '退钱',
    }],
  }],
}];
export default {
  name: "voice-manage-cascader",
  setup() {
    return {

      options,
    };
  },
}
</script>

<style scoped>

</style>