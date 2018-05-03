import CommonStore from './common';
import AuthStore from './auth';
import RegisterrStore from './register';


const commonStore = new CommonStore();
const authStore = new AuthStore();
const registerStore = new RegisterrStore();

const stores = {
    commonStore,
    authStore,
    registerStore
}

export { commonStore };
export default stores;
