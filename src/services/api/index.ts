export async function apiFetchData<T>(url: string, emtptyData: unknown): Promise<T | undefined> {
  try {
    // Positive scenarion
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json(); // Expected case
    }
    if (response.status === 404) {
      return emtptyData as T;
    }
  } catch (error) {
    // Negative scenario
    console.log(`Error: ${error}`);
  }
}
