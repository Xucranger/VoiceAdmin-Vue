/*
 * @Description:错误处理
 * @Author: Xucranger
 * @Date: 2023-02-05 01:49
 */

export const smartSentry = {
  /**
   * sentry 主动上报
   */
  captureError: (error) => {
    if (error.config && error.data && error && error.headers && error.request && error.status) {
      return;
    }
    // Sentry.captureException(error);
    console.error(error);
  },
};
