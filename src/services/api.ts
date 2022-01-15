export async function fakeApi<TResponse>(
  response: TResponse,
): Promise<TResponse> {
  return new Promise<TResponse>((resolve: (value: TResponse) => void): number =>
    setTimeout(resolve, 1000, response),
  );
}
