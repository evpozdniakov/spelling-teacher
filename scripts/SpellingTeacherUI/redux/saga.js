import {all} from 'redux-saga/effects'
import {saga as dictionarySaga} from '../ducks/dictionary'


export default function * () {
    yield all([
        dictionarySaga(),
    ])
}
