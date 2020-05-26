import { useRouter } from "next/router";
import { useMemo } from "react";

import { urlQueryParser } from "./urlQueryParser.service";

export const useUrlQueryValue = param => {
  const router = useRouter();

  return useMemo(
    () =>
      urlQueryParser.parseQueryValue(param, {
        path: router && router.asPath ? router.asPath : ""
      }),
    [param, router]
  );
};
