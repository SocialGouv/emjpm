import mesure from "~/public/static/images/mesure.svg";

const MagistratMesureStyle = {
  bg: "white",
  borderRadius: "6px",
  flexWrap: "wrap",
  overFlow: "hidden",
  position: "relative",
  width: "100%",
};

const MagistratMesureSideStyle = {
  background: `url(${mesure})`,
  backgroundSize: "cover",
  flexBasis: 380,
  flexGrow: 1,
  minHeight: "320px",
};

const MagistratMesureMainStyle = {
  flexBasis: 0,
  flexGrow: 99999,
  minWidth: 320,
  pt: 5,
  px: 4,
};

const MagistratMesureTitleStyle = {
  color: "textSecondary",
  fontFamily: "heading",
  fontSize: 0,
  mb: "4px",
};

const MagistratMesureContentStyle = {
  color: "text",
  fontFamily: "body",
  fontSize: 1,
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
