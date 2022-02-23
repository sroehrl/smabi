import api from "./api";
import dayjs from "dayjs";

const lPad = (number) => {
    return ('00000' + number.toString()).slice(-5);
}

const capitalizeFirst = name => name.charAt(0).toUpperCase() + name.slice(1)

class Settings{
    constructor() {
        this.remotes = {};
    }
    async get(settingType){
        const {data} = await api.get('/settings/'+settingType);
        this.remotes[settingType] = data;
        return data.object;
    }
    async update(settingType, object){
        this.remotes[settingType].object = object;
        const {data} = await api.put('/settings', this.remotes[settingType])
        this.remotes[settingType] = data;
        return data.object;
    }
    invoicingNumber(invoiceType){
        const parsed = this.remotes['invoicing']?.object.format
            .replace(/{{status}}/,`[${capitalizeFirst(invoiceType)}]`)
            .replace(/{{running}}/,`[${lPad(this.remotes['invoicing'].object.runners[invoiceType])}]`)
        return dayjs().format(parsed)
    }
}
export default new Settings();