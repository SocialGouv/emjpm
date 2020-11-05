update lb_users lbu set adresse1 = (select m.adresse from mandataires m where m.lb_user_id = lbu.id);
update lb_users lbu set code_postal = (select m.code_postal from mandataires m where m.lb_user_id = lbu.id);
update lb_users lbu set ville = (select m.ville from mandataires m where m.lb_user_id = lbu.id);
