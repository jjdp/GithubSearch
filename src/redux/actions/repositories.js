// @flow

type fetchRepositoriesAction = { type: 'FETCH_REPOSITORIES', params: Object };
type fetchRepositoriesSuccessAction = {
  type: 'FETCH_REPOSITORIES_SUCCESS',
  items: Array<Object>,
  prevQuery: string
};
type fetchRepositoriesFailAction = {
  type: 'FETCH_REPOSITORIES_FAIL',
  error: any
};
type fetchRepositoriesResetAction = { type: 'FETCH_REPOSITORIES_RESET' };
type selectRepositoryAction = {
  type: 'SELECT_REPOSITORY',
  item: Object,
  index: number
};
type deleteRepositoriesAction = { type: 'DELETE_REPOSITORIES' };

export type Action =
  | fetchRepositoriesAction
  | fetchRepositoriesSuccessAction
  | fetchRepositoriesFailAction
  | fetchRepositoriesResetAction
  | selectRepositoryAction
  | deleteRepositoriesAction;

export const fetchRepositories = (params: Object): fetchRepositoriesAction => ({
  type: 'FETCH_REPOSITORIES',
  params
});

export const fetchRepositoriesSuccess = (
  items: Array<Object>,
  prevQuery: string
): fetchRepositoriesSuccessAction => ({
  type: 'FETCH_REPOSITORIES_SUCCESS',
  items,
  prevQuery
});

export const fetchRepositoriesFail = (
  error: any
): fetchRepositoriesFailAction => ({
  type: 'FETCH_REPOSITORIES_FAIL',
  error
});

export const fetchRepositoriesReset = (): fetchRepositoriesResetAction => ({
  type: 'FETCH_REPOSITORIES_RESET'
});

export const selectRepository = (
  item: Object,
  index: number
): selectRepositoryAction => ({
  type: 'SELECT_REPOSITORY',
  item,
  index
});

export const deleteRepositories = (): deleteRepositoriesAction => ({
  type: 'DELETE_REPOSITORIES'
});
