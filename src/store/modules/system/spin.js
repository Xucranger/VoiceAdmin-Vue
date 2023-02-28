/*
 * @Description:laoding
 * @Author: Xucranger
 * @Date: 2023-02-05 01:41
 */
import { defineStore } from 'pinia';

export const useSpinStore = defineStore({
  id: 'spin',
  state: () => ({
    loading: false,
  }),

  actions: {
    hide() {
      this.loading = false;
      let spins = document.querySelector('.ant-spin-nested-loading');
      spins.style.zIndex = 999;
    },
    show() {
      this.loading = true;
      let spins = document.querySelector('.ant-spin-nested-loading');
      spins.style.zIndex = 1001;
    },
  },
});
