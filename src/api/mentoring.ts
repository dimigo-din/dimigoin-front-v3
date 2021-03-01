import { api } from './api';
import { RequestableMentoring } from './interfaces/mentoring';

export const getMentoringList = () =>
  api<'mentoringList'>('GET', '/mentoring').then((e) => e.mentorings);

export const getRequestableMentoringList = () =>
  api<'requestableMentoringList'>('GET', '/mentoring/requestable').then(
    (e) => e.mentorings,
  );

export const applyMentoring = (scheduleId: string, date: string) =>
  api<'applyMentoring'>(
    'POST',
    `/mentoring-application/${scheduleId}/date/${date}`,
  );

export const unApplyMentoring = (scheduleId: string, date: string) =>
  api<'unapplyMentoring'>(
    'DELETE',
    `/mentoring-application/${scheduleId}/date/${date}`,
  );

export const createMentoringProgram = (data: RequestableMentoring) =>
  api<'newMentoringProgram'>('POST', '/mentoring', data).then(
    (e) => e.mentoring,
  );

export const editMentoringInfo = (id: string, data: RequestableMentoring) =>
  api<'editMentoringInfo'>('PATCH', `/mentoring/${id}`, data).then(
    (e) => e.mentoring,
  );

export const deleteMentoringProgram = (id: string) =>
  api<'deleteMentoringProgram'>('DELETE', `/mentoring/${id}`).then(
    (e) => e.mentoring,
  );

export const getAppliedMentoring = () =>
  api<'appliedMentoring'>('GET', '/mentoring-application').then(
    (e) => e.applications,
  );
