import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/Reducer';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics/index'

const epicMiddleware = createEpicMiddleware();
// const store = createStore(reducer, {ducks: []}, applyMiddleware(thunk))
const store = createStore(reducer, {ducks: []}, applyMiddleware(epicMiddleware))

epicMiddleware.run(rootEpic);

export default store;