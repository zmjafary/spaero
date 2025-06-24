import { reactive, watch, WatchCallback } from 'vue';

export const EventBus = reactive({
  emit(event: string, payload?: any) {
    this[event] = payload;
  },
  on(event: string, callback: (newVal: any, oldVal: any) => void) {
    watch(
      () => this[event],
      (newVal, oldVal) => {
        callback(newVal, oldVal);
      }
    );
  },
  off(event: string) {
    delete this[event]
  }
});
