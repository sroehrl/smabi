export const updateState = stateSetter => {

    return ev => {

        stateSetter(oldState => {
            console.log('state updater fired', ev, {...oldState})
            let newState = {...oldState};
            newState[ev.target.name] = ev.target.value;
            return newState
        })
    }
}
