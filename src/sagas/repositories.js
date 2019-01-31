// @flow

import { call, put, takeLatest, select, delay } from 'redux-saga/effects';

import * as actions from '../redux/actions';
import search from '../api';

function* fetchRepositories(action) {
  yield delay(500);

  try {
    const prevQuery = yield select(state => state.repositories.prevQuery);

    const params = action.params;
    let query = prevQuery;
    if (params && params.query) query = params.query;
    let isNew = false;
    if (params && params.isNew) isNew = params.isNew;

    if (isNew) {
      yield put(actions.fetchRepositoriesReset());
    }

    const page = yield select(state => state.repositories.page);

    const repositories = yield call(search, query, page);
    yield put(actions.fetchRepositoriesSuccess(repositories, query));
  } catch (e) {
    yield put(actions.fetchRepositoriesFail(e));
  }
}

export function* watchFetchRepositories(): any {
  yield takeLatest('FETCH_REPOSITORIES', fetchRepositories);
}
