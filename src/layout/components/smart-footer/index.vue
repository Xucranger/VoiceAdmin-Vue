<!--
  * @Description: 底部公司版权信息
  * @Author:      Xucranger
  * @Date:        2023-02-05 04:04
-->
<template>
  <div class="version" >
    <a target="_blank" href="https://152.136.113.191">
      VoiceAdmin Vue By Xucranger
    </a>
  </div>
</template>
<script setup>
  import dayjs from 'dayjs';

  const currentYear = dayjs().year();
</script>

<style lang="less" scoped>
  .version {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    a {
      color: rgba(0, 0, 0, 0.45);
    }
    a:hover {
      color: @primary-color;
    }
  }
</style>
