import { ref, watchEffect, onUnmounted } from 'vue';

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

function useFetch(url: string, options: FetchOptions = {}, queries: Record<string, string> = {}) {
  const data = ref<any>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);
  let abortController: AbortController | null = null;

  const fetchData = async () => {
    data.value = null;
    loading.value = true;
    abortController = new AbortController();

    try {
      const queryString = Object.entries(queries)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      const requestUrl = queryString ? `${url}?${queryString}` : url;

      const response = await fetch(requestUrl, {
        method: options.method || 'GET',
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : null,
        signal: abortController.signal
      });

      if (!response.ok) throw new Error(`Fetch Status: ${response.status}`);

      const json = await response.json();
      data.value = json;
      loading.value = false;
    } catch (err) {
      if (err instanceof Error) error.value = err;
      else error.value = new Error('Unknown Error');
      loading.value = true;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  onUnmounted(() => {
    if (abortController) abortController.abort();
  });

  const refetch = () => {
    if (abortController) abortController.abort();
    fetchData();
  };

  return { data, error, loading, refetch };
}

export { useFetch };
