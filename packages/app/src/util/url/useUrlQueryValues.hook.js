import { useRouter } from "next/router";
import { useMemo } from "react";

import { urlQueryParser } from "./urlQueryParser.service";

export const useUrlQueryValues = params => {
  const router = useRouter();

  return useMemo(
    () =>
      urlQueryParser.parseQueryValues(params, {
        path: router && router.asPath ? router.asPath : ""
      }),
    [params, router]
  );
};
