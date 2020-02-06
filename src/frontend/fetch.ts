export default async function<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  const data = await res.json();
  if (res.status > 299) {
    throw new Error(data.error);
  }
  return data;
}
