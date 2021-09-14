const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        console.log('r')
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}
export default debounce;