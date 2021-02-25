import { ExtendedVue } from 'vue/types/vue'
import { PluginFunction } from 'vue'

export interface BarLoadingComponent extends ExtendedVue<any, any, any, any> {
  start(): void
  done(): void
  setText(text?: string): void
}

export interface PluginOptions {
  type?: string;
  text?: string;
  fullscreen?: boolean;
  body?: boolean;
  lock?: boolean;
  customClass?: string;
  progressContainer?: any[];
}

export interface PluginApi {
  show(options?: PluginOptions): BarLoadingComponent
  done(options?: PluginOptions): BarLoadingComponent
  hide(options?: PluginOptions): BarLoadingComponent
}

declare class BarLoadingPlugin {
  static install: PluginFunction<PluginOptions>
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $barLoading: PluginApi
  }

  interface VueConstructor {
    readonly $barLoading: PluginApi
  }
}

export default BarLoadingPlugin
