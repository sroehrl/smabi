import { createStore } from 'vuex';
import Auth from './modules/auth';
import Calendar from './modules/calendar';
import Client from "@/store/modules/client";
import Product from "@/store/modules/product";
import Settings from "@/store/modules/settings";
import Invoice from "@/store/modules/invoicing";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Calendar,
    Client,
    Product,
    Settings,
    Invoice
  }
})
