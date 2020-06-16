import mesure from "../../../public/static/images/mesure.svg";

const MagistratMesureStyle = {
  bg: "white",
  borderRadius: "6px",
  overFlow: "hidden",
  flexWrap: "wrap",
  width: "100%",
  position: "relative",
};

const MagistratMesureSideStyle = {
  background: `url(${mesure})`,
  backgroundSize: "cover",
  flexGrow: 1,
  flexBasis: 380,
  minHeight: "320px",
};

const MagistratMesureMainStyle = {
  px: 4,
  pt: 5,
  flexGrow: 99999,
  flexBasis: 0,
  minWidth: 320,
};

const MagistratMesureTitleStyle = {
  fontSize: 0,
  color: "textSecondary",
  fontFamily: "heading",
  mb: "4px",
};

const MagistratMesureContentStyle = {
  fontSize: 1,
  color: "text",
  fontFamily: "body",
  fontWeight: "600",
  mb: 4,
};

const MagistratMesureLinksStyle = {
  position: "absolute",
  right: 2,
  top: 2,
};

export {
  MagistratMesureStyle,
  MagistratMesureMainStyle,
  MagistratMesureSideStyle,
  MagistratMesureTitleStyle,
  MagistratMesureContentStyle,
  MagistratMesureLinksStyle,
};
