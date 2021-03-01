import { api } from './api';
import { cacheItem, getCachedItem } from '../functions/localCache';
import { CacheKeys } from '../constants/cacheKey';
import { Doc, CircleApplyQuestionItem } from '../constants/types';
import { CircleApplicationStatusValues } from '../constants';

export const getAllCircles = () =>
  api<'allCircle'>('GET', '/circle').then((e) => e.circles);

export const getAppliedCircles = () =>
  api<'appliedCircle'>('GET', '/circle-application');

export const getApplyQuestion = async () => {
  const cached = getCachedItem<Doc<CircleApplyQuestionItem>[]>(
    CacheKeys.CIRCLE_APPLY_QUESTION,
  );
  if (cached) return cached;
  const fetched = (
    await api<'applyQuestion'>('GET', '/circle-application/form')
  ).form;
  cacheItem(
    CacheKeys.CIRCLE_APPLY_QUESTION,
    fetched,
    +new Date() + 1000 * 60 * 60 * 24 * 3,
  );
  return fetched;
};

export const applyCircle = async (
  circleId: string,
  form: Record<string, string>,
) =>
  api<'applyCircle'>('POST', '/circle-application', {
    circle: circleId,
    form: form,
  }).then((e) => e.circleApplication);

export const getApplications = () =>
  api<'circleApplications'>('GET', '/circle-applier-selection').then(
    (e) => e.applications,
  );

export const setApplicationStatus = (
  id: string,
  state: typeof CircleApplicationStatusValues[number],
) =>
  api<'setApplicationStatus'>('PATCH', `/circle-applier-selection/${id}`, {
    status: state,
  }).then((e) => e.application);

export const finalSelect = (circleId: string) =>
  api<'finalSelect'>('PATCH', `/circle-application/${circleId}/final`).then(
    (e) => e.application,
  );
