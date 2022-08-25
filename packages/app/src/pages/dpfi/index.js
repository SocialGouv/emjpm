import { Helmet } from "react-helmet";
import { LayoutDpfi } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function MandataireBoardDpfi() {
  return (
    <>
      <Helmet>
        <title>Tableau de bord | e-MJPM </title>
      </Helmet>
      <LayoutDpfi>
        <BoxWrapper mt={3} px="1"></BoxWrapper>
      </LayoutDpfi>
    </>
  );
}

function Dpfi() {
  return <MandataireBoardDpfi />;
}

export default Dpfi;
