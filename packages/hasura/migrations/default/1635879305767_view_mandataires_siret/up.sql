CREATE OR REPLACE VIEW "public"."view_mandataires_siret" AS 
 SELECT lbu.siret
   FROM (mandataires m
     JOIN lb_users lbu ON ((lbu.id = m.lb_user_id))) WHERE lbu.siret IS NOT NULL;
