import { React, useCallback, useState, useEffect } from "react";
import { Box, Heading } from "rebass";
import { FormGroupInput } from "~/components/AppForm";
import { Button, Text } from "~/components";

import qrcode from "qrcode";
import { authenticator } from "otplib";

export default function Auth2FA({ unfolded, formik, validationSchema, user }) {
  const [deviceSecret, setDeviceSecret] = useState(null);

  const generateQrCode = useCallback(async () => {
    const secret = authenticator.generateSecret();
    const service = "eMJPM";
    const otpauth = authenticator.keyuri(user, service, secret);
    const imageUrl = await qrcode.toDataURL(otpauth);
    formik.setFieldValue("secret_2fa", secret);
    setDeviceSecret({ imageUrl, secret });
  }, [user, formik]);

  const associateNewDevice = useCallback(() => {
    generateQrCode();
  }, [generateQrCode]);

  useEffect(() => {
    if (unfolded) {
      associateNewDevice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unfolded]);

  if (unfolded && !deviceSecret) {
    return null;
  }

  const label =
    "Entrez le code reçu depuis votre application d'authentification 2FA";

  return (
    <Box m={1}>
      <Box>
        {!deviceSecret && (
          <Button
            mr={2}
            bg="warning"
            onClick={associateNewDevice}
            color="white"
          >
            Associer un nouveau téléphone
          </Button>
        )}
      </Box>
      {deviceSecret && (
        <Box>
          <Heading>Vérification de l'authentification</Heading>
          <Text>
            Scannez l'image ci-dessous avec votre application 2FA favorite
            (FreeOTP, Google Authenticator, Microsoft Authenticator ou autre
            application compatible avec les standards HOTP ou TOTP)
          </Text>
          <Box>
            <img alt="QRCode" src={deviceSecret.imageUrl} />
          </Box>
          <Box>
            <FormGroupInput
              formik={formik}
              id="code_2fa"
              placeholder="Code"
              label={label}
              validationSchema={validationSchema}
              aria-label={label}
              required
              onInput={(e) => {
                let value = e.target.value || "";
                value = value.replace(/\s/g, "");
                formik.setFieldValue("code_2fa", value);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
