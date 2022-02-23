import { createStore } from 'vuex';
import Auth from './modules/auth';
import Calendar from './modules/calendar';
import Client from "@/store/modules/client";
import Product from "@/store/modules/product";

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
    Product
  }
})
