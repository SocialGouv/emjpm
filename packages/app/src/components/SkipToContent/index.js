import React from "react";

import styled from "@emotion/styled";

const SkipLinkWrapper = styled.a`
  position: absolute;
  left: -1000px;
  overflow: hidden;
  top: 0px;
  font-size: 1.4em;
  padding: 4px;
  background-color: #007ad9;
  border-radius: 4px;
  color: white;
  z-index: 9999;
  &:focus {
    left: 0px;
  }
`;

function SkipToContent({ skipTo, text = "Aller au contenu principal" }) {
  return (
    <SkipLinkWrapper
      className="skip_to_content_link"
      href={`#${skipTo}`}
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      tabIndex={99}
    >
      {text}
    </SkipLinkWrapper>
  );
}

export default SkipToContent;
