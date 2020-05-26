import { BoxWrapper } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { resetIdCounter } from "react-tabs";

import { Enquete } from "../../../../src/components/Enquete";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";
import { urlQueryParser } from "../../../../src/util/urlQueryParser.service";

const EnquetePage = ({ enqueteId }) => {
  const router = useRouter();

  const { step, substep } = useMemo(
    () =>
      urlQueryParser.parseQueryValues(["step", "substep"], {
        defaultValue: 0,
        path: router.asPath,
        transform: x => parseInt(x)
      }),
    [router.asPath]
  );

  const currentStep = { step, substep };

  return (
    <LayoutMandataire>
      <BoxWrapper>
        <Enquete id={enqueteId} currentStep={currentStep} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

EnquetePage.getInitialProps = async params => {
  const { query } = params;
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(EnquetePage);
