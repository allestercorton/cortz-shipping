export const getError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const err = error as {
      message: string;
      response?: { data?: { message?: string } };
    };
    return err.response?.data?.message || err.message;
  }
  return 'An unknown error occurred';
};
