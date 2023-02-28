/*
 * @Description:loading部件
 * @Author: Xucranger
 * @Date: 2023-02-05 01:33
 */''
import { useSpinStore } from "/@/store/modules/system/spin";

export const SmartLoading = {
  show: () => {
    useSpinStore().show();
  },

  hide: () => {
    useSpinStore().hide();
  },
};
