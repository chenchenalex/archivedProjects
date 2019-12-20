import { createStore } from 'redux'
import Immutable from 'immutable'
import Flags from './flags/register'

function initialState() {
    return Immutable.Map();
}

let Store = createStore((state=initialState(), action) => {
    return state;
});

export default Store;