INSERT INTO public.role (id, name) VALUES (1, 'admin');
INSERT INTO public.role (id, name) VALUES (2, 'individuel');
INSERT INTO public.role (id, name) VALUES (3, 'prepose');
INSERT INTO public.role (id, name) VALUES (4, 'ti');
INSERT INTO public.role (id, name) VALUES (5, 'service');
INSERT INTO public.role (id, name) VALUES (6, 'direction');
INSERT INTO public.role (id, name) VALUES (9, 'direction_territoriale');
INSERT INTO public.role (id, name) VALUES (7, 'direction_nationale');
SELECT pg_catalog.setval('public.role_id_seq', 9, true);
