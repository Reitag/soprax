import { HttpMethod } from './types';

export async function apiFetchData<T>(
  url: string,
  emptyData: unknown,
  method: HttpMethod = 'GET',
  bodyData: unknown = null
): Promise<T> {
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

    const response = await fetch(url, options);
    if (response.ok) {
      if (method === 'DELETE' || response.status === 204) {
        return { isDeleted: true } as T;
      }
      return await response.json();
    } else {
      return emptyData as T;
    }
  } catch (error) {
    throw new Error('Connection error');
  }
}
