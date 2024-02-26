import { useState, useCallback } from "react";

type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE";

interface HTTPHeaders {
  // interface where you have infinity amount of string: string
  [key: string]: string;
}
// type HTTPHeaders = Record<string, string>

interface RequestConfig {
  // config for request where everything is optional except of URL
  url: string;
  method?: HTTPRequestMethods;
  body?: string | null;
  headers?: HTTPHeaders;
}

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] = useState<string>("idle"); // <string> says that it should be always string
  //const [error, setError] = useState<string | null>(null); // we put null here because null was not caught yet, and we need to use generic here to set to string as well when we have an error

  const request = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" },
    }: RequestConfig) => {
      setLoadingStatus("loading");

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        setLoadingStatus("idle");
        return data;
      } catch (e) {
        setLoadingStatus("error");
        throw e;
      }
    },
    []
  );

  return { loadingStatus, request };
  //return [loadingStatus, request] as const; // for creating tuple
};
