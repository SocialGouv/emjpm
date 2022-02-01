UPDATE users u SET genre = (SELECT man.genre FROM mandataires man WHERE man.user_id = u.id) WHERE u.type = 'individuel' OR u.type = 'prepose';
UPDATE users u SET genre = (SELECT mag.genre FROM magistrat mag WHERE mag.user_id = u.id) WHERE u.type = 'ti';
UPDATE users u SET genre = (SELECT gre.genre FROM greffier gre WHERE gre.user_id = u.id) WHERE u.type = 'greffier';
