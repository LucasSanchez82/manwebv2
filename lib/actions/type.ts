export type ServerResponseHandler = (
  ...Props: any[]
) => Promise<{ data: any & { message?: string } } | { error: string }>;
