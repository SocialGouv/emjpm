import { AccessibleSelect } from "~/components";
import { useMemo } from "react";
import { Box } from "rebass";

export function SdpfSelector({ user }) {
  console.log(user);
  const ServiceOptions = useMemo(() => {
    return (
      user?.allAccessibleSdpf?.map((s) => ({
        label: s.etablissement,
        value: s.id,
      })) || []
    );
  }, [user.allAccessibleSdpf]);

  const handleServiceChange = (selected) => {
    if (selected.value) {
      const currentService = user?.allAccessibleSdpf.find(
        (x) => x.id === selected.value
      );

      user.changeSdpf(currentService);
    }
  };

  return (
    <Box sx={{ width: "250px", marginBottom: "10px" }} id="service_selector">
      <AccessibleSelect
        placeholder="Sélectionner un service"
        options={ServiceOptions}
        value={ServiceOptions?.find((s) => s.value === user.sdpf.id)}
        onChange={handleServiceChange}
        menuPortalTarget={false}
      />
    </Box>
  );
}
