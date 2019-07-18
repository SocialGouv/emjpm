import React from "react";
import { CheckCircle, AlertTriangle } from "react-feather";
import Link from "next/link";

const formatMessageDispo = nb =>
  nb === 1
    ? `Une mesure supplémentaire peut m'être confiée.`
    : `${nb} mesures supplémentaires peuvent m'être confiées.`;

const formatMessageNoDispo = nb =>
  nb === 1
    ? `Une mesures au dessus du nombre de vos mesures souhaitées vous a été confiées.`
    : `${-nb} mesures au dessus du nombre de vos mesures souhaitées vous sont confiées.`;

export const DispoMagistrat = ({ currentDispos, updateIndexIndi }) => (
  <>
    {currentDispos > 0 ? (
      <div>
        <SucessBox message={formatMessageDispo(currentDispos)} updateIndexIndi={updateIndexIndi} />
      </div>
    ) : currentDispos ? (
      <div>
        <ErrorBox message={formatMessageNoDispo(currentDispos)} updateIndexIndi={updateIndexIndi} />
      </div>
    ) : (
      ""
    )}
  </>
);

export const ErrorBox = ({ message, updateIndexIndi }) => (
  <>
    <Alert
      className="alert-danger"
      Icon={AlertTriangle}
      message={message}
      updateIndexIndi={updateIndexIndi}
    />
  </>
);

export const SucessBox = ({ message, updateIndexIndi }) => (
  <>
    <Alert
      className="alert-success"
      Icon={CheckCircle}
      message={message}
      updateIndexIndi={updateIndexIndi}
    />
  </>
);

export const Alert = ({ className, Icon, message, updateIndexIndi }) =>
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
      {message}{" "}
      <Link href="#">
        <a onClick={() => updateIndexIndi(4)} className="button button_transparent">
          Modifier le nombre de mesures souhaitées
        </a>
      </Link>
    </div>
  )) ||
  null;
