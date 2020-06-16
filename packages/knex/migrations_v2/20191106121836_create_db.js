exports.up = async function (knex) {
  const res = await knex.raw(
    `select count(*) from pg_catalog.pg_tables where schemaname = 'public' and tablename = 'users'`
  );
  const count = res.rows[0].count;
  if (count == 1) {
    return Promise.resolve();
  }
  return knex.raw(`
CREATE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
   NEW.date_mesure_update = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';

CREATE FUNCTION update_mesures_departement() RETURNS trigger AS $$
  BEGIN
   update mesures set department_id = (
     select departements.id from departements where departements.code = substring(NEW.code_postal, 0,3)
   ) where id = NEW.id;
   return NEW;
  END;
$$ language 'plpgsql';

CREATE TABLE public.direction (
    id integer NOT NULL,
    region_id integer,
    user_id integer,
    department_id integer
);


CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type character varying(255),
    last_login timestamp with time zone,
    active boolean DEFAULT false,
    reset_password_token character varying(255),
    reset_password_expires timestamp with time zone,
    nom character varying(255),
    prenom character varying(255),
    cabinet character varying(255),
    email character varying(255)
);


CREATE TABLE public.mesures_import (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    processed_at timestamp with time zone,
    content jsonb,
    file_name character varying(255) NOT NULL,
    file_size integer NOT NULL,
    file_type character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    user_id integer NOT NULL,
    antenne_id integer
);


CREATE TABLE public.mandataires (
    id integer NOT NULL,
    etablissement character varying(255) NOT NULL,
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    telephone character varying(255) NOT NULL,
    adresse character varying(255) NOT NULL,
    mesures_en_cours integer DEFAULT 0 NOT NULL,
    dispo_max integer,
    user_id integer,
    telephone_portable character varying(255),
    secretariat boolean,
    nb_secretariat real,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_mesure_update timestamp with time zone,
    email_send timestamp with time zone,
    genre character varying(255),
    mesures_en_attente integer DEFAULT 0 NOT NULL,
    zip text,
    department_id integer NOT NULL,
    siret character varying(255)
);


CREATE TABLE public.mesures (
    id integer NOT NULL,
    code_postal character varying(255),
    ville character varying(255),
    etablissement character varying(255),
    mandataire_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    annee character varying(255),
    type character varying(255),
    date_ouverture date,
    residence character varying(255),
    civilite character varying(255),
    status character varying(255),
    extinction date,
    etablissement_id integer,
    ti_id integer,
    numero_dossier character varying(255),
    cabinet character varying(255),
    reason_extinction character varying(255),
    numero_rg character varying(255),
    department_id integer,
    antenne_id integer
);


CREATE TABLE public.mandataire_etablissements (
    id integer NOT NULL,
    etablissement_id integer,
    mandataire_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE public.service_antenne (
    id integer NOT NULL,
    service_id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    headquarters boolean DEFAULT false NOT NULL,
    address_street character varying(255),
    address_zip_code character varying(255),
    address_city character varying(255),
    contact_lastname character varying(255),
    contact_firstname character varying(255),
    contact_email character varying(255),
    contact_phone character varying(255),
    mesures_awaiting integer DEFAULT 0 NOT NULL,
    mesures_in_progress integer DEFAULT 0 NOT NULL,
    mesures_max integer DEFAULT 0 NOT NULL,
    date_mesure_update timestamp with time zone,
    bak_mandataire_id integer
);


CREATE TABLE public.user_antenne (
    id integer NOT NULL,
    user_id integer,
    antenne_id integer
);


CREATE TABLE public.commentaires (
    id integer NOT NULL,
    comment text,
    mandataire_id integer,
    ti_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    antenne_id integer
);


CREATE TABLE public.city (
    id integer NOT NULL,
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    latitude character varying(255) NOT NULL,
    longitude character varying(255) NOT NULL
);


CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;


CREATE TABLE public.geolocalisation_code_postal (
    id integer NOT NULL,
    code_postal character varying(255),
    latitude real,
    longitude real,
    cities text[]
);


CREATE SEQUENCE public."codePostalLatLngs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."codePostalLatLngs_id_seq" OWNED BY public.geolocalisation_code_postal.id;


CREATE SEQUENCE public.commentaires_co_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commentaires_co_id_seq OWNED BY public.commentaires.id;


CREATE TABLE public.departements (
    id integer NOT NULL,
    id_region integer,
    code character varying(255) NOT NULL,
    nom character varying(255) NOT NULL
);


CREATE SEQUENCE public.departements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departements_id_seq OWNED BY public.departements.id;


CREATE SEQUENCE public.direction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.direction_id_seq OWNED BY public.direction.id;


CREATE TABLE public.etablissements (
    id integer NOT NULL,
    id_finess character varying(20),
    nom character varying(100) NOT NULL,
    adresse character varying(255),
    code_postal character varying(10),
    ville character varying(100),
    tel character varying(15),
    fax character varying(15),
    latitude real,
    longitude real
);


CREATE SEQUENCE public.etablissements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etablissements_id_seq OWNED BY public.etablissements.id;


CREATE TABLE public.logs_data (
    id integer NOT NULL,
    user_id integer,
    action character varying(255),
    result character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE SEQUENCE public.logs_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logs_data_id_seq OWNED BY public.logs_data.id;


CREATE TABLE public.magistrat (
    id integer NOT NULL,
    user_id integer NOT NULL,
    ti_id integer NOT NULL
);


CREATE SEQUENCE public.magistrat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.magistrat_id_seq OWNED BY public.magistrat.id;


CREATE SEQUENCE public."mandatairesEtablissements_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."mandatairesEtablissements_id_seq" OWNED BY public.mandataire_etablissements.id;


CREATE SEQUENCE public.mandataires_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mandataires_id_seq OWNED BY public.mandataires.id;


CREATE SEQUENCE public.mesures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesures_id_seq OWNED BY public.mesures.id;


CREATE SEQUENCE public.mesures_import_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesures_import_id_seq OWNED BY public.mesures_import.id;


CREATE TABLE public.regions (
    id integer NOT NULL,
    nom character varying(255) NOT NULL
);


CREATE SEQUENCE public.regions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.regions_id_seq OWNED BY public.regions.id;


CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


CREATE TABLE public.service_admin (
    id integer NOT NULL,
    user_id integer,
    service_id integer
);


CREATE SEQUENCE public.service_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_admin_id_seq OWNED BY public.service_admin.id;


CREATE SEQUENCE public.service_antenne_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_antenne_id_seq OWNED BY public.service_antenne.id;


CREATE TABLE public.service_tis (
    id integer NOT NULL,
    ti_id integer,
    service_id integer NOT NULL
);


CREATE SEQUENCE public.service_tis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_tis_id_seq OWNED BY public.service_tis.id;


CREATE TABLE public.services (
    id integer NOT NULL,
    etablissement character varying(255),
    email character varying(255),
    nom character varying(255),
    prenom character varying(255),
    code_postal character varying(255),
    ville character varying(255),
    telephone character varying(255),
    adresse character varying(255),
    dispo_max integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    information character varying(255),
    department_id integer NOT NULL
);


CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


CREATE TABLE public.tis (
    id integer NOT NULL,
    etablissement character varying(255) NOT NULL,
    email character varying(255),
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    telephone character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    siret character varying(255)
);


CREATE SEQUENCE public.tis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tis_id_seq OWNED BY public.tis.id;


CREATE SEQUENCE public.user_antenne_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_antenne_id_seq OWNED BY public.user_antenne.id;


CREATE TABLE public.user_role (
    id integer NOT NULL,
    role_id integer,
    user_id integer
);


CREATE SEQUENCE public.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_role_id_seq OWNED BY public.user_role.id;


CREATE TABLE public.user_tis (
    id integer NOT NULL,
    ti_id integer,
    user_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


CREATE SEQUENCE public.users_tis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_tis_id_seq OWNED BY public.user_tis.id;


CREATE VIEW public.view_mesure_gestionnaire AS
 SELECT concat('service-', ser.id) AS id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    dep.id AS department_id,
    dep.nom AS dep_nom,
    ser.dispo_max AS mesures_max,
    sum(ant.mesures_awaiting) AS mesures_awaiting,
    sum(ant.mesures_in_progress) AS mesures_in_progress,
    ((ser.dispo_max - sum(ant.mesures_awaiting)) - sum(ant.mesures_in_progress)) AS remaining_capacity
   FROM public.services ser,
    public.service_antenne ant,
    public.departements dep
  WHERE ((ser.id = ant.service_id) AND (dep.id = ser.department_id))
  GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    dep.id AS department_id,
    dep.nom AS dep_nom,
    man.dispo_max AS mesures_max,
    man.mesures_en_attente AS mesures_awaiting,
    man.mesures_en_cours AS mesures_in_progress,
    ((man.dispo_max - man.mesures_en_attente) - man.mesures_en_cours) AS remaining_capacity
   FROM public.mandataires man,
    public.departements dep,
    public.users u
  WHERE ((dep.id = man.department_id) AND (man.user_id = u.id));


CREATE VIEW public.view_department_availability AS
 SELECT view_mesure_gestionnaire.department_id,
    sum(view_mesure_gestionnaire.mesures_awaiting) AS mesures_awaiting,
    sum(view_mesure_gestionnaire.mesures_in_progress) AS mesures_in_progress,
    sum(view_mesure_gestionnaire.mesures_max) AS mesures_max
   FROM public.view_mesure_gestionnaire
  GROUP BY view_mesure_gestionnaire.department_id;


CREATE VIEW public.view_mesure_gestionnaire_tis AS
 SELECT concat(u.type, '-', m.id) AS id,
    NULL::integer AS service_id,
    m.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    uti.ti_id
   FROM public.users u,
    public.user_tis uti,
    public.mandataires m
  WHERE ((u.id = m.user_id) AND (u.id = uti.user_id))
UNION
 SELECT concat('service-', sti.service_id) AS id,
    sti.service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    sti.ti_id
   FROM public.service_tis sti;


ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);


ALTER TABLE ONLY public.commentaires ALTER COLUMN id SET DEFAULT nextval('public.commentaires_co_id_seq'::regclass);


ALTER TABLE ONLY public.departements ALTER COLUMN id SET DEFAULT nextval('public.departements_id_seq'::regclass);


ALTER TABLE ONLY public.direction ALTER COLUMN id SET DEFAULT nextval('public.direction_id_seq'::regclass);


ALTER TABLE ONLY public.etablissements ALTER COLUMN id SET DEFAULT nextval('public.etablissements_id_seq'::regclass);


ALTER TABLE ONLY public.geolocalisation_code_postal ALTER COLUMN id SET DEFAULT nextval('public."codePostalLatLngs_id_seq"'::regclass);


ALTER TABLE ONLY public.logs_data ALTER COLUMN id SET DEFAULT nextval('public.logs_data_id_seq'::regclass);


ALTER TABLE ONLY public.magistrat ALTER COLUMN id SET DEFAULT nextval('public.magistrat_id_seq'::regclass);


ALTER TABLE ONLY public.mandataire_etablissements ALTER COLUMN id SET DEFAULT nextval('public."mandatairesEtablissements_id_seq"'::regclass);


ALTER TABLE ONLY public.mandataires ALTER COLUMN id SET DEFAULT nextval('public.mandataires_id_seq'::regclass);


ALTER TABLE ONLY public.mesures ALTER COLUMN id SET DEFAULT nextval('public.mesures_id_seq'::regclass);


ALTER TABLE ONLY public.mesures_import ALTER COLUMN id SET DEFAULT nextval('public.mesures_import_id_seq'::regclass);


ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);


ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


ALTER TABLE ONLY public.service_admin ALTER COLUMN id SET DEFAULT nextval('public.service_admin_id_seq'::regclass);


ALTER TABLE ONLY public.service_antenne ALTER COLUMN id SET DEFAULT nextval('public.service_antenne_id_seq'::regclass);


ALTER TABLE ONLY public.service_tis ALTER COLUMN id SET DEFAULT nextval('public.service_tis_id_seq'::regclass);


ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


ALTER TABLE ONLY public.tis ALTER COLUMN id SET DEFAULT nextval('public.tis_id_seq'::regclass);


ALTER TABLE ONLY public.user_antenne ALTER COLUMN id SET DEFAULT nextval('public.user_antenne_id_seq'::regclass);


ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);


ALTER TABLE ONLY public.user_tis ALTER COLUMN id SET DEFAULT nextval('public.users_tis_id_seq'::regclass);


ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.geolocalisation_code_postal
    ADD CONSTRAINT "codePostalLatLngs_pkey" PRIMARY KEY (id);


ALTER TABLE ONLY public.geolocalisation_code_postal
    ADD CONSTRAINT codepostallatlngs_code_postal_unique UNIQUE (code_postal);


ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.direction
    ADD CONSTRAINT direction_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.etablissements
    ADD CONSTRAINT etablissements_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.logs_data
    ADD CONSTRAINT logs_data_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_user_id_unique UNIQUE (user_id);


ALTER TABLE ONLY public.mandataire_etablissements
    ADD CONSTRAINT "mandatairesEtablissements_pkey" PRIMARY KEY (id);


ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_siret_unique UNIQUE (siret);


ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_user_id_unique UNIQUE (user_id);


ALTER TABLE ONLY public.mesures_import
    ADD CONSTRAINT mesures_import_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey1 PRIMARY KEY (id);


ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_name_unique UNIQUE (name);


ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.service_admin
    ADD CONSTRAINT service_admin_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.service_admin
    ADD CONSTRAINT service_admin_user_id_service_id_unique UNIQUE (user_id, service_id);


ALTER TABLE ONLY public.service_antenne
    ADD CONSTRAINT service_antenne_bak_mandataire_id_unique UNIQUE (bak_mandataire_id);


ALTER TABLE ONLY public.service_antenne
    ADD CONSTRAINT service_antenne_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_ti_id_service_id_unique UNIQUE (ti_id, service_id);


ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.tis
    ADD CONSTRAINT tis_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.tis
    ADD CONSTRAINT tis_siret_unique UNIQUE (siret);


ALTER TABLE ONLY public.user_antenne
    ADD CONSTRAINT user_antenne_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.user_antenne
    ADD CONSTRAINT user_antenne_user_id_antenne_id_unique UNIQUE (user_id, antenne_id);


ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.user_tis
    ADD CONSTRAINT users_tis_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


CREATE INDEX etablissements_code_postal_index ON public.etablissements USING btree (code_postal);


CREATE INDEX etablissements_latitude_index ON public.etablissements USING btree (latitude);


CREATE INDEX etablissements_longitude_index ON public.etablissements USING btree (longitude);


CREATE INDEX etablissements_nom_index ON public.etablissements USING btree (nom);


CREATE INDEX service_admin_service_id_index ON public.service_admin USING btree (service_id);


CREATE INDEX service_admin_user_id_index ON public.service_admin USING btree (user_id);


CREATE INDEX user_antenne_antenne_id_index ON public.user_antenne USING btree (antenne_id);


CREATE INDEX user_antenne_user_id_index ON public.user_antenne USING btree (user_id);


CREATE INDEX user_role_role_id_index ON public.user_role USING btree (role_id);


CREATE INDEX user_role_user_id_index ON public.user_role USING btree (user_id);


CREATE TRIGGER mandataires_updated_at BEFORE UPDATE ON public.mandataires FOR EACH ROW WHEN ((old.mesures_en_cours IS DISTINCT FROM new.mesures_en_cours)) EXECUTE PROCEDURE public.on_update_timestamp();


CREATE TRIGGER on_update_mesures_code_postal AFTER INSERT OR UPDATE OF code_postal ON public.mesures FOR EACH ROW EXECUTE PROCEDURE public.update_mesures_departement();


ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_antenne_id_foreign FOREIGN KEY (antenne_id) REFERENCES public.service_antenne(id);


ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);


ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);


ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_id_region_foreign FOREIGN KEY (id_region) REFERENCES public.regions(id);


ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);


ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);


ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


ALTER TABLE ONLY public.mandataire_etablissements
    ADD CONSTRAINT mandatairesetablissements_etablissement_id_foreign FOREIGN KEY (etablissement_id) REFERENCES public.etablissements(id);


ALTER TABLE ONLY public.mandataire_etablissements
    ADD CONSTRAINT mandatairesetablissements_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);


ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_antenne_id_foreign FOREIGN KEY (antenne_id) REFERENCES public.service_antenne(id);


ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);


ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_etablissement_id_foreign FOREIGN KEY (etablissement_id) REFERENCES public.etablissements(id);


ALTER TABLE ONLY public.mesures_import
    ADD CONSTRAINT mesures_import_antenne_id_foreign FOREIGN KEY (antenne_id) REFERENCES public.service_antenne(id);


ALTER TABLE ONLY public.mesures_import
    ADD CONSTRAINT mesures_import_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);


ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);


ALTER TABLE ONLY public.service_admin
    ADD CONSTRAINT service_admin_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);


ALTER TABLE ONLY public.service_admin
    ADD CONSTRAINT service_admin_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


ALTER TABLE ONLY public.service_antenne
    ADD CONSTRAINT service_antenne_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);


ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);


ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);


ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);


ALTER TABLE ONLY public.user_antenne
    ADD CONSTRAINT user_antenne_antenne_id_foreign FOREIGN KEY (antenne_id) REFERENCES public.service_antenne(id);


ALTER TABLE ONLY public.user_antenne
    ADD CONSTRAINT user_antenne_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.role(id);


ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


ALTER TABLE ONLY public.user_tis
    ADD CONSTRAINT users_tis_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);


ALTER TABLE ONLY public.user_tis
    ADD CONSTRAINT users_tis_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
  `);
};

exports.down = function (knex) {
  return knex.raw(`
drop view view_department_availability;
drop view view_mesure_gestionnaire;
drop view view_mesure_gestionnaire_tis;
drop table user_role;
drop table user_tis;
drop table logs_data;
drop table service_tis;
drop table service_admin;
drop table role;
drop table city;
drop table commentaires;
drop table direction;
drop table geolocalisation_code_postal;
drop table magistrat;
drop table mandataire_etablissements;
drop table mesures;
drop table mesures_import;
drop table user_antenne;
drop table service_antenne;
drop table services;
drop table mandataires;
drop table etablissements;
drop table users;
drop table tis;
drop table departements;
drop table regions;
  `);
};
