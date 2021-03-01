import { toast } from 'react-toastify';
import { api } from '.';
import { NightSelfStudyTimeKey } from '../constants/types';

export const getMyIngangsilStatus = () =>
  api<'myIngangsilApplyStatus'>('GET', '/ingang-application/status');

export const applyIngangsil = (time: NightSelfStudyTimeKey) =>
  api<'applyIngangsil'>('POST', '/ingang-application/time/' + time).then(() =>
    toast.success(`인강실 ${time === 'NSS1' ? 1 : 2}타임을 신청했어요`),
  );

export const unapplyIngangsil = (time: NightSelfStudyTimeKey) =>
  api<'unapplyIngangsil'>(
    'DELETE',
    '/ingang-application/time/' + time,
  ).then(() =>
    toast.info(`인강실 ${time === 'NSS1' ? 1 : 2}타임 신청을 취소했어요`),
  );

export const requestExcelFile = (grade: number) =>
  api<'requestExcelFile'>(
    'POST',
    `/ingang-application/export/grade/${grade}`,
  ).then((e) => e.exportedFile);

export const getEntireTicket = () =>
  api<'entierTicket'>('GET', '/ingang-application/entire').then(
    (e) => e.ingangApplications,
  );
