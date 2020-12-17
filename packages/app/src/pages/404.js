import NextErrorComponent from "next/error";
import React from "react";

export default function HTTP404() {
  return <NextErrorComponent statusCode={404} />;
}
