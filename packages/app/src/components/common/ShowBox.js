import { CheckCircle, XCircle } from "react-feather";

const formatMessageDispo = nb =>
  nb === 1
    ? `Une mesure supplémentaire peut m'être confiée.`
    : `${nb} mesures supplémentaires peuvent m'être confiées.`;

export const DispoMagistrat = ({ currentDispos }) => (
  <>
    {currentDispos > 0 ? (
      <div>
        <SucessBox message={formatMessageDispo(currentDispos)} />
      </div>
    ) : currentDispos ? (
      <div>
        <ErrorBox message={formatMessageDispo(currentDispos)} />
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
      style={{ marginTop: 10, fontSize: "1.2em", borderRadius: "0px" }}
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
