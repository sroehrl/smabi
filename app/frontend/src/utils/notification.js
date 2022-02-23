export default {
    install(app, options) {
        function success(exec){
            exec()
        }
        function cancel(exec){
            exec()
        }

        function notify(ops){
            const container = document.querySelector('#notification');
            const ok = container.querySelector('#confirm-button');
            const denied = container.querySelector('#cancel-button');
            if(ops.text){
                container.querySelector('.notification-text').innerHTML = ops.text;
            }
            container.style.display = 'block';

            return new Promise((resolve, reject)=>{
                ok.addEventListener('click', () => {
                    container.style.display = 'none'
                    success(resolve)
                })
                denied.addEventListener('click', () => {
                    container.style.display = 'none'
                    cancel(reject)
                })
            })
        }
        app.config.globalProperties.$notification = notify
        app.provide('notification', notify)
    }
}