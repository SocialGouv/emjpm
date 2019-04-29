import { CheckCircle, XCircle } from "react-feather";

export const DispoMagistrat = ({ currentDispos }) => (
  <>
    {currentDispos > 0 ? (
      <div>
        <SucessBox message={`${currentDispos} mesures supplémentaires peuvent m'être confiées.`} />
      </div>
    ) : currentDispos ? (
      <div>
        <ErrorBox message={`${currentDispos} mesures supplémentaires peuvent m'être confiées.`} />
      </div>
    ) : (
      ""
    )}
  </>
);
export const ErrorBox = ({ message }) => (
  <Alert className="alert-danger" Icon={XCircle} message={message} />
);

export const SucessBox = ({ message }) => (
  <Alert className="alert-success" Icon={CheckCircle} message={message} />
);

export const Alert = ({ className, Icon, message }) =>
  (message && (
    <div
      className={`alert ${className || ""}`}
      role="alert"
      style={{ marginTop: 20, fontSize: "1.2em" }}
    >
      <Icon
        style={{
          verticalAlign: "middle",
          marginRight: 10
        }}
      />{" "}
      {message}
    </div>
  )) ||
  null;
