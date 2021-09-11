export const updateState = stateSetter => {
    return ev => {
        stateSetter(oldState => {
            let newState = {...oldState};
            newState[ev.target.name] = ev.target.value;
            return newState
        })
    }
}