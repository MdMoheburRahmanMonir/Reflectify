import { ServerMutationGet } from '../mutation/get';

export const GetPublicUserLessons = async () => {
  const data = await ServerMutationGet(`api/public/lesson/full`);
  return Array.isArray(data) ? data : [];
};
