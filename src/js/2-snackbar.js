import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form =  document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const state = formData.get('state');
    const delay = formData.get('delay');

    const customPromise = new Promise( (resolve, reject) => {
        setTimeout( () => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    customPromise.then( (delay) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`
        })
    }).catch( (delay) => {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`
        })
    })
});