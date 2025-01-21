import {queryOptions} from '@tanstack/react-query';

export const classOptions = queryOptions({
  queryKey: ['classes'],
  queryFn: async () => {
    const response = await fetch('/api/classes');

    return response.json();
  },
});
