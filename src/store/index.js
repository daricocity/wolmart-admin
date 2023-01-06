import { createStore } from 'redux';
import reducer from './reducer';

// Main Store
const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
