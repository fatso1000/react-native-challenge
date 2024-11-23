const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchData(
  endpoint: string,
  token: string,
  params?: Record<string, any>
) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
}

export async function postData(
  useBaseUrl: boolean,
  endpoint: string,
  body: Record<string, any>
) {
  const response = await fetch(
    useBaseUrl ? `${BASE_URL}${endpoint}` : endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
}
