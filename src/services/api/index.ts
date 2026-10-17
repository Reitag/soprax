export async function apiFetchData<T>(url: string, emptyData: unknown): Promise<T | undefined> {
  try {
    // Positive scenario
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json(); // Expected case
    }
    if (response.status === 404) {
      return emptyData as T;
    }
  } catch (error) {
    // Negative scenario
    console.log(`Error: ${error}`);
  }
}
