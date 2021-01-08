import { Box, Card, Flex, Text } from "rebass";

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "12px",
  fontWeight: "700",
};

const valueStyle = {
  fontFamily: "heading",
  fontSize: "13px",
  fontWeight: "600",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const LabelValue = ({ label, value }) => (
  <Flex mb={1}>
    <Box width="30%">
      <Text sx={labelStyle}>{label}</Text>
    </Box>
    <Text sx={valueStyle}>{value}</Text>
  </Flex>
);

export const EtablissementViewForm = (props) => {
  const { data = {} } = props;
  const {
    id,
    nofinesset,
    nofinessej,
    rs,
    rslongue,
    complrs,
    compldistrib,
    numvoie,
    typvoie,
    voie,
    compvoie,
    lieuditbp,
    commune,
    libdepartement,
    ligneacheminement,
    telephone,
    telecopie,
    categetab,
    libcategetab,
    categagretab,
    libcategagretab,
    siret,
    codeape,
    codemft,
    libmft,
    codesph,
    libsph,
    dateouv,
    dateautor,
    numuai,
    coordxet,
    coordyet,
    sourcecoordet,
  } = data;
  return (
    <Card>
      <Box mb={2}>
        <LabelValue label="id" value={id} />
        <LabelValue value={siret} label="SIRET" />
        <LabelValue value={nofinesset} label="FINESS établissement" />
        <LabelValue value={nofinessej} label="FINESS juridique" />
        <LabelValue value={rs} label="raison sociale" />
        <LabelValue value={rslongue} label="raison sociale longue" />
        <LabelValue value={complrs} label="complément raison sociale" />
        <LabelValue value={compldistrib} label="complément distribution" />
        <LabelValue value={numvoie} label="numéro voie" />
        <LabelValue value={typvoie} label="type voie" />
        <LabelValue value={voie} label="voie" />
        <LabelValue value={compvoie} label="complément voie" />
        <LabelValue value={lieuditbp} label="lieu dir BP" />
        <LabelValue value={commune} label="commune" />
        <LabelValue value={libdepartement} label="département" />
        <LabelValue value={ligneacheminement} label="ligne acheminement" />
        <LabelValue value={telephone} label="téléphone" />
        <LabelValue value={telecopie} label="télécopie" />
        <LabelValue value={categetab} label="categetab" />
        <LabelValue value={libcategetab} label="libcategetab" />
        <LabelValue value={categagretab} label="categagretab" />
        <LabelValue value={libcategagretab} label="libcategagretab" />

        <LabelValue value={codeape} label="Code APE" />
        <LabelValue value={codemft} label="codemft" />
        <LabelValue value={libmft} label="libmft" />
        <LabelValue value={codesph} label="codesph" />
        <LabelValue value={libsph} label="libsph" />
        <LabelValue value={dateouv} label="date ouverture" />
        <LabelValue value={dateautor} label="dateautor" />
        <LabelValue value={numuai} label="numuai" />
        <LabelValue value={coordxet} label="coordonnée X" />
        <LabelValue value={coordyet} label="coordonnée Y" />
        <LabelValue value={sourcecoordet} label="source coordonnées" />
      </Box>
    </Card>
  );
};

export default EtablissementViewForm;
