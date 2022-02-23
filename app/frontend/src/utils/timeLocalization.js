import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";
dayjs.extend(dayjsPluginUTC);

export default {
    toUTC(dateString, format='YYYY-MM-DD HH:mm:ss'){
        return dayjs(dateString).utc().format(format)
    },
    fromUTC(dateString, format='YYYY-MM-DDTHH:mm'){
        return dayjs.utc(dateString).local().format(format)
    }
}