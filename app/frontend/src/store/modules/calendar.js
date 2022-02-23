import calendarService from "@/services/calendarService";
import timeLocalization from "@/utils/timeLocalization";

export default {
    mutations: {
        setEvents(state, events){
            state.events = events;
        },
        setEvent(state, event){
            const found = state.events.findIndex(x => x.id === events.id);
            if(found !== -1){
                state.events[found] = {...event}
            } else {
                state.events.push({...event})
            }
        }
    },
    state: {
        events: [],
    },
    actions: {
        async storeCalendarEvent({commit}, given){
            const method = given.id ? 'update' : 'create';
            let passedInEvent = given.extendedProps ? {...given.extendedProps, id: given.id} :  {...given};
            passedInEvent.start_date = timeLocalization.toUTC(given.start !== ''? given.start : given.start_date)
            passedInEvent.end_date = timeLocalization.toUTC(given.end !== ''? given.end : given.end_date);
            try{
                const event = await calendarService[method](passedInEvent);
                commit('setEvent', event);
                return true;
            } catch (e) {
                return false;
            }
        },
        async removeCalendarEvent({commit, state}, given){
            await calendarService.delete(given.id);
            commit('setEvents', state.events.filter(x => x.id !== given.id))

        },
        async getEventsByRange({commit}, from, to='', filter = ''){
            try{
                let range = await calendarService.getRange(from, to, filter);
                for(let i = 0; i < range.length; i++){
                    range[i].start = timeLocalization.fromUTC(range[i].start_date)
                    range[i].end = timeLocalization.fromUTC(range[i].end_date)
                    range[i].start_date = timeLocalization.fromUTC(range[i].start_date)
                    range[i].end_date = timeLocalization.fromUTC(range[i].end_date)
                    range[i].color = "#517f83";
                    range[i].display = "block";
                    range[i].className = "event-" + range[i].event_type;

                }
                commit('setEvents', range)
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    getters: {

    }
}
export const eventStructure = {
    start_date:'',
    end_date:'',
    title:'',
    client_id:null,
    contact_id:null,
    notes:'',
    start:'',
    end:'',
    event_type:'call'
};