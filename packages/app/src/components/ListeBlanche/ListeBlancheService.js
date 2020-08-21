import { Card } from "@emjpm/ui";
import React from "react";

import { cardStyle } from "./style";

export const ListeBlancheService = (props) => {
  const { item, onClick } = props;

  return (
    <Card
      key={item.id}
      sx={cardStyle({ clickable: !!onClick })}
      mb="2"
      onClick={() => (onClick ? onClick(item) : null)}
    >
      {/* ListeBlancheService */}
    </Card>
  );
};

ListeBlancheService.defaultProps = {
  onSelect: () => {},
};

export default ListeBlancheService;
