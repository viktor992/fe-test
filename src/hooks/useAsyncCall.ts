import { useEffect, useRef, useState } from 'react';

export const useAsyncCall = <T, U>(fetcher: (params: U) => Promise<T[]>) => {
  const [params, setParams] = useState<U>();
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>();
  const timeout = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    clearTimeout(timeout.current);
    const callApi = async () => {
      setError(null);
      if (params) {
        setLoading(true);
        try {
          const responseData = await fetcher(params);
          setData(responseData || []);
          setLoading(false);
        } catch (error: unknown) {
          setError(error);
          setLoading(false);
        }
      } else {
        setData([]);
      }
    };
    if (params) {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      timeout.current = setTimeout(callApi, 600);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [params, fetcher]);

  return { data, error, loading, params, setParams };
};
