import { all } from 'redux-saga/effects';

import { watchFetchRepositories } from './repositories.js';

export default function* rootSaga() {
  yield all([watchFetchRepositories()]);
}
