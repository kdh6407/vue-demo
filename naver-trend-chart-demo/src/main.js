import { createApp } from 'vue'
import DraggableResizableVue from 'draggable-resizable-vue3'
import App from './App.vue'

createApp(App)
    .use(DraggableResizableVue)
    .mount('#app')
