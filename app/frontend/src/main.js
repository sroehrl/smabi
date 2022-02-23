import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/main.scss'
import Unicon from 'vue-unicons'
import {
    uniDashboard, uniCalender,
    uniUsersAlt, uniFileContract,
    uniBill, uniInvoice,
    uniClipboardAlt, uniSetting,
    uniOutgoingCall,
    uniGlobe, uniEnvelope,
    uniNotes,
    uniTimesCircleSolid, uniEditAlt, uniWhatsapp } from 'vue-unicons/dist/icons'
import notification from "@/utils/notification";
Unicon.add([
    uniDashboard, uniCalender,
    uniUsersAlt, uniFileContract,
    uniBill, uniInvoice,
    uniClipboardAlt, uniEditAlt,
    uniSetting, uniWhatsapp,
    uniTimesCircleSolid,uniOutgoingCall,
    uniGlobe, uniEnvelope,
    uniNotes
]);
createApp(App).use(store).use(router).use(Unicon).use(notification).mount('#app')
