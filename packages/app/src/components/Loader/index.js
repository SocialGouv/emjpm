import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactLoader from "react-loader-spinner";
export default function Loader(props) {
  return (
    <ReactLoader
      type="Rings"
      color="#0072ca"
      height={64}
      width={64}
      {...props}
    />
  );
}
