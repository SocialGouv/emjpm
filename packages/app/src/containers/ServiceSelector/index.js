import { AccessibleSelect } from "~/components";
import { useMemo } from "react";
import { Box } from "rebass";

export function ServiceSelector({ user }) {
  const ServiceOptions = useMemo(() => {
    return (
      user?.allAccessibleService?.map((s) => ({
        label: s.etablissement,
        value: s.id,
      })) || []
    );
  }, [user.allAccessibleService]);

  const handleServiceChange = (selected) => {
    if (selected.value) {
      const currentService = user?.allAccessibleService.find(
        (x) => x.id === selected.value
      );

      user.changeService(currentService);
    }
  };

  return (
    <Box sx={{ width: "250px", marginBottom: "10px" }}>
      <AccessibleSelect
        placeholder="Sélectionner un service"
        options={ServiceOptions}
        value={ServiceOptions?.find((s) => s.value === user.service.id)}
        onChange={handleServiceChange}
      />
    </Box>
  );
}
