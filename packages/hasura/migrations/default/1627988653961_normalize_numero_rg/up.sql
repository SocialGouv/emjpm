UPDATE mesures SET numero_rg = LPAD(SUBSTR(UPPER(REGEXP_REPLACE(numero_rg, '[^a-zA-Z0-9]', '', 'g')),1,8), 8, '0');
