CREATE TYPE public.cause_sortie_type AS ENUM (
    'mainlevee',
    'deces',
    'caducite',
    'dessaisissement_famille',
    'dessaisissement_autre_mjpm'
);
CREATE TYPE public.champ_mesure_type AS ENUM (
    'protection_bien',
    'protection_personne',
    'protection_bien_personne'
);
CREATE TYPE public.civilite_type AS ENUM (
    'monsieur',
    'madame'
);
CREATE TYPE public.lieu_vie_type AS ENUM (
    'domicile',
    'etablissement',
    'etablissement_conservation_domicile',
    'sdf'
);
CREATE TYPE public.mesure_status_type AS ENUM (
    'en_attente',
    'en_cours',
    'eteinte'
);
CREATE TYPE public.nature_mesure_type AS ENUM (
    'curatelle_simple',
    'curatelle_renforcee',
    'tutelle',
    'sauvegarde_justice',
    'mesure_accompagnement_judiciaire',
    'subroge_curateur',
    'subroge_tuteur',
    'mandat_protection_future',
    'mesure_ad_hoc'
);
CREATE TYPE public.resultat_revision_type AS ENUM (
    'aggravation',
    'allegement',
    'dessaisissement_autre_mjpm',
    'dessaisissement_famille',
    'mainlevee',
    'reconduction'
);
CREATE TYPE public.type_etablissement_type AS ENUM (
    'etablissement_handicapes',
    'autre_etablissement_s_ms',
    'etablissement_hospitalier',
    'etablissement_psychiatrique',
    'autre_etablissement',
    'etablissement_personne_agee'
);
CREATE TABLE public.access_tokens (
    id integer NOT NULL,
    user_id integer NOT NULL,
    access_token character varying(255) NOT NULL,
    editor_id integer NOT NULL,
    editor_url character varying(255) NOT NULL,
    expired boolean DEFAULT false,
    expired_on timestamp with time zone,
    refresh_token character varying(255),
    refresh_token_expires_on timestamp with time zone
);
CREATE SEQUENCE public.access_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.access_tokens_id_seq OWNED BY public.access_tokens.id;
CREATE TABLE public.api_logs (
    id integer NOT NULL,
    editor_id integer,
    token character varying(1200),
    request_url character varying(255),
    request_method character varying(255),
    request_params jsonb,
    response jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.api_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.api_logs_id_seq OWNED BY public.api_logs.id;
CREATE TABLE public.authorization_codes (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    code character varying(255),
    redirect_uri character varying(255),
    client_id integer NOT NULL,
    user_id integer NOT NULL,
    expires_at timestamp with time zone
);
CREATE SEQUENCE public.authorization_codes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.authorization_codes_id_seq OWNED BY public.authorization_codes.id;
CREATE TABLE public.geolocalisation_code_postal (
    id integer NOT NULL,
    code_postal character varying(255),
    latitude real,
    longitude real,
    cities character varying(255),
    insee character varying(255)
);
CREATE SEQUENCE public."codePostalLatLngs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."codePostalLatLngs_id_seq" OWNED BY public.geolocalisation_code_postal.id;
CREATE TABLE public.commentaires (
    id integer NOT NULL,
    comment text,
    mandataire_id integer,
    ti_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    service_id integer
);
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
CREATE TABLE public.direction (
    id integer NOT NULL,
    region_id integer,
    user_id integer,
    department_id integer,
    type character varying(255)
);
CREATE SEQUENCE public.direction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.direction_id_seq OWNED BY public.direction.id;
CREATE TABLE public.editor_token_requests (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.editor_token_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.editor_token_requests_id_seq OWNED BY public.editor_token_requests.id;
CREATE TABLE public.editors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    api_token character varying(255) NOT NULL,
    redirect_uris jsonb DEFAULT '[]'::jsonb
);
CREATE SEQUENCE public.editors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.editors_id_seq OWNED BY public.editors.id;
CREATE TABLE public.enquete_reponses (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    submitted_at timestamp with time zone,
    enquete_id integer,
    mandataire_id integer,
    service_id integer,
    enquete_reponses_informations_mandataire_id integer,
    enquete_reponses_prestations_sociale_id integer,
    enquete_reponses_agrements_formations_id integer,
    enquete_reponses_activite_id integer,
    enquete_reponses_populations_id integer,
    enquete_reponses_modalites_exercice_id integer,
    enquete_reponses_financement_id integer,
    enquete_reponses_prepose_personel_formation_id integer,
    enquete_reponses_prepose_prestations_sociales_id integer,
    status character varying(255) DEFAULT 'draft'::character varying,
    uploaded_on timestamp with time zone,
    enquete_reponses_service_informations_id integer,
    user_type character varying(255) NOT NULL,
    enquete_reponses_service_personnel_formation_id integer,
    departement_id integer
);
CREATE TABLE public.enquete_reponses_activite (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    curatelle_renforcee_etablissement_debut_annee integer,
    curatelle_renforcee_etablissement_fin_annee integer,
    curatelle_renforcee_domicile_debut_annee integer,
    curatelle_renforcee_domicile_fin_annee integer,
    curatelle_simple_etablissement_debut_annee integer,
    curatelle_simple_etablissement_fin_annee integer,
    curatelle_simple_domicile_debut_annee integer,
    curatelle_simple_domicile_fin_annee integer,
    tutelle_etablissement_debut_annee integer,
    tutelle_etablissement_fin_annee integer,
    tutelle_domicile_debut_annee integer,
    tutelle_domicile_fin_annee integer,
    accompagnement_judiciaire_etablissement_debut_annee integer,
    accompagnement_judiciaire_etablissement_fin_annee integer,
    accompagnement_judiciaire_domicile_debut_annee integer,
    accompagnement_judiciaire_domicile_fin_annee integer,
    curatelle_biens_etablissement_debut_annee integer,
    curatelle_biens_etablissement_fin_annee integer,
    curatelle_biens_domicile_debut_annee integer,
    curatelle_biens_domicile_fin_annee integer,
    curatelle_personne_etablissement_debut_annee integer,
    curatelle_personne_etablissement_fin_annee integer,
    curatelle_personne_domicile_debut_annee integer,
    curatelle_personne_domicile_fin_annee integer,
    revisions_main_levee integer,
    revisions_masp integer,
    revisions_reconduction integer,
    revisions_changement integer,
    revisions_autre integer,
    sorties_main_levee integer,
    sorties_deces integer,
    sorties_masp integer,
    curatelle_renforcee_etablissement_mesures_nouvelles integer,
    curatelle_renforcee_etablissement_sortie_mesures integer,
    curatelle_renforcee_domicile_mesures_nouvelles integer,
    curatelle_renforcee_domicile_sortie_mesures integer,
    curatelle_simple_etablissement_mesures_nouvelles integer,
    curatelle_simple_etablissement_sortie_mesures integer,
    curatelle_simple_domicile_mesures_nouvelles integer,
    curatelle_simple_domicile_sortie_mesures integer,
    tutelle_etablissement_mesures_nouvelles integer,
    tutelle_etablissement_sortie_mesures integer,
    tutelle_domicile_mesures_nouvelles integer,
    tutelle_domicile_sortie_mesures integer,
    accompagnement_judiciaire_etablissement_mesures_nouvelles integer,
    accompagnement_judiciaire_etablissement_sortie_mesures integer,
    accompagnement_judiciaire_domicile_mesures_nouvelles integer,
    accompagnement_judiciaire_domicile_sortie_mesures integer,
    curatelle_biens_etablissement_mesures_nouvelles integer,
    curatelle_biens_etablissement_sortie_mesures integer,
    curatelle_biens_domicile_mesures_nouvelles integer,
    curatelle_biens_domicile_sortie_mesures integer,
    curatelle_personne_etablissement_mesures_nouvelles integer,
    curatelle_personne_etablissement_sortie_mesures integer,
    curatelle_personne_domicile_mesures_nouvelles integer,
    curatelle_personne_domicile_sortie_mesures integer,
    subroge_tuteur_createur_debut_annee integer,
    subroge_tuteur_createur_mesures_nouvelles integer,
    subroge_tuteur_createur_sortie_mesures integer,
    subroge_tuteur_createur_fin_annee integer,
    sauvegarde_justice_debut_annee integer,
    sauvegarde_justice_mesures_nouvelles integer,
    sauvegarde_justice_sortie_mesures integer,
    sauvegarde_justice_fin_annee integer,
    mandat_adhoc_majeur_debut_annee integer,
    mandat_adhoc_majeur_mesures_nouvelles integer,
    mandat_adhoc_majeur_sortie_mesures integer,
    mandat_adhoc_majeur_fin_annee integer
);
CREATE SEQUENCE public.enquete_reponses_activite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_activite_id_seq OWNED BY public.enquete_reponses_activite.id;
CREATE TABLE public.enquete_reponses_agrements_formations (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    annee_agrement integer,
    nb_departements character varying(255),
    annee_debut_activite integer,
    cumul_delegue_service boolean,
    cumul_delegue_service_etp character varying(255),
    cumul_prepose boolean,
    cumul_prepose_etp character varying(255),
    debut_activite_avant_2009 boolean,
    niveau_qualification integer,
    secretaire_specialise boolean,
    nb_mesures_dep_finance integer,
    nb_mesures_dep_autres integer,
    cnc_annee_obtention integer,
    cnc_heures_formation real,
    secretaire_specialise_etp_n1 real,
    secretaire_specialise_etp_n2 real,
    secretaire_specialise_etp_n3 real,
    secretaire_specialise_etp_n4 real,
    secretaire_specialise_etp_n5 real,
    secretaire_specialise_etp_n6 real
);
CREATE SEQUENCE public.enquete_reponses_agrements_formations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_agrements_formations_id_seq OWNED BY public.enquete_reponses_agrements_formations.id;
CREATE TABLE public.enquete_reponses_financement (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    charges_personnel numeric(16,8),
    charges_preposes numeric(16,8),
    charges_fonctionnement numeric(16,8),
    produits_bareme_prelevements numeric(16,8),
    autre_produits numeric(16,8),
    financement_public numeric(16,8),
    aide_sociale_conseil_departemental numeric(16,8)
);
CREATE SEQUENCE public.enquete_reponses_financement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_financement_id_seq OWNED BY public.enquete_reponses_financement.id;
CREATE SEQUENCE public.enquete_reponses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_id_seq OWNED BY public.enquete_reponses.id;
CREATE TABLE public.enquete_reponses_informations_mandataire (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    benevole boolean,
    forme_juridique character varying(255),
    sexe character varying(255),
    anciennete character varying(255),
    estimation_etp character varying(255),
    secretaire_specialise_etp real,
    local_professionnel boolean,
    departement character varying(255),
    region character varying(255),
    nom character varying(255),
    exerce_seul_activite boolean,
    exerce_secretaires_specialises boolean,
    tranche_age character varying(255)
);
CREATE SEQUENCE public.enquete_reponses_informations_mandataire_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_informations_mandataire_id_seq OWNED BY public.enquete_reponses_informations_mandataire.id;
CREATE TABLE public.enquete_reponses_modalites_exercice (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    departement character varying(255),
    region character varying(255),
    raison_sociale character varying(255),
    personnalite_juridique_etablissement character varying(255),
    total_mesures_etablissements integer,
    nombre_lits_journee_hospitalisation jsonb,
    actions_information_tuteurs_familiaux boolean,
    activite_exercee_par character varying(255),
    etablissements_type character varying(255)
);
CREATE SEQUENCE public.enquete_reponses_modalite_exercice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_modalite_exercice_id_seq OWNED BY public.enquete_reponses_modalites_exercice.id;
CREATE TABLE public.enquete_reponses_populations (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    tutelle_age_inf_25_ans_homme integer,
    tutelle_age_inf_25_ans_femme integer,
    tutelle_age_25_39_ans_homme integer,
    tutelle_age_25_39_ans_femme integer,
    tutelle_age_40_59_ans_homme integer,
    tutelle_age_40_59_ans_femme integer,
    tutelle_age_60_74_ans_homme integer,
    tutelle_age_60_74_ans_femme integer,
    tutelle_age_sup_75_ans_homme integer,
    tutelle_age_sup_75_ans_femme integer,
    curatelle_age_inf_25_ans_homme integer,
    curatelle_age_inf_25_ans_femme integer,
    curatelle_age_25_39_ans_homme integer,
    curatelle_age_25_39_ans_femme integer,
    curatelle_age_40_59_ans_homme integer,
    curatelle_age_40_59_ans_femme integer,
    curatelle_age_60_74_ans_homme integer,
    curatelle_age_60_74_ans_femme integer,
    curatelle_age_sup_75_ans_homme integer,
    curatelle_age_sup_75_ans_femme integer,
    maj_age_inf_25_ans_homme integer,
    maj_age_inf_25_ans_femme integer,
    maj_age_25_39_ans_homme integer,
    maj_age_25_39_ans_femme integer,
    maj_age_40_59_ans_homme integer,
    maj_age_40_59_ans_femme integer,
    maj_age_60_74_ans_homme integer,
    maj_age_60_74_ans_femme integer,
    maj_age_sup_75_ans_homme integer,
    maj_age_sup_75_ans_femme integer,
    sauvegarde_justice_age_inf_25_ans_homme integer,
    sauvegarde_justice_age_inf_25_ans_femme integer,
    sauvegarde_justice_age_25_39_ans_homme integer,
    sauvegarde_justice_age_25_39_ans_femme integer,
    sauvegarde_justice_age_40_59_ans_homme integer,
    sauvegarde_justice_age_40_59_ans_femme integer,
    sauvegarde_justice_age_60_74_ans_homme integer,
    sauvegarde_justice_age_60_74_ans_femme integer,
    sauvegarde_justice_age_sup_75_ans_homme integer,
    sauvegarde_justice_age_sup_75_ans_femme integer,
    autre_mesures_age_inf_25_ans_homme integer,
    autre_mesures_age_inf_25_ans_femme integer,
    autre_mesures_age_25_39_ans_homme integer,
    autre_mesures_age_25_39_ans_femme integer,
    autre_mesures_age_40_59_ans_homme integer,
    autre_mesures_age_40_59_ans_femme integer,
    autre_mesures_age_60_74_ans_homme integer,
    autre_mesures_age_60_74_ans_femme integer,
    autre_mesures_age_sup_75_ans_homme integer,
    autre_mesures_age_sup_75_ans_femme integer,
    tutelle_anciennete_inf_1_an integer,
    tutelle_anciennete_1_3_ans integer,
    tutelle_anciennete_3_5_ans integer,
    tutelle_anciennete_5_10_ans integer,
    tutelle_anciennete_sup_10_ans integer,
    curatelle_anciennete_inf_1_an integer,
    curatelle_anciennete_1_3_ans integer,
    curatelle_anciennete_3_5_ans integer,
    curatelle_anciennete_5_10_ans integer,
    curatelle_anciennete_sup_10_ans integer,
    maj_anciennete_inf_1_an integer,
    maj_anciennete_1_3_ans integer,
    maj_anciennete_3_5_ans integer,
    maj_anciennete_5_10_ans integer,
    maj_anciennete_sup_10_ans integer,
    sauvegarde_justice_anciennete_inf_1_an integer,
    sauvegarde_justice_anciennete_1_3_ans integer,
    sauvegarde_justice_anciennete_3_5_ans integer,
    sauvegarde_justice_anciennete_5_10_ans integer,
    sauvegarde_justice_anciennete_sup_10_ans integer,
    autre_mesures_anciennete_inf_1_an integer,
    autre_mesures_anciennete_1_3_ans integer,
    autre_mesures_anciennete_3_5_ans integer,
    autre_mesures_anciennete_5_10_ans integer,
    autre_mesures_anciennete_sup_10_ans integer,
    tutelle_etablissement_personne_handicapee integer,
    tutelle_service_personne_handicapee integer,
    tutelle_ehpad integer,
    tutelle_autre_etablissement_personne_agee integer,
    tutelle_chrs integer,
    tutelle_service_hospitalier_soins_longue_duree integer,
    tutelle_service_psychiatrique integer,
    tutelle_autre_service integer,
    curatelle_etablissement_personne_handicapee integer,
    curatelle_service_personne_handicapee integer,
    curatelle_ehpad integer,
    curatelle_autre_etablissement_personne_agee integer,
    curatelle_chrs integer,
    curatelle_service_hospitalier_soins_longue_duree integer,
    curatelle_service_psychiatrique integer,
    curatelle_autre_service integer,
    maj_etablissement_personne_handicapee integer,
    maj_service_personne_handicapee integer,
    maj_ehpad integer,
    maj_autre_etablissement_personne_agee integer,
    maj_chrs integer,
    maj_service_hospitalier_soins_longue_duree integer,
    maj_service_psychiatrique integer,
    maj_autre_service integer,
    sauvegarde_justice_etablissement_personne_handicapee integer,
    sauvegarde_justice_service_personne_handicapee integer,
    sauvegarde_justice_ehpad integer,
    sauvegarde_justice_autre_etablissement_personne_agee integer,
    sauvegarde_justice_chrs integer,
    sauvegarde_justice_service_hospitalier_soins_longue_duree integer,
    sauvegarde_justice_service_psychiatrique integer,
    sauvegarde_justice_autre_service integer,
    autre_mesures_etablissement_personne_handicapee integer,
    autre_mesures_service_personne_handicapee integer,
    autre_mesures_ehpad integer,
    autre_mesures_autre_etablissement_personne_agee integer,
    autre_mesures_chrs integer,
    autre_mesures_service_hospitalier_soins_longue_duree integer,
    autre_mesures_service_psychiatrique integer,
    autre_mesures_autre_service integer
);
CREATE SEQUENCE public.enquete_reponses_populations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_populations_id_seq OWNED BY public.enquete_reponses_populations.id;
CREATE TABLE public.enquete_reponses_prepose_personel_formation (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    nb_preposes_mjpm integer,
    nb_preposes_mjpm_etp real,
    formation_preposes_mjpm jsonb,
    niveaux_qualification jsonb,
    nb_preposes_homme integer,
    nb_preposes_femme integer,
    nb_autre_personnel integer,
    nb_autre_personnel_etp real
);
CREATE SEQUENCE public.enquete_reponses_prepose_personel_formation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_prepose_personel_formation_id_seq OWNED BY public.enquete_reponses_prepose_personel_formation.id;
CREATE TABLE public.enquete_reponses_prepose_prestations_sociales (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    tutelle jsonb,
    curatelle_simple jsonb,
    curatelle_renforcee jsonb,
    sauvegarde_autres_mesures jsonb,
    maj jsonb,
    aah real,
    pch real,
    asi real,
    rsa real,
    als_apl real,
    aspa real,
    apa real
);
CREATE SEQUENCE public.enquete_reponses_prepose_prestations_sociales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_prepose_prestations_sociales_id_seq OWNED BY public.enquete_reponses_prepose_prestations_sociales.id;
CREATE TABLE public.enquete_reponses_prestations_sociales (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    aah integer,
    pch integer,
    asi integer,
    rsa integer,
    als_apl integer,
    aspa integer,
    apa integer
);
CREATE SEQUENCE public.enquete_reponses_prestations_sociales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_prestations_sociales_id_seq OWNED BY public.enquete_reponses_prestations_sociales.id;
CREATE TABLE public.enquete_reponses_service_informations (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    departement character varying(255),
    region character varying(255),
    nom character varying(255),
    nb_structures_concernees integer,
    affiliation_federation character varying(255),
    type_organisme_gestionnaire character varying(255)
);
CREATE SEQUENCE public.enquete_reponses_service_informations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_reponses_service_informations_id_seq OWNED BY public.enquete_reponses_service_informations.id;
CREATE TABLE public.enquete_reponses_service_personnel_formation (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    nb_delegues integer,
    nb_delegues_etp real,
    nb_delegues_cnc integer,
    nb_delegues_en_formation integer,
    total_heures_delegues_en_formation real,
    nb_delegues_non_formes integer,
    nb_delegues_niveau1 integer,
    nb_delegues_niveau1_etp real,
    nb_delegues_niveau2 integer,
    nb_delegues_niveau2_etp real,
    nb_delegues_niveau3 integer,
    nb_delegues_niveau3_etp real,
    nb_delegues_niveau4 integer,
    nb_delegues_niveau4_etp real,
    nb_delegues_niveau5 integer,
    nb_delegues_niveau5_etp real,
    nb_delegues_niveau6 integer,
    nb_delegues_niveau6_etp real,
    nb_delegues_homme integer,
    nb_delegues_homme_etp real,
    nb_delegues_femme integer,
    nb_delegues_femme_etp real
);
CREATE SEQUENCE public.enquete_service_personnel_formation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_service_personnel_formation_id_seq OWNED BY public.enquete_reponses_service_personnel_formation.id;
CREATE TABLE public.enquete_services (
    id integer NOT NULL,
    service_id integer NOT NULL,
    nombre_postes_delegues_etp real,
    nombre_delegues integer,
    nombre_poste_autre_personnel_etp real,
    nombre_delegues_cnc integer,
    nombre_delegues_cnc_pjm integer,
    nombre_delegues_cnc_maj integer,
    nombre_delegues_cnc_dpf integer,
    nombre_delegues_en_formation integer,
    nombre_delegues_non_formes integer
);
CREATE SEQUENCE public.enquete_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquete_services_id_seq OWNED BY public.enquete_services.id;
CREATE TABLE public.enquetes (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    annee character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    date_fin timestamp with time zone
);
CREATE SEQUENCE public.enquetes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.enquetes_id_seq OWNED BY public.enquetes.id;
CREATE TABLE public.etablissements (
    id integer NOT NULL,
    nofinesset character varying(20),
    departement_id integer,
    nofinessej character varying(255),
    rs character varying(255),
    rslongue character varying(255),
    complrs character varying(255),
    compldistrib character varying(255),
    numvoie character varying(255),
    typvoie character varying(255),
    voie character varying(255),
    compvoie character varying(255),
    lieuditbp character varying(255),
    commune character varying(255),
    libdepartement character varying(255),
    ligneacheminement character varying(255),
    telephone character varying(255),
    telecopie character varying(255),
    categetab character varying(255),
    libcategetab character varying(255),
    categagretab character varying(255),
    libcategagretab character varying(255),
    siret character varying(255),
    codeape character varying(255),
    codemft character varying(255),
    libmft character varying(255),
    codesph character varying(255),
    libsph character varying(255),
    dateouv character varying(255),
    dateautor character varying(255),
    numuai character varying(255),
    coordxet real,
    coordyet real,
    sourcecoordet character varying(255)
);
CREATE SEQUENCE public.etablissements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.etablissements_id_seq OWNED BY public.etablissements.id;
CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;
CREATE TABLE public.knex_migrations_lock (
    is_locked integer
);
CREATE TABLE public.knex_migrations_v2 (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);
CREATE SEQUENCE public.knex_migrations_v2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.knex_migrations_v2_id_seq OWNED BY public.knex_migrations_v2.id;
CREATE TABLE public.knex_migrations_v2_lock (
    index integer NOT NULL,
    is_locked integer
);
CREATE SEQUENCE public.knex_migrations_v2_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.knex_migrations_v2_lock_index_seq OWNED BY public.knex_migrations_v2_lock.index;
CREATE TABLE public.lb_departements (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    lb_user_id integer,
    departement_id integer,
    departement_financeur boolean
);
CREATE SEQUENCE public.lb_departements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.lb_departements_id_seq OWNED BY public.lb_departements.id;
CREATE TABLE public.lb_user_etablissements (
    id integer NOT NULL,
    lb_user_id integer NOT NULL,
    etablissement_id integer NOT NULL,
    etablissement_rattachement boolean DEFAULT false
);
CREATE SEQUENCE public.lb_user_etablissements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.lb_user_etablissements_id_seq OWNED BY public.lb_user_etablissements.id;
CREATE TABLE public.lb_users (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying(255),
    nom character varying(255),
    prenom character varying(255),
    type character varying,
    siret character varying(255)
);
CREATE SEQUENCE public.lb_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.lb_users_id_seq OWNED BY public.lb_users.id;
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
CREATE TABLE public.mandataire_tis (
    id integer NOT NULL,
    mandataire_id integer,
    ti_id integer,
    created_at timestamp with time zone
);
CREATE SEQUENCE public.mandataire_tis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.mandataire_tis_id_seq OWNED BY public.mandataire_tis.id;
CREATE TABLE public.mandataires (
    id integer NOT NULL,
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    telephone character varying(255) NOT NULL,
    adresse character varying(255) NOT NULL,
    mesures_en_cours integer DEFAULT 0 NOT NULL,
    dispo_max integer,
    user_id integer,
    telephone_portable character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    email_send timestamp with time zone,
    genre character varying(255),
    mesures_en_attente integer DEFAULT 0 NOT NULL,
    competences text,
    department_id integer NOT NULL,
    siret character varying(255),
    latitude real,
    longitude real,
    lb_user_id integer
);
CREATE SEQUENCE public.mandataires_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.mandataires_id_seq OWNED BY public.mandataires.id;
CREATE TABLE public.mesure_etat (
    id integer NOT NULL,
    mesure_id integer NOT NULL,
    date_changement_etat date NOT NULL,
    nature_mesure public.nature_mesure_type NOT NULL,
    champ_mesure public.champ_mesure_type,
    lieu_vie public.lieu_vie_type NOT NULL,
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    pays character varying(255) NOT NULL,
    type_etablissement public.type_etablissement_type,
    etablissement_siret character varying(255)
);
CREATE SEQUENCE public.mesure_etat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.mesure_etat_id_seq OWNED BY public.mesure_etat.id;
CREATE TABLE public.mesure_ressources (
    id integer NOT NULL,
    annee integer,
    niveau_ressource integer NOT NULL,
    prestations_sociales jsonb NOT NULL,
    mesure_id integer NOT NULL
);
CREATE SEQUENCE public.mesure_ressources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.mesure_ressources_id_seq OWNED BY public.mesure_ressources.id;
CREATE TABLE public.mesures (
    id integer NOT NULL,
    code_postal character varying(255),
    ville character varying(255),
    mandataire_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    annee_naissance character varying(255),
    date_nomination date,
    date_fin_mesure date,
    etablissement_id integer,
    ti_id integer,
    numero_dossier character varying(255),
    cabinet character varying(255),
    numero_rg character varying(255),
    department_id integer,
    antenne_id integer,
    service_id integer,
    is_urgent boolean DEFAULT false,
    judgment_date date,
    latitude real,
    longitude real,
    pays character varying(255) DEFAULT 'FR'::character varying NOT NULL,
    magistrat_id integer,
    lieu_vie public.lieu_vie_type,
    type_etablissement public.type_etablissement_type,
    civilite public.civilite_type,
    cause_sortie public.cause_sortie_type,
    nature_mesure public.nature_mesure_type,
    champ_mesure public.champ_mesure_type,
    status public.mesure_status_type,
    date_premier_mesure date,
    date_protection_en_cours date,
    resultat_revision public.resultat_revision_type
);
CREATE SEQUENCE public.mesures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.mesures_id_seq OWNED BY public.mesures.id;
CREATE TABLE public.processus_states (
    id character varying(255) NOT NULL,
    start_date timestamp with time zone,
    end_date timestamp with time zone
);
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
CREATE TABLE public.satisfaction_campaign_answers (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    satisfaction_campaign_id integer NOT NULL,
    user_id integer NOT NULL,
    value integer NOT NULL
);
CREATE SEQUENCE public.satisfaction_campaign_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.satisfaction_campaign_answers_id_seq OWNED BY public.satisfaction_campaign_answers.id;
CREATE TABLE public.satisfaction_campaigns (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(255) NOT NULL,
    started_at timestamp with time zone NOT NULL,
    ended_at timestamp with time zone NOT NULL
);
CREATE SEQUENCE public.satisfaction_campaigns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.satisfaction_campaigns_id_seq OWNED BY public.satisfaction_campaigns.id;
CREATE TABLE public.service_members (
    id integer NOT NULL,
    user_id integer,
    service_id integer,
    is_admin boolean DEFAULT false NOT NULL
);
CREATE SEQUENCE public.service_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.service_admin_id_seq OWNED BY public.service_members.id;
CREATE TABLE public.service_antenne (
    id integer NOT NULL,
    service_id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
    address character varying(255),
    latitude real,
    longitude real
);
CREATE SEQUENCE public.service_antenne_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.service_antenne_id_seq OWNED BY public.service_antenne.id;
CREATE TABLE public.service_member_invitations (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    token character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sent_at timestamp with time zone,
    service_id integer NOT NULL
);
CREATE SEQUENCE public.service_member_invitations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.service_member_invitations_id_seq OWNED BY public.service_member_invitations.id;
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
    competences character varying(255),
    department_id integer NOT NULL,
    mesures_in_progress integer,
    mesures_awaiting integer,
    latitude real,
    longitude real,
    siret character varying(255)
);
CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;
CREATE TABLE public.sessions (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);
CREATE TABLE public.tis (
    id integer NOT NULL,
    etablissement character varying(255) NOT NULL,
    email character varying(255),
    code_postal character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    telephone character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    siret character varying(255),
    address character varying(255),
    latitude real,
    longitude real,
    departement_id integer,
    immutable boolean DEFAULT false NOT NULL,
    address2 character varying(255),
    updated_at timestamp with time zone,
    date_ouverture date,
    date_fermeture date,
    date_modification date,
    type character varying(255)
);
CREATE SEQUENCE public.tis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.tis_id_seq OWNED BY public.tis.id;
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
CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
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
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
CREATE VIEW public.view_mesure_gestionnaire AS
SELECT
    NULL::text AS id,
    NULL::integer AS service_id,
    NULL::integer AS mandataire_id,
    NULL::text AS discriminator,
    NULL::character varying AS nom,
    NULL::integer AS department_id,
    NULL::character varying(255) AS dep_nom,
    NULL::integer AS mesures_max,
    NULL::integer AS mesures_awaiting,
    NULL::integer AS mesures_in_progress,
    NULL::integer AS remaining_capacity;
CREATE VIEW public.view_department_availability AS
 SELECT v.department_id,
    d.id_region AS region_id,
    sum(v.mesures_awaiting) AS mesures_awaiting,
    sum(v.mesures_in_progress) AS mesures_in_progress,
    sum(v.mesures_max) AS mesures_max
   FROM public.view_mesure_gestionnaire v,
    public.departements d
  WHERE (v.department_id = d.id)
  GROUP BY v.department_id, d.id_region;
CREATE VIEW public.view_indicateur_inscrit AS
 SELECT d.code,
    d.nom,
    u.type,
    count(m.id) AS count
   FROM public.mandataires m,
    public.users u,
    public.departements d
  WHERE ((m.department_id = d.id) AND (m.user_id = u.id) AND (u.active = true))
  GROUP BY d.code, d.nom, u.type
UNION
 SELECT d.code,
    d.nom,
    u.type,
    count(DISTINCT sm.service_id) AS count
   FROM public.users u,
    public.departements d,
    public.service_members sm,
    public.services s
  WHERE ((u.active = true) AND (u.id = sm.user_id) AND (sm.service_id = s.id) AND (s.department_id = d.id))
  GROUP BY d.code, d.nom, u.type
UNION
 SELECT d.code,
    d.nom,
    u.type,
    count(DISTINCT m.id) AS count
   FROM (((public.tis t
     JOIN public.departements d ON ((d.id = t.departement_id)))
     JOIN public.magistrat m ON ((m.ti_id = t.id)))
     JOIN public.users u ON ((u.id = m.user_id)))
  WHERE (u.active = true)
  GROUP BY d.code, d.nom, u.type;
CREATE VIEW public.view_indicateur_login AS
 SELECT d.code,
    d.nom,
    u.type,
    count(m.id) AS count
   FROM public.mandataires m,
    public.users u,
    public.departements d
  WHERE ((m.department_id = d.id) AND (m.user_id = u.id) AND (u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.code, d.nom, u.type
UNION
 SELECT d.code,
    d.nom,
    u.type,
    count(DISTINCT sm.service_id) AS count
   FROM public.users u,
    public.departements d,
    public.service_members sm,
    public.services s
  WHERE ((u.active = true) AND (u.id = sm.user_id) AND (sm.service_id = s.id) AND (s.department_id = d.id) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.code, d.nom, u.type
UNION
 SELECT d.code,
    d.nom,
    u.type,
    count(DISTINCT m.id) AS count
   FROM (((public.tis t
     JOIN public.departements d ON ((d.id = t.departement_id)))
     JOIN public.magistrat m ON ((m.ti_id = t.id)))
     JOIN public.users u ON ((u.id = m.user_id)))
  WHERE ((u.active = true) AND (u.last_login > (now() - '1 mon'::interval)))
  GROUP BY d.code, d.nom, u.type;
CREATE VIEW public.view_indicateur_satisfaction_campaign AS
 SELECT d.code,
    d.nom,
    u.type,
    avg(sca.value) AS value
   FROM ((((public.satisfaction_campaign_answers sca
     JOIN public.users u ON ((u.id = sca.user_id)))
     JOIN public.magistrat m ON ((m.user_id = u.id)))
     JOIN public.tis t ON ((t.id = m.ti_id)))
     JOIN public.departements d ON ((d.id = t.departement_id)))
  WHERE ((sca.satisfaction_campaign_id = ( SELECT satisfaction_campaigns.id
           FROM public.satisfaction_campaigns
          WHERE ((now() >= satisfaction_campaigns.started_at) AND (satisfaction_campaigns.ended_at >= now())))) AND (u.active = true))
  GROUP BY d.code, d.nom, u.type
UNION
 SELECT d.code,
    d.nom,
    u.type,
    avg(sca.value) AS value
   FROM (((public.satisfaction_campaign_answers sca
     JOIN public.users u ON ((u.id = sca.user_id)))
     JOIN public.mandataires m ON ((m.user_id = u.id)))
     JOIN public.departements d ON ((d.id = m.department_id)))
  WHERE ((sca.satisfaction_campaign_id = ( SELECT satisfaction_campaigns.id
           FROM public.satisfaction_campaigns
          WHERE ((now() >= satisfaction_campaigns.started_at) AND (satisfaction_campaigns.ended_at >= now())))) AND (u.active = true))
  GROUP BY d.code, d.nom, u.type
UNION
 SELECT d.code,
    d.nom,
    u.type,
    avg(sca.value) AS value
   FROM ((((public.satisfaction_campaign_answers sca
     JOIN public.users u ON ((u.id = sca.user_id)))
     JOIN public.service_members sm ON ((sm.user_id = u.id)))
     JOIN public.services s ON ((sm.service_id = s.id)))
     JOIN public.departements d ON ((d.id = s.department_id)))
  WHERE ((sca.satisfaction_campaign_id = ( SELECT satisfaction_campaigns.id
           FROM public.satisfaction_campaigns
          WHERE ((now() >= satisfaction_campaigns.started_at) AND (satisfaction_campaigns.ended_at >= now())))) AND (u.active = true))
  GROUP BY d.code, d.nom, u.type;
CREATE VIEW public.view_mesure_gestionnaire_tis AS
 SELECT concat(u.type, '-', m.id) AS id,
    NULL::integer AS service_id,
    m.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    mti.ti_id,
    u.nom AS name
   FROM public.users u,
    public.mandataire_tis mti,
    public.mandataires m
  WHERE ((u.id = m.user_id) AND (m.id = mti.mandataire_id))
UNION
 SELECT concat('service-', sti.service_id) AS id,
    sti.service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    sti.ti_id,
    s.etablissement AS name
   FROM public.service_tis sti,
    public.services s
  WHERE (s.id = sti.service_id);
ALTER TABLE ONLY public.access_tokens ALTER COLUMN id SET DEFAULT nextval('public.access_tokens_id_seq'::regclass);
ALTER TABLE ONLY public.api_logs ALTER COLUMN id SET DEFAULT nextval('public.api_logs_id_seq'::regclass);
ALTER TABLE ONLY public.authorization_codes ALTER COLUMN id SET DEFAULT nextval('public.authorization_codes_id_seq'::regclass);
ALTER TABLE ONLY public.commentaires ALTER COLUMN id SET DEFAULT nextval('public.commentaires_co_id_seq'::regclass);
ALTER TABLE ONLY public.departements ALTER COLUMN id SET DEFAULT nextval('public.departements_id_seq'::regclass);
ALTER TABLE ONLY public.direction ALTER COLUMN id SET DEFAULT nextval('public.direction_id_seq'::regclass);
ALTER TABLE ONLY public.editor_token_requests ALTER COLUMN id SET DEFAULT nextval('public.editor_token_requests_id_seq'::regclass);
ALTER TABLE ONLY public.editors ALTER COLUMN id SET DEFAULT nextval('public.editors_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_activite ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_activite_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_agrements_formations ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_agrements_formations_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_financement ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_financement_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_informations_mandataire ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_informations_mandataire_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_modalites_exercice ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_modalite_exercice_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_populations ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_populations_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_prepose_personel_formation ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_prepose_personel_formation_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_prepose_prestations_sociales ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_prepose_prestations_sociales_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_prestations_sociales ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_prestations_sociales_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_service_informations ALTER COLUMN id SET DEFAULT nextval('public.enquete_reponses_service_informations_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_reponses_service_personnel_formation ALTER COLUMN id SET DEFAULT nextval('public.enquete_service_personnel_formation_id_seq'::regclass);
ALTER TABLE ONLY public.enquete_services ALTER COLUMN id SET DEFAULT nextval('public.enquete_services_id_seq'::regclass);
ALTER TABLE ONLY public.enquetes ALTER COLUMN id SET DEFAULT nextval('public.enquetes_id_seq'::regclass);
ALTER TABLE ONLY public.etablissements ALTER COLUMN id SET DEFAULT nextval('public.etablissements_id_seq'::regclass);
ALTER TABLE ONLY public.geolocalisation_code_postal ALTER COLUMN id SET DEFAULT nextval('public."codePostalLatLngs_id_seq"'::regclass);
ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);
ALTER TABLE ONLY public.knex_migrations_v2 ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_v2_id_seq'::regclass);
ALTER TABLE ONLY public.knex_migrations_v2_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_v2_lock_index_seq'::regclass);
ALTER TABLE ONLY public.lb_departements ALTER COLUMN id SET DEFAULT nextval('public.lb_departements_id_seq'::regclass);
ALTER TABLE ONLY public.lb_user_etablissements ALTER COLUMN id SET DEFAULT nextval('public.lb_user_etablissements_id_seq'::regclass);
ALTER TABLE ONLY public.lb_users ALTER COLUMN id SET DEFAULT nextval('public.lb_users_id_seq'::regclass);
ALTER TABLE ONLY public.logs_data ALTER COLUMN id SET DEFAULT nextval('public.logs_data_id_seq'::regclass);
ALTER TABLE ONLY public.magistrat ALTER COLUMN id SET DEFAULT nextval('public.magistrat_id_seq'::regclass);
ALTER TABLE ONLY public.mandataire_tis ALTER COLUMN id SET DEFAULT nextval('public.mandataire_tis_id_seq'::regclass);
ALTER TABLE ONLY public.mandataires ALTER COLUMN id SET DEFAULT nextval('public.mandataires_id_seq'::regclass);
ALTER TABLE ONLY public.mesure_etat ALTER COLUMN id SET DEFAULT nextval('public.mesure_etat_id_seq'::regclass);
ALTER TABLE ONLY public.mesure_ressources ALTER COLUMN id SET DEFAULT nextval('public.mesure_ressources_id_seq'::regclass);
ALTER TABLE ONLY public.mesures ALTER COLUMN id SET DEFAULT nextval('public.mesures_id_seq'::regclass);
ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);
ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);
ALTER TABLE ONLY public.satisfaction_campaign_answers ALTER COLUMN id SET DEFAULT nextval('public.satisfaction_campaign_answers_id_seq'::regclass);
ALTER TABLE ONLY public.satisfaction_campaigns ALTER COLUMN id SET DEFAULT nextval('public.satisfaction_campaigns_id_seq'::regclass);
ALTER TABLE ONLY public.service_antenne ALTER COLUMN id SET DEFAULT nextval('public.service_antenne_id_seq'::regclass);
ALTER TABLE ONLY public.service_member_invitations ALTER COLUMN id SET DEFAULT nextval('public.service_member_invitations_id_seq'::regclass);
ALTER TABLE ONLY public.service_members ALTER COLUMN id SET DEFAULT nextval('public.service_admin_id_seq'::regclass);
ALTER TABLE ONLY public.service_tis ALTER COLUMN id SET DEFAULT nextval('public.service_tis_id_seq'::regclass);
ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);
ALTER TABLE ONLY public.tis ALTER COLUMN id SET DEFAULT nextval('public.tis_id_seq'::regclass);
ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.access_tokens
    ADD CONSTRAINT access_tokens_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.api_logs
    ADD CONSTRAINT api_logs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.authorization_codes
    ADD CONSTRAINT authorization_codes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.geolocalisation_code_postal
    ADD CONSTRAINT "codePostalLatLngs_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.direction
    ADD CONSTRAINT direction_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.editor_token_requests
    ADD CONSTRAINT editor_token_requests_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_activite
    ADD CONSTRAINT enquete_reponses_activite_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_agrements_formations
    ADD CONSTRAINT enquete_reponses_agrements_formations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_financement
    ADD CONSTRAINT enquete_reponses_financement_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_informations_mandataire
    ADD CONSTRAINT enquete_reponses_informations_mandataire_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_modalites_exercice
    ADD CONSTRAINT enquete_reponses_modalite_exercice_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_populations
    ADD CONSTRAINT enquete_reponses_populations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_prepose_personel_formation
    ADD CONSTRAINT enquete_reponses_prepose_personel_formation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_prepose_prestations_sociales
    ADD CONSTRAINT enquete_reponses_prepose_prestations_sociales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_prestations_sociales
    ADD CONSTRAINT enquete_reponses_prestations_sociales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_service_informations
    ADD CONSTRAINT enquete_reponses_service_informations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_reponses_service_personnel_formation
    ADD CONSTRAINT enquete_service_personnel_formation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquete_services
    ADD CONSTRAINT enquete_services_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquetes
    ADD CONSTRAINT enquetes_annee_unique UNIQUE (annee);
ALTER TABLE ONLY public.enquetes
    ADD CONSTRAINT enquetes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.etablissements
    ADD CONSTRAINT etablissements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.knex_migrations_v2_lock
    ADD CONSTRAINT knex_migrations_v2_lock_pkey PRIMARY KEY (index);
ALTER TABLE ONLY public.knex_migrations_v2
    ADD CONSTRAINT knex_migrations_v2_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lb_departements
    ADD CONSTRAINT lb_departements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lb_user_etablissements
    ADD CONSTRAINT lb_user_etablissements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lb_users
    ADD CONSTRAINT lb_users_email_unique UNIQUE (email);
ALTER TABLE ONLY public.lb_users
    ADD CONSTRAINT lb_users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lb_users
    ADD CONSTRAINT lb_users_siret_unique UNIQUE (siret);
ALTER TABLE ONLY public.logs_data
    ADD CONSTRAINT logs_data_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_user_id_unique UNIQUE (user_id);
ALTER TABLE ONLY public.mandataire_tis
    ADD CONSTRAINT mandataire_tis_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_lb_user_id_unique UNIQUE (lb_user_id);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_siret_unique UNIQUE (siret);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_user_id_unique UNIQUE (user_id);
ALTER TABLE ONLY public.mesure_etat
    ADD CONSTRAINT mesure_etat_mesure_id_date_changement_etat_unique UNIQUE (mesure_id, date_changement_etat);
ALTER TABLE ONLY public.mesure_etat
    ADD CONSTRAINT mesure_etat_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.mesure_ressources
    ADD CONSTRAINT mesure_ressources_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.processus_states
    ADD CONSTRAINT processus_states_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey1 PRIMARY KEY (id);
ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_name_unique UNIQUE (name);
ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.satisfaction_campaign_answers
    ADD CONSTRAINT satisfaction_campaign_answers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.satisfaction_campaigns
    ADD CONSTRAINT satisfaction_campaigns_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service_members
    ADD CONSTRAINT service_admin_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service_members
    ADD CONSTRAINT service_admin_user_id_service_id_unique UNIQUE (user_id, service_id);
ALTER TABLE ONLY public.service_antenne
    ADD CONSTRAINT service_antenne_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service_member_invitations
    ADD CONSTRAINT service_member_invitations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_ti_id_service_id_unique UNIQUE (ti_id, service_id);
ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_siret_unique UNIQUE (siret);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);
ALTER TABLE ONLY public.tis
    ADD CONSTRAINT tis_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tis
    ADD CONSTRAINT tis_siret_unique UNIQUE (siret);
ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);
CREATE UNIQUE INDEX enquete_reponses_mandataire ON public.enquete_reponses USING btree (enquete_id, mandataire_id) WHERE (mandataire_id IS NOT NULL);
CREATE UNIQUE INDEX enquete_reponses_service ON public.enquete_reponses USING btree (enquete_id, service_id) WHERE (service_id IS NOT NULL);
CREATE INDEX geolocalisation_code_postal_code_postal_idx ON public.geolocalisation_code_postal USING btree (code_postal);
CREATE INDEX mesures_numero_rg_idx ON public.mesures USING btree (numero_rg, service_id, mandataire_id, ti_id);
CREATE INDEX service_admin_service_id_index ON public.service_members USING btree (service_id);
CREATE INDEX service_admin_user_id_index ON public.service_members USING btree (user_id);
CREATE INDEX sessions_expired_index ON public.sessions USING btree (expired);
CREATE UNIQUE INDEX tis_siret_idx ON public.tis USING btree (siret);
CREATE INDEX user_role_role_id_index ON public.user_role USING btree (role_id);
CREATE INDEX user_role_user_id_index ON public.user_role USING btree (user_id);
CREATE OR REPLACE VIEW public.view_mesure_gestionnaire AS
 SELECT concat('service-', ser.id) AS id,
    ser.id AS service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    ser.etablissement AS nom,
    dep.id AS department_id,
    dep.nom AS dep_nom,
    ser.dispo_max AS mesures_max,
    ser.mesures_awaiting,
    ser.mesures_in_progress,
    ((ser.dispo_max - ser.mesures_awaiting) - ser.mesures_in_progress) AS remaining_capacity
   FROM public.services ser,
    public.departements dep
  WHERE (dep.id = ser.department_id)
  GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
UNION
 SELECT concat(u.type, '-', man.id) AS id,
    NULL::integer AS service_id,
    man.id AS mandataire_id,
        CASE
            WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    concat(u.nom, ' ', u.prenom) AS nom,
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
ALTER TABLE ONLY public.api_logs
    ADD CONSTRAINT api_logs_editor_id_foreign FOREIGN KEY (editor_id) REFERENCES public.editors(id);
ALTER TABLE ONLY public.authorization_codes
    ADD CONSTRAINT authorization_codes_client_id_foreign FOREIGN KEY (client_id) REFERENCES public.editors(id);
ALTER TABLE ONLY public.authorization_codes
    ADD CONSTRAINT authorization_codes_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);
ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.commentaires
    ADD CONSTRAINT commentaires_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);
ALTER TABLE ONLY public.departements
    ADD CONSTRAINT departements_id_region_foreign FOREIGN KEY (id_region) REFERENCES public.regions(id);
ALTER TABLE ONLY public.direction
    ADD CONSTRAINT direction_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.direction
    ADD CONSTRAINT direction_region_id_foreign FOREIGN KEY (region_id) REFERENCES public.regions(id);
ALTER TABLE ONLY public.direction
    ADD CONSTRAINT direction_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_departement_id_foreign FOREIGN KEY (departement_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_id_foreign FOREIGN KEY (enquete_id) REFERENCES public.enquetes(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_activite_id_foreign FOREIGN KEY (enquete_reponses_activite_id) REFERENCES public.enquete_reponses_activite(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_agrements_formations_id_forei FOREIGN KEY (enquete_reponses_agrements_formations_id) REFERENCES public.enquete_reponses_agrements_formations(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_financement_id_foreign FOREIGN KEY (enquete_reponses_financement_id) REFERENCES public.enquete_reponses_financement(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_informations_mandataire_id_fo FOREIGN KEY (enquete_reponses_informations_mandataire_id) REFERENCES public.enquete_reponses_informations_mandataire(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_modalite_exercice_id_foreign FOREIGN KEY (enquete_reponses_modalites_exercice_id) REFERENCES public.enquete_reponses_modalites_exercice(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_populations_id_foreign FOREIGN KEY (enquete_reponses_populations_id) REFERENCES public.enquete_reponses_populations(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_prepose_personel_formation_id FOREIGN KEY (enquete_reponses_prepose_personel_formation_id) REFERENCES public.enquete_reponses_prepose_personel_formation(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_prepose_prestations_sociales_ FOREIGN KEY (enquete_reponses_prepose_prestations_sociales_id) REFERENCES public.enquete_reponses_prepose_prestations_sociales(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_prestations_sociale_id_foreig FOREIGN KEY (enquete_reponses_prestations_sociale_id) REFERENCES public.enquete_reponses_prestations_sociales(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_reponses_service_informations_id_forei FOREIGN KEY (enquete_reponses_service_informations_id) REFERENCES public.enquete_reponses_service_informations(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_enquete_service_personnel_formation_id_foreign FOREIGN KEY (enquete_reponses_service_personnel_formation_id) REFERENCES public.enquete_reponses_service_personnel_formation(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);
ALTER TABLE ONLY public.enquete_reponses
    ADD CONSTRAINT enquete_reponses_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.enquete_services
    ADD CONSTRAINT enquete_services_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.etablissements
    ADD CONSTRAINT etablissements_departement_id_foreign FOREIGN KEY (departement_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.lb_departements
    ADD CONSTRAINT lb_departements_departement_id_foreign FOREIGN KEY (departement_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.lb_departements
    ADD CONSTRAINT lb_departements_lb_user_id_foreign FOREIGN KEY (lb_user_id) REFERENCES public.lb_users(id);
ALTER TABLE ONLY public.lb_user_etablissements
    ADD CONSTRAINT lb_user_etablissements_etablissement_id_foreign FOREIGN KEY (etablissement_id) REFERENCES public.etablissements(id);
ALTER TABLE ONLY public.lb_user_etablissements
    ADD CONSTRAINT lb_user_etablissements_lb_user_id_foreign FOREIGN KEY (lb_user_id) REFERENCES public.lb_users(id);
ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);
ALTER TABLE ONLY public.magistrat
    ADD CONSTRAINT magistrat_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.mandataire_tis
    ADD CONSTRAINT mandataire_tis_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);
ALTER TABLE ONLY public.mandataire_tis
    ADD CONSTRAINT mandataire_tis_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_lb_user_id_foreign FOREIGN KEY (lb_user_id) REFERENCES public.lb_users(id);
ALTER TABLE ONLY public.mandataires
    ADD CONSTRAINT mandataires_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.mesure_etat
    ADD CONSTRAINT mesure_etat_mesure_id_foreign FOREIGN KEY (mesure_id) REFERENCES public.mesures(id);
ALTER TABLE ONLY public.mesure_ressources
    ADD CONSTRAINT mesure_ressources_mesure_id_foreign FOREIGN KEY (mesure_id) REFERENCES public.mesures(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_antenne_id_foreign FOREIGN KEY (antenne_id) REFERENCES public.service_antenne(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_etablissement_id_foreign FOREIGN KEY (etablissement_id) REFERENCES public.etablissements(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_magistrat_id_foreign FOREIGN KEY (magistrat_id) REFERENCES public.magistrat(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_mandataire_id_foreign FOREIGN KEY (mandataire_id) REFERENCES public.mandataires(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.mesures
    ADD CONSTRAINT mesures_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);
ALTER TABLE ONLY public.satisfaction_campaign_answers
    ADD CONSTRAINT satisfaction_campaign_answers_satisfaction_campaign_id_foreign FOREIGN KEY (satisfaction_campaign_id) REFERENCES public.satisfaction_campaigns(id);
ALTER TABLE ONLY public.satisfaction_campaign_answers
    ADD CONSTRAINT satisfaction_campaign_answers_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.service_members
    ADD CONSTRAINT service_admin_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.service_members
    ADD CONSTRAINT service_admin_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.service_antenne
    ADD CONSTRAINT service_antenne_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.service_member_invitations
    ADD CONSTRAINT service_member_invitations_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE ONLY public.service_tis
    ADD CONSTRAINT service_tis_ti_id_foreign FOREIGN KEY (ti_id) REFERENCES public.tis(id);
ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.tis
    ADD CONSTRAINT tis_departement_id_foreign FOREIGN KEY (departement_id) REFERENCES public.departements(id);
ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.role(id);
ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
