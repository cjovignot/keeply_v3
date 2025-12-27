// utils/tokenStore.ts
const savedTokens: Record<string, string> = {};

export const saveToken = (key: string, token: string) => {
  savedTokens[key] = token;
};
export const getSavedToken = (key: string) => savedTokens[key];
export const deleteSavedToken = (key: string) => {
  delete savedTokens[key];
};
