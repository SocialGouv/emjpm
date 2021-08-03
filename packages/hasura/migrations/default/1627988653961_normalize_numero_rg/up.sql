UPDATE mesures SET numero_rg = RPAD(SUBSTR(UPPER(REGEXP_REPLACE(numero_rg, '[^a-zA-Z0-9]', '', 'g')),0,8), 8, '0');
