UPDATE service_antenne sa SET dispo = (SELECT service_antenne.mesures_max-(service_antenne.mesures_in_progress+service_antenne.mesures_awaiting) FROM service_antenne WHERE service_antenne.id = sa.id);
