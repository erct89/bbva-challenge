import { dedupeMixin } from '@open-wc/dedupe-mixin/index.js';

export const CommonComponentMixin = dedupeMixin(
  superClass =>
    class extends superClass {
      _dispatch(eventName, detail = true, bubbles = true, composed = true) {
        this.dispatchEvent(
          new CustomEvent(eventName, {
            detail,
            bubbles,
            composed,
          })
        );
      }
    }
);
