import { useQuery } from "react-query";
import { EXCHANGE_API_URL, ACCESS_KEY } from "../conf";

export const useGetExchange = <T>(
  path = "latest",
  key: string,
  queryString = ""
) => {
  const { isLoading, error, data } = useQuery<T>(key, () =>
    fetch(
      `${EXCHANGE_API_URL}${path}?access_key=${ACCESS_KEY}${queryString}`
    ).then((res) => res.json())
  );
  return { isLoading, error, data };
};
