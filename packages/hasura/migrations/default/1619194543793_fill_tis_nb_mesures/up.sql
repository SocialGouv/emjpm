UPDATE tis SET nb_mesures = (
    SELECT count(*)
    FROM mesures
    WHERE mesures.ti_id = tis.id
);
