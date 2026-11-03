type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function apiFetchData<T>(
  url: string,
  emptyData: unknown,
  method: HttpMethod = 'GET',
  bodyData: unknown = null
): Promise<T | undefined> {
  try {
    const options: RequestInit = {
      method,
    };

    if (bodyData) {
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(bodyData);
    }
    // Positive scenario
    const response = await fetch(url, options);

    if (response.ok) {
      if (method === 'DELETE' || response.status === 204) {
        return { isDeleted: true } as T;
      }
      return await response.json();
    }
    /*if (response.status === 200) {
      return await response.json(); // Expected case
    }*/
    if (response.status === 404) {
      return emptyData as T;
    }
  } catch (error) {
    // Negative scenario
    console.log(`Error: ${error}`);
  }
}
