--
-- PostgreSQL database dump
--

\restrict SvJPd7NxvGYxRNmkFMMvLeXKz4wa3fkXeynDpvnO8rHF89eIgN1W7Iru2aJ1edH

-- Dumped from database version 15.14 (Homebrew)
-- Dumped by pg_dump version 15.14 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: aikovrr; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aikovrr;


ALTER SCHEMA aikovrr OWNER TO postgres;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asset_compliance_link; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.asset_compliance_link (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    assessment_id integer,
    framework_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.asset_compliance_link OWNER TO postgres;

--
-- Name: TABLE asset_compliance_link; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON TABLE aikovrr.asset_compliance_link IS 'Many-to-many relationship between assets and compliance assessments';


--
-- Name: asset_compliance_link_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.asset_compliance_link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.asset_compliance_link_id_seq OWNER TO postgres;

--
-- Name: asset_compliance_link_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.asset_compliance_link_id_seq OWNED BY aikovrr.asset_compliance_link.id;


--
-- Name: asset_control_link; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.asset_control_link (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    control_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.asset_control_link OWNER TO postgres;

--
-- Name: TABLE asset_control_link; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON TABLE aikovrr.asset_control_link IS 'Many-to-many relationship between assets and controls';


--
-- Name: asset_control_link_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.asset_control_link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.asset_control_link_id_seq OWNER TO postgres;

--
-- Name: asset_control_link_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.asset_control_link_id_seq OWNED BY aikovrr.asset_control_link.id;


--
-- Name: asset_evidence; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.asset_evidence (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    evidence_type character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    file_url character varying(500),
    uploaded_by_id integer,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.asset_evidence OWNER TO postgres;

--
-- Name: asset_evidence_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.asset_evidence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.asset_evidence_id_seq OWNER TO postgres;

--
-- Name: asset_evidence_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.asset_evidence_id_seq OWNED BY aikovrr.asset_evidence.id;


--
-- Name: asset_integration; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.asset_integration (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    integration_type character varying(50) NOT NULL,
    last_sync timestamp without time zone,
    sync_status character varying(20),
    sync_details jsonb DEFAULT '{}'::jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.asset_integration OWNER TO postgres;

--
-- Name: asset_integration_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.asset_integration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.asset_integration_id_seq OWNER TO postgres;

--
-- Name: asset_integration_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.asset_integration_id_seq OWNED BY aikovrr.asset_integration.id;


--
-- Name: asset_note; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.asset_note (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    note text NOT NULL,
    created_by_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.asset_note OWNER TO postgres;

--
-- Name: asset_note_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.asset_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.asset_note_id_seq OWNER TO postgres;

--
-- Name: asset_note_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.asset_note_id_seq OWNED BY aikovrr.asset_note.id;


--
-- Name: asset_risk_link; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.asset_risk_link (
    id integer NOT NULL,
    asset_id integer NOT NULL,
    risk_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.asset_risk_link OWNER TO postgres;

--
-- Name: TABLE asset_risk_link; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON TABLE aikovrr.asset_risk_link IS 'Many-to-many relationship between assets and risks';


--
-- Name: asset_risk_link_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.asset_risk_link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.asset_risk_link_id_seq OWNER TO postgres;

--
-- Name: asset_risk_link_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.asset_risk_link_id_seq OWNED BY aikovrr.asset_risk_link.id;


--
-- Name: auth_app_user; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.auth_app_user (
    id integer NOT NULL,
    username character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(150),
    last_name character varying(150),
    role character varying(50) DEFAULT 'analyst'::character varying,
    is_active boolean DEFAULT true,
    is_superuser boolean DEFAULT false,
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.auth_app_user OWNER TO postgres;

--
-- Name: auth_app_user_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.auth_app_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.auth_app_user_id_seq OWNER TO postgres;

--
-- Name: auth_app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.auth_app_user_id_seq OWNED BY aikovrr.auth_app_user.id;


--
-- Name: auth_group; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE aikovrr.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE aikovrr.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE aikovrr.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: core_department; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.core_department (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    name character varying(255) NOT NULL,
    risk_exposure_agg numeric(15,2) DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.core_department OWNER TO postgres;

--
-- Name: core_department_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.core_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.core_department_id_seq OWNER TO postgres;

--
-- Name: core_department_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.core_department_id_seq OWNED BY aikovrr.core_department.id;


--
-- Name: core_tenant; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.core_tenant (
    id integer NOT NULL,
    org_name character varying(255) NOT NULL,
    config jsonb DEFAULT '{}'::jsonb,
    admin_contacts text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.core_tenant OWNER TO postgres;

--
-- Name: core_tenant_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.core_tenant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.core_tenant_id_seq OWNER TO postgres;

--
-- Name: core_tenant_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.core_tenant_id_seq OWNED BY aikovrr.core_tenant.id;


--
-- Name: core_user; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.core_user (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    department_id integer,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(100),
    avatar character varying(500),
    shadow_sanction_ratio numeric(5,2) DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.core_user OWNER TO postgres;

--
-- Name: core_user_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.core_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.core_user_id_seq OWNER TO postgres;

--
-- Name: core_user_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.core_user_id_seq OWNED BY aikovrr.core_user.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE aikovrr.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE aikovrr.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE aikovrr.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE aikovrr.django_session OWNER TO postgres;

--
-- Name: governance_custom_field; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.governance_custom_field (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    entity_type character varying(100) NOT NULL,
    entity_id integer NOT NULL,
    field_name character varying(255) NOT NULL,
    field_type character varying(50),
    field_value text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.governance_custom_field OWNER TO postgres;

--
-- Name: governance_custom_field_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.governance_custom_field_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.governance_custom_field_id_seq OWNER TO postgres;

--
-- Name: governance_custom_field_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.governance_custom_field_id_seq OWNED BY aikovrr.governance_custom_field.id;


--
-- Name: governance_self_assessment_task; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.governance_self_assessment_task (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    framework_id integer,
    control_id integer,
    assigned_to_id integer,
    title character varying(255) NOT NULL,
    description text,
    status character varying(50) DEFAULT 'Not Started'::character varying,
    due_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.governance_self_assessment_task OWNER TO postgres;

--
-- Name: governance_self_assessment_task_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.governance_self_assessment_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.governance_self_assessment_task_id_seq OWNER TO postgres;

--
-- Name: governance_self_assessment_task_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.governance_self_assessment_task_id_seq OWNED BY aikovrr.governance_self_assessment_task.id;


--
-- Name: news_newsarticle; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.news_newsarticle (
    id bigint NOT NULL,
    title character varying(500) NOT NULL,
    summary text,
    url character varying(1000) NOT NULL,
    source character varying(100) NOT NULL,
    source_url character varying(500),
    framework character varying(100),
    article_type character varying(50),
    published_at timestamp with time zone NOT NULL,
    fetched_at timestamp with time zone NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE aikovrr.news_newsarticle OWNER TO postgres;

--
-- Name: news_newsarticle_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

ALTER TABLE aikovrr.news_newsarticle ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME aikovrr.news_newsarticle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: risk_category; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    parent_id integer,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.risk_category OWNER TO postgres;

--
-- Name: risk_category_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_category_id_seq OWNER TO postgres;

--
-- Name: risk_category_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_category_id_seq OWNED BY aikovrr.risk_category.id;


--
-- Name: risk_control; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_control (
    id integer NOT NULL,
    framework_id integer NOT NULL,
    control_id character varying(100) NOT NULL,
    description text,
    maturity_level character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.risk_control OWNER TO postgres;

--
-- Name: risk_control_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_control_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_control_id_seq OWNER TO postgres;

--
-- Name: risk_control_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_control_id_seq OWNED BY aikovrr.risk_control.id;


--
-- Name: risk_framework; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_framework (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    version character varying(50),
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.risk_framework OWNER TO postgres;

--
-- Name: risk_framework_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_framework_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_framework_id_seq OWNER TO postgres;

--
-- Name: risk_framework_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_framework_id_seq OWNED BY aikovrr.risk_framework.id;


--
-- Name: risk_note; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_note (
    id integer NOT NULL,
    scenario_id integer NOT NULL,
    author_id integer NOT NULL,
    text text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.risk_note OWNER TO postgres;

--
-- Name: risk_note_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_note_id_seq OWNER TO postgres;

--
-- Name: risk_note_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_note_id_seq OWNED BY aikovrr.risk_note.id;


--
-- Name: risk_scenario; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_scenario (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    owner_id integer,
    name character varying(255) NOT NULL,
    description text,
    likelihood character varying(50),
    impact character varying(50),
    priority character varying(50),
    status character varying(50) DEFAULT 'Identified'::character varying,
    response_plan character varying(50),
    annual_likelihood numeric(5,2),
    peer_rate numeric(5,2),
    financial_loss_min numeric(15,2),
    financial_loss_max numeric(15,2),
    pii_exposure integer DEFAULT 0,
    pci_exposure integer DEFAULT 0,
    phi_exposure integer DEFAULT 0,
    review_date date,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_edited timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    mitigation_cost numeric(15,2),
    ticket_link character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.risk_scenario OWNER TO postgres;

--
-- Name: risk_scenario_categories; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_scenario_categories (
    id integer NOT NULL,
    scenario_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE aikovrr.risk_scenario_categories OWNER TO postgres;

--
-- Name: risk_scenario_categories_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_scenario_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_scenario_categories_id_seq OWNER TO postgres;

--
-- Name: risk_scenario_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_scenario_categories_id_seq OWNED BY aikovrr.risk_scenario_categories.id;


--
-- Name: risk_scenario_control; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.risk_scenario_control (
    id integer NOT NULL,
    scenario_id integer NOT NULL,
    control_id integer NOT NULL,
    compliance_status character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.risk_scenario_control OWNER TO postgres;

--
-- Name: risk_scenario_control_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_scenario_control_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_scenario_control_id_seq OWNER TO postgres;

--
-- Name: risk_scenario_control_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_scenario_control_id_seq OWNED BY aikovrr.risk_scenario_control.id;


--
-- Name: risk_scenario_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.risk_scenario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.risk_scenario_id_seq OWNER TO postgres;

--
-- Name: risk_scenario_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.risk_scenario_id_seq OWNED BY aikovrr.risk_scenario.id;


--
-- Name: visibility_ai_asset; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.visibility_ai_asset (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    name character varying(255) NOT NULL,
    asset_type character varying(50) NOT NULL,
    owner_id integer,
    technical_owner_id integer,
    owning_org_unit character varying(255),
    vendor_source character varying(50),
    vendor_name character varying(255),
    status character varying(50) DEFAULT 'under_review'::character varying,
    use_case character varying(255),
    description text,
    intended_users jsonb DEFAULT '[]'::jsonb,
    projected_value character varying(255),
    lifecycle_stage character varying(50),
    deployment_platform character varying(50),
    environment jsonb DEFAULT '[]'::jsonb,
    risk_tier character varying(20),
    risk_score numeric(5,2),
    inherent_risk_score numeric(5,2),
    residual_risk_score numeric(5,2),
    personal_data_used boolean DEFAULT false,
    sensitive_categories jsonb DEFAULT '[]'::jsonb,
    regulatory_applicability jsonb DEFAULT '[]'::jsonb,
    control_coverage jsonb DEFAULT '[]'::jsonb,
    model_provider character varying(100),
    model_version character varying(100),
    service_principal_id character varying(255),
    aad_permissions jsonb DEFAULT '[]'::jsonb,
    user_assignments jsonb DEFAULT '[]'::jsonb,
    network_destinations jsonb DEFAULT '[]'::jsonb,
    first_seen timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_seen timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    first_deployment_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    risk_profile_id integer,
    category character varying(100),
    vendor character varying(255),
    domain character varying(255),
    entra_service_principal_id character varying(255),
    entra_app_id character varying(255),
    entra_publisher_name character varying(255),
    entra_sign_in_audience character varying(100)
);


ALTER TABLE aikovrr.visibility_ai_asset OWNER TO postgres;

--
-- Name: TABLE visibility_ai_asset; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON TABLE aikovrr.visibility_ai_asset IS 'Enhanced AI Asset inventory v2.0 with cross-module relationships';


--
-- Name: COLUMN visibility_ai_asset.asset_type; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON COLUMN aikovrr.visibility_ai_asset.asset_type IS 'Type: model, app, agent, dataset, service';


--
-- Name: COLUMN visibility_ai_asset.status; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON COLUMN aikovrr.visibility_ai_asset.status IS 'Status: sanctioned, shadow, under_review, blocked, retired (aligned with risk_scenario.status)';


--
-- Name: COLUMN visibility_ai_asset.risk_tier; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON COLUMN aikovrr.visibility_ai_asset.risk_tier IS 'Risk tier: low, medium, high, critical (aligned with risk_scenario.priority)';


--
-- Name: COLUMN visibility_ai_asset.risk_score; Type: COMMENT; Schema: aikovrr; Owner: postgres
--

COMMENT ON COLUMN aikovrr.visibility_ai_asset.risk_score IS 'Risk score 0-100 (aligned with control priority_score methodology)';


--
-- Name: visibility_ai_asset_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.visibility_ai_asset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.visibility_ai_asset_id_seq OWNER TO postgres;

--
-- Name: visibility_ai_asset_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.visibility_ai_asset_id_seq OWNED BY aikovrr.visibility_ai_asset.id;


--
-- Name: visibility_asset_relationship; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.visibility_asset_relationship (
    id integer NOT NULL,
    user_id integer NOT NULL,
    ai_asset_id integer NOT NULL,
    discovery_source_id integer,
    relationship_type character varying(50),
    confidence_score numeric(5,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.visibility_asset_relationship OWNER TO postgres;

--
-- Name: visibility_asset_relationship_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.visibility_asset_relationship_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.visibility_asset_relationship_id_seq OWNER TO postgres;

--
-- Name: visibility_asset_relationship_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.visibility_asset_relationship_id_seq OWNED BY aikovrr.visibility_asset_relationship.id;


--
-- Name: visibility_discovery_source; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.visibility_discovery_source (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    source_type character varying(50) NOT NULL,
    collection_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    confidence_level character varying(50),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.visibility_discovery_source OWNER TO postgres;

--
-- Name: visibility_discovery_source_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.visibility_discovery_source_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.visibility_discovery_source_id_seq OWNER TO postgres;

--
-- Name: visibility_discovery_source_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.visibility_discovery_source_id_seq OWNED BY aikovrr.visibility_discovery_source.id;


--
-- Name: visibility_risk_profile; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.visibility_risk_profile (
    id integer NOT NULL,
    kovrr_vendor_id character varying(255),
    risk_score integer,
    financial_exposure_min numeric(15,2),
    financial_exposure_max numeric(15,2),
    incident_history_ref text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT visibility_risk_profile_risk_score_check CHECK (((risk_score >= 0) AND (risk_score <= 100)))
);


ALTER TABLE aikovrr.visibility_risk_profile OWNER TO postgres;

--
-- Name: visibility_risk_profile_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.visibility_risk_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.visibility_risk_profile_id_seq OWNER TO postgres;

--
-- Name: visibility_risk_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.visibility_risk_profile_id_seq OWNED BY aikovrr.visibility_risk_profile.id;


--
-- Name: visibility_usage_indicator; Type: TABLE; Schema: aikovrr; Owner: postgres
--

CREATE TABLE aikovrr.visibility_usage_indicator (
    id integer NOT NULL,
    ai_asset_id integer NOT NULL,
    first_seen timestamp without time zone,
    last_seen timestamp without time zone,
    active_users_count integer DEFAULT 0,
    trend_status character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE aikovrr.visibility_usage_indicator OWNER TO postgres;

--
-- Name: visibility_usage_indicator_id_seq; Type: SEQUENCE; Schema: aikovrr; Owner: postgres
--

CREATE SEQUENCE aikovrr.visibility_usage_indicator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE aikovrr.visibility_usage_indicator_id_seq OWNER TO postgres;

--
-- Name: visibility_usage_indicator_id_seq; Type: SEQUENCE OWNED BY; Schema: aikovrr; Owner: postgres
--

ALTER SEQUENCE aikovrr.visibility_usage_indicator_id_seq OWNED BY aikovrr.visibility_usage_indicator.id;


--
-- Name: news_newsarticle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_newsarticle (
    id integer NOT NULL,
    title character varying(500) NOT NULL,
    summary text,
    url character varying(1000) NOT NULL,
    source character varying(100) NOT NULL,
    source_url character varying(500),
    framework character varying(100),
    article_type character varying(50),
    published_at timestamp with time zone NOT NULL,
    fetched_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true,
    CONSTRAINT news_newsarticle_article_type_check CHECK (((article_type)::text = ANY ((ARRAY['regulation'::character varying, 'framework'::character varying, 'standard'::character varying, 'guidance'::character varying])::text[])))
);


ALTER TABLE public.news_newsarticle OWNER TO postgres;

--
-- Name: news_newsarticle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_newsarticle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_newsarticle_id_seq OWNER TO postgres;

--
-- Name: news_newsarticle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_newsarticle_id_seq OWNED BY public.news_newsarticle.id;


--
-- Name: asset_compliance_link id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_compliance_link ALTER COLUMN id SET DEFAULT nextval('aikovrr.asset_compliance_link_id_seq'::regclass);


--
-- Name: asset_control_link id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_control_link ALTER COLUMN id SET DEFAULT nextval('aikovrr.asset_control_link_id_seq'::regclass);


--
-- Name: asset_evidence id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_evidence ALTER COLUMN id SET DEFAULT nextval('aikovrr.asset_evidence_id_seq'::regclass);


--
-- Name: asset_integration id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_integration ALTER COLUMN id SET DEFAULT nextval('aikovrr.asset_integration_id_seq'::regclass);


--
-- Name: asset_note id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_note ALTER COLUMN id SET DEFAULT nextval('aikovrr.asset_note_id_seq'::regclass);


--
-- Name: asset_risk_link id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_risk_link ALTER COLUMN id SET DEFAULT nextval('aikovrr.asset_risk_link_id_seq'::regclass);


--
-- Name: auth_app_user id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_app_user ALTER COLUMN id SET DEFAULT nextval('aikovrr.auth_app_user_id_seq'::regclass);


--
-- Name: core_department id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_department ALTER COLUMN id SET DEFAULT nextval('aikovrr.core_department_id_seq'::regclass);


--
-- Name: core_tenant id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_tenant ALTER COLUMN id SET DEFAULT nextval('aikovrr.core_tenant_id_seq'::regclass);


--
-- Name: core_user id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_user ALTER COLUMN id SET DEFAULT nextval('aikovrr.core_user_id_seq'::regclass);


--
-- Name: governance_custom_field id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_custom_field ALTER COLUMN id SET DEFAULT nextval('aikovrr.governance_custom_field_id_seq'::regclass);


--
-- Name: governance_self_assessment_task id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_self_assessment_task ALTER COLUMN id SET DEFAULT nextval('aikovrr.governance_self_assessment_task_id_seq'::regclass);


--
-- Name: risk_category id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_category ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_category_id_seq'::regclass);


--
-- Name: risk_control id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_control ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_control_id_seq'::regclass);


--
-- Name: risk_framework id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_framework ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_framework_id_seq'::regclass);


--
-- Name: risk_note id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_note ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_note_id_seq'::regclass);


--
-- Name: risk_scenario id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_scenario_id_seq'::regclass);


--
-- Name: risk_scenario_categories id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_categories ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_scenario_categories_id_seq'::regclass);


--
-- Name: risk_scenario_control id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_control ALTER COLUMN id SET DEFAULT nextval('aikovrr.risk_scenario_control_id_seq'::regclass);


--
-- Name: visibility_ai_asset id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_ai_asset ALTER COLUMN id SET DEFAULT nextval('aikovrr.visibility_ai_asset_id_seq'::regclass);


--
-- Name: visibility_asset_relationship id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_asset_relationship ALTER COLUMN id SET DEFAULT nextval('aikovrr.visibility_asset_relationship_id_seq'::regclass);


--
-- Name: visibility_discovery_source id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_discovery_source ALTER COLUMN id SET DEFAULT nextval('aikovrr.visibility_discovery_source_id_seq'::regclass);


--
-- Name: visibility_risk_profile id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_risk_profile ALTER COLUMN id SET DEFAULT nextval('aikovrr.visibility_risk_profile_id_seq'::regclass);


--
-- Name: visibility_usage_indicator id; Type: DEFAULT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_usage_indicator ALTER COLUMN id SET DEFAULT nextval('aikovrr.visibility_usage_indicator_id_seq'::regclass);


--
-- Name: news_newsarticle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_newsarticle ALTER COLUMN id SET DEFAULT nextval('public.news_newsarticle_id_seq'::regclass);


--
-- Data for Name: asset_compliance_link; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.asset_compliance_link (id, asset_id, assessment_id, framework_id, created_at) FROM stdin;
\.


--
-- Data for Name: asset_control_link; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.asset_control_link (id, asset_id, control_id, created_at) FROM stdin;
141	6	1	2025-11-05 08:27:00.096488
142	6	2	2025-11-05 08:27:00.096488
143	6	4	2025-11-05 08:27:00.096488
144	6	5	2025-11-05 08:27:00.096488
145	6	9	2025-11-05 08:27:00.096488
146	4	1	2025-11-05 08:27:00.096488
147	4	4	2025-11-05 08:27:00.096488
148	4	9	2025-11-05 08:27:00.096488
149	8	1	2025-11-05 08:27:00.096488
150	8	4	2025-11-05 08:27:00.096488
151	8	9	2025-11-05 08:27:00.096488
152	1	1	2025-11-05 08:27:00.096488
153	1	2	2025-11-05 08:27:00.096488
154	1	5	2025-11-05 08:27:00.096488
155	3	1	2025-11-05 08:27:00.096488
156	3	4	2025-11-05 08:27:00.096488
157	7	1	2025-11-05 08:27:00.096488
158	7	2	2025-11-05 08:27:00.096488
159	10	1	2025-11-05 08:27:00.096488
163	2	1	2025-11-05 08:27:00.096488
164	5	1	2025-11-05 08:27:00.096488
165	9	1	2025-11-05 08:27:00.096488
168	31	1	2025-11-05 08:27:00.096488
169	31	9	2025-11-05 08:27:00.096488
170	35	1	2025-11-05 08:27:00.096488
171	40	1	2025-11-05 08:27:00.096488
172	42	1	2025-11-05 08:27:00.096488
173	43	1	2025-11-05 08:27:00.096488
174	44	1	2025-11-05 08:27:00.096488
175	45	1	2025-11-05 08:27:00.096488
\.


--
-- Data for Name: asset_evidence; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.asset_evidence (id, asset_id, evidence_type, title, file_url, uploaded_by_id, uploaded_at) FROM stdin;
1	6	dpia	Fraud Detection Model DPIA	https://docs.swifttech.com/dpia/fraud-model-2024.pdf	19	2025-11-05 08:26:11.522595
2	6	risk_assessment	AI Risk Assessment - Fraud Detection	https://docs.swifttech.com/risk/fraud-2024.pdf	7	2025-11-05 08:26:11.522595
3	6	audit_report	Q3 2024 Audit Report	https://docs.swifttech.com/audit/q3-2024.pdf	19	2025-11-05 08:26:11.522595
4	4	approval	Zendesk AI Approval - Customer Success	https://docs.swifttech.com/approvals/zendesk-2024.pdf	17	2025-11-05 08:26:11.522595
5	8	dpia	Workday AI DPIA	https://docs.swifttech.com/dpia/workday-2024.pdf	19	2025-11-05 08:26:11.522595
6	8	risk_assessment	HR AI Risk Assessment	https://docs.swifttech.com/risk/hr-ai-2024.pdf	8	2025-11-05 08:26:11.522595
7	3	approval	Salesforce Einstein Approval	https://docs.swifttech.com/approvals/salesforce-2024.pdf	6	2025-11-05 08:26:11.522595
8	10	approval	Microsoft 365 Copilot Enterprise Agreement	https://docs.swifttech.com/approvals/m365-2024.pdf	16	2025-11-05 08:26:11.522595
9	45	approval	Azure OpenAI Service Agreement	https://docs.swifttech.com/approvals/azure-openai-2024.pdf	16	2025-11-05 08:26:11.522595
\.


--
-- Data for Name: asset_integration; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.asset_integration (id, asset_id, integration_type, last_sync, sync_status, sync_details, created_at, updated_at) FROM stdin;
1	1	aad	2025-11-05 06:26:11.524322	success	{"users": 45, "permissions": ["repo.read", "repo.write"]}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
2	3	aad	2025-11-05 07:26:11.524322	success	{"users": 23, "permissions": ["crm.read", "crm.write"]}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
3	4	aad	2025-11-05 05:26:11.524322	success	{"users": 8, "permissions": ["support.read", "support.write"]}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
4	6	aad	2025-11-05 07:56:11.524322	success	{"users": 5, "permissions": ["finance.admin"]}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
5	10	aad	2025-11-05 07:26:11.524322	success	{"users": 120, "permissions": ["office.read", "office.write"]}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
6	21	zscaler	2025-11-05 08:11:11.524322	success	{"users": 15, "traffic_volume": "2.3GB"}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
7	22	zscaler	2025-11-05 08:06:11.524322	success	{"users": 8, "traffic_volume": "1.8GB"}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
8	27	zscaler	2025-11-05 08:16:11.524322	success	{"users": 5, "traffic_volume": "0.9GB"}	2025-11-05 08:26:11.524322	2025-11-05 08:26:11.524322
\.


--
-- Data for Name: asset_note; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.asset_note (id, asset_id, note, created_by_id, created_at) FROM stdin;
1	21	Discovered through network monitoring. Multiple engineers using without approval. Need to assess risk and determine path forward.	2	2025-11-05 08:26:11.519199
2	21	Meeting scheduled with engineering leads to discuss usage policy and potential sanctioning.	19	2025-11-05 08:26:11.519199
3	6	Model performance review completed. Accuracy: 94.2%. False positive rate: 2.1%. Meets all requirements.	7	2025-11-05 08:26:11.519199
4	6	Annual audit completed. All controls verified. No findings.	19	2025-11-05 08:26:11.519199
5	4	Customer satisfaction score: 4.7/5. Handling 65% of tier-1 support tickets successfully.	17	2025-11-05 08:26:11.519199
6	22	Engineering team reports high productivity gains. Requesting formal evaluation for sanctioning.	9	2025-11-05 08:26:11.519199
7	27	Usage detected in research team. Evaluating for potential enterprise license.	10	2025-11-05 08:26:11.519199
8	44	API integration for customer-facing chatbot. Security review in progress.	16	2025-11-05 08:26:11.519199
9	45	Enterprise agreement signed. Deploying to production next month.	16	2025-11-05 08:26:11.519199
\.


--
-- Data for Name: asset_risk_link; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.asset_risk_link (id, asset_id, risk_id, created_at) FROM stdin;
53	1	2	2025-11-05 08:27:00.092835
54	3	3	2025-11-05 08:27:00.092835
55	6	4	2025-11-05 08:27:00.092835
56	8	5	2025-11-05 08:27:00.092835
57	10	1	2025-11-05 08:27:00.092835
61	21	1	2025-11-05 08:27:00.092835
62	22	1	2025-11-05 08:27:00.092835
63	27	1	2025-11-05 08:27:00.092835
64	35	1	2025-11-05 08:27:00.092835
65	44	1	2025-11-05 08:27:00.092835
66	45	1	2025-11-05 08:27:00.092835
\.


--
-- Data for Name: auth_app_user; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.auth_app_user (id, username, email, password_hash, first_name, last_name, role, is_active, is_superuser, last_login, created_at, updated_at) FROM stdin;
2	or	or@kovrr.com	pbkdf2_sha256$600000$placeholder	Or	Amir	analyst	t	f	\N	2025-11-05 08:17:36.575702	2025-11-05 08:17:36.575702
3	huw	huw@kovrr.com	pbkdf2_sha256$600000$OXvute9xykxXy3RXSo68ZG$bCjHZBW/tCzzquLMUHPcuBlhwaf3AcRLqV/IuaobcxA=			analyst	t	f	\N	2025-12-02 14:09:57.036745	2025-12-02 14:09:57.036922
1	admin	admin@aikovrr.com	pbkdf2_sha256$600000$cgbbTdHGP1dQIHeiTZYSiL$5oElwhyrHX9GUWuCPzeM3kWFApR12oQiJZNxChbVU78=	Admin	User	admin	t	t	2025-12-02 15:32:16.526076	2025-11-05 08:17:36.575702	2025-11-05 06:51:10.655832
5	ohad	ohadh@kovrr.com	pbkdf2_sha256$870000$QTtZfp9OElWVyVq0$wZyjk1fWuvpBrJSuGIIeLPmHOQAd6H/53FaK/BLTUFc=	Ohad	H	analyst	t	f	\N	2025-12-08 14:26:48.068405	2025-12-08 14:26:48.068405
4	tomers	tomers@kovrr.com	pbkdf2_sha256$600000$VnA0ckf2Yml4dHgXlDfuFS$xeA7HD+4Ho+Dg9sYJ3Rd0XRkmPLrfi4D+0zTBaOAPAM=	Tomer	S	analyst	t	f	2025-12-08 12:28:45.013694	2025-12-08 14:26:48.065296	2025-12-08 14:26:48.065296
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add app user	6	add_appuser
22	Can change app user	6	change_appuser
23	Can delete app user	6	delete_appuser
24	Can view app user	6	view_appuser
25	Can add department	7	add_department
26	Can change department	7	change_department
27	Can delete department	7	delete_department
28	Can view department	7	view_department
29	Can add tenant	8	add_tenant
30	Can change tenant	8	change_tenant
31	Can delete tenant	8	delete_tenant
32	Can view tenant	8	view_tenant
33	Can add user	9	add_user
34	Can change user	9	change_user
35	Can delete user	9	delete_user
36	Can view user	9	view_user
37	Can add ai asset	10	add_aiasset
38	Can change ai asset	10	change_aiasset
39	Can delete ai asset	10	delete_aiasset
40	Can view ai asset	10	view_aiasset
41	Can add asset relationship	11	add_assetrelationship
42	Can change asset relationship	11	change_assetrelationship
43	Can delete asset relationship	11	delete_assetrelationship
44	Can view asset relationship	11	view_assetrelationship
45	Can add discovery source	12	add_discoverysource
46	Can change discovery source	12	change_discoverysource
47	Can delete discovery source	12	delete_discoverysource
48	Can view discovery source	12	view_discoverysource
49	Can add risk profile	13	add_riskprofile
50	Can change risk profile	13	change_riskprofile
51	Can delete risk profile	13	delete_riskprofile
52	Can view risk profile	13	view_riskprofile
53	Can add usage indicator	14	add_usageindicator
54	Can change usage indicator	14	change_usageindicator
55	Can delete usage indicator	14	delete_usageindicator
56	Can view usage indicator	14	view_usageindicator
57	Can add category	15	add_category
58	Can change category	15	change_category
59	Can delete category	15	delete_category
60	Can view category	15	view_category
61	Can add control	16	add_control
62	Can change control	16	change_control
63	Can delete control	16	delete_control
64	Can view control	16	view_control
65	Can add framework	17	add_framework
66	Can change framework	17	change_framework
67	Can delete framework	17	delete_framework
68	Can view framework	17	view_framework
69	Can add note	18	add_note
70	Can change note	18	change_note
71	Can delete note	18	delete_note
72	Can view note	18	view_note
73	Can add risk scenario	19	add_riskscenario
74	Can change risk scenario	19	change_riskscenario
75	Can delete risk scenario	19	delete_riskscenario
76	Can view risk scenario	19	view_riskscenario
77	Can add scenario category	20	add_scenariocategory
78	Can change scenario category	20	change_scenariocategory
79	Can delete scenario category	20	delete_scenariocategory
80	Can view scenario category	20	view_scenariocategory
81	Can add scenario control	21	add_scenariocontrol
82	Can change scenario control	21	change_scenariocontrol
83	Can delete scenario control	21	delete_scenariocontrol
84	Can view scenario control	21	view_scenariocontrol
85	Can add custom field	22	add_customfield
86	Can change custom field	22	change_customfield
87	Can delete custom field	22	delete_customfield
88	Can view custom field	22	view_customfield
89	Can add self assessment task	23	add_selfassessmenttask
90	Can change self assessment task	23	change_selfassessmenttask
91	Can delete self assessment task	23	delete_selfassessmenttask
92	Can view self assessment task	23	view_selfassessmenttask
93	Can add alert	24	add_alert
94	Can change alert	24	change_alert
95	Can delete alert	24	delete_alert
96	Can view alert	24	view_alert
97	Can add evidence	25	add_evidence
98	Can change evidence	25	change_evidence
99	Can delete evidence	25	delete_evidence
100	Can view evidence	25	view_evidence
101	Can add policy violation	26	add_policyviolation
102	Can change policy violation	26	change_policyviolation
103	Can delete policy violation	26	delete_policyviolation
104	Can view policy violation	26	view_policyviolation
105	Can add audit log	27	add_auditlog
106	Can change audit log	27	change_auditlog
107	Can delete audit log	27	delete_auditlog
108	Can view audit log	27	view_auditlog
109	Can add news article	28	add_newsarticle
110	Can change news article	28	change_newsarticle
111	Can delete news article	28	delete_newsarticle
112	Can view news article	28	view_newsarticle
\.


--
-- Data for Name: core_department; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.core_department (id, tenant_id, name, risk_exposure_agg, created_at, updated_at) FROM stdin;
1	1	Engineering	125000.00	2025-11-05 08:17:36.577831	2025-11-05 08:17:36.577831
2	1	Marketing	45000.00	2025-11-05 08:17:36.577831	2025-11-05 08:17:36.577831
3	1	Sales	67000.00	2025-11-05 08:17:36.577831	2025-11-05 08:17:36.577831
4	1	Finance	89000.00	2025-11-05 08:17:36.577831	2025-11-05 08:17:36.577831
5	1	HR	34000.00	2025-11-05 08:17:36.577831	2025-11-05 08:17:36.577831
\.


--
-- Data for Name: core_tenant; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.core_tenant (id, org_name, config, admin_contacts, created_at, updated_at) FROM stdin;
1	Swift Tech	{}	admin@swifttech.com	2025-11-05 08:17:36.577303	2025-11-05 08:17:36.577303
\.


--
-- Data for Name: core_user; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.core_user (id, tenant_id, department_id, name, email, role, avatar, shadow_sanction_ratio, is_active, created_at, updated_at) FROM stdin;
1	1	1	Albert Tross	albert.tross@swifttech.com	Senior Engineer	https://i.pravatar.cc/150?img=1	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
2	1	1	Owen Authora	owen.authora@swifttech.com	Tech Lead	https://i.pravatar.cc/150?img=2	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
3	1	1	Capt. Trunk	capt.trunk@swifttech.com	DevOps Engineer	https://i.pravatar.cc/150?img=3	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
4	1	2	Theodore Calvin	theodore.calvin@swifttech.com	Marketing Manager	https://i.pravatar.cc/150?img=4	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
5	1	2	Hannibal Smith	hannibal.smith@swifttech.com	Content Strategist	https://i.pravatar.cc/150?img=5	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
6	1	3	Sarah Connor	sarah.connor@swifttech.com	Sales Director	https://i.pravatar.cc/150?img=6	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
7	1	4	John McClane	john.mcclane@swifttech.com	CFO	https://i.pravatar.cc/150?img=7	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
8	1	5	Ellen Ripley	ellen.ripley@swifttech.com	HR Manager	https://i.pravatar.cc/150?img=8	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
9	1	1	Ada Lovelace	ada.lovelace@swifttech.com	ML Engineer	https://i.pravatar.cc/150?img=9	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
10	1	1	Alan Turing	alan.turing@swifttech.com	AI Researcher	https://i.pravatar.cc/150?img=10	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
11	1	2	Don Draper	don.draper@swifttech.com	Creative Director	https://i.pravatar.cc/150?img=11	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
12	1	3	Jordan Belfort	jordan.belfort@swifttech.com	VP Sales	https://i.pravatar.cc/150?img=12	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
13	1	4	Bruce Wayne	bruce.wayne@swifttech.com	Financial Analyst	https://i.pravatar.cc/150?img=13	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
14	1	5	Michael Scott	michael.scott@swifttech.com	HR Specialist	https://i.pravatar.cc/150?img=14	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
15	1	1	Grace Hopper	grace.hopper@swifttech.com	Principal Engineer	https://i.pravatar.cc/150?img=15	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
16	1	4	Tony Stark	tony.stark@swifttech.com	CTO	https://i.pravatar.cc/150?img=16	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
17	1	2	Leslie Knope	leslie.knope@swifttech.com	Marketing Analyst	https://i.pravatar.cc/150?img=17	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
18	1	3	Harvey Specter	harvey.specter@swifttech.com	Sales Manager	https://i.pravatar.cc/150?img=18	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
19	1	5	Atticus Finch	atticus.finch@swifttech.com	Compliance Officer	https://i.pravatar.cc/150?img=19	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
20	1	1	Linus Torvalds	linus.torvalds@swifttech.com	Staff Engineer	https://i.pravatar.cc/150?img=20	0.00	t	2025-11-05 08:17:36.579837	2025-11-05 08:17:36.579837
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	core	appuser
7	core	department
8	core	tenant
9	core	user
10	visibility	aiasset
11	visibility	assetrelationship
12	visibility	discoverysource
13	visibility	riskprofile
14	visibility	usageindicator
15	risk	category
16	risk	control
17	risk	framework
18	risk	note
19	risk	riskscenario
20	risk	scenariocategory
21	risk	scenariocontrol
22	governance	customfield
23	governance	selfassessmenttask
24	monitoring	alert
25	monitoring	evidence
26	monitoring	policyviolation
27	monitoring	auditlog
28	news	newsarticle
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.django_migrations (id, app, name, applied) FROM stdin;
1	core	0001_initial	2025-11-05 08:58:33.439145+02
2	contenttypes	0001_initial	2025-11-05 08:58:33.448939+02
3	admin	0001_initial	2025-11-05 08:58:33.4644+02
4	admin	0002_logentry_remove_auto_add	2025-11-05 08:58:33.467868+02
5	admin	0003_logentry_add_action_flag_choices	2025-11-05 08:58:33.471044+02
6	contenttypes	0002_remove_content_type_name	2025-11-05 08:58:33.478728+02
7	auth	0001_initial	2025-11-05 08:58:33.498804+02
8	auth	0002_alter_permission_name_max_length	2025-11-05 08:58:33.502724+02
9	auth	0003_alter_user_email_max_length	2025-11-05 08:58:33.505531+02
10	auth	0004_alter_user_username_opts	2025-11-05 08:58:33.50859+02
11	auth	0005_alter_user_last_login_null	2025-11-05 08:58:33.511837+02
12	auth	0006_require_contenttypes_0002	2025-11-05 08:58:33.513296+02
13	auth	0007_alter_validators_add_error_messages	2025-11-05 08:58:33.516246+02
14	auth	0008_alter_user_username_max_length	2025-11-05 08:58:33.519377+02
15	auth	0009_alter_user_last_name_max_length	2025-11-05 08:58:33.522575+02
16	auth	0010_alter_group_name_max_length	2025-11-05 08:58:33.527343+02
17	auth	0011_update_proxy_permissions	2025-11-05 08:58:33.534548+02
18	auth	0012_alter_user_first_name_max_length	2025-11-05 08:58:33.537313+02
19	governance	0001_initial	2025-11-05 08:58:33.539653+02
20	risk	0001_initial	2025-11-05 08:58:33.546503+02
21	sessions	0001_initial	2025-11-05 08:58:33.554088+02
22	visibility	0001_initial	2025-11-05 08:58:33.558109+02
23	news	0001_initial	2025-11-27 20:45:30.984065+02
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.django_session (session_key, session_data, expire_date) FROM stdin;
or3pgo0mze88m9xdyz9lct0oicq6ytbp	.eJxVjMEOwiAQRP-FsyHQpbR49N5vIMuySNVAUtqT8d9tkx70OPPezFt43Nbst8aLn6O4Ci0uv11AenI5QHxguVdJtazLHOShyJM2OdXIr9vp_h1kbHlfcyLqIWJiFzR2ONhgwaBLoBMF6KPhwMZ2Ku5RORicHtVogZwFNpTE5wsbgjjF:1vGXTg:ArD0AfAeOySeQI1K-1LSUh18kLzmtjN4rh8GEv7bpRE	2025-11-19 08:58:44.46929+02
hyd7y0q3ighum9n416sayqngbjhaqs6n	.eJxVjMEOwiAQRP-FsyHQpbR49N5vIMuySNVAUtqT8d9tkx70OPPezFt43Nbst8aLn6O4Ci0uv11AenI5QHxguVdJtazLHOShyJM2OdXIr9vp_h1kbHlfcyLqIWJiFzR2ONhgwaBLoBMF6KPhwMZ2Ku5RORicHtVogZwFNpTE5wsbgjjF:1vHwTX:pVT6fWS6EgQ8ICbeVeN8bDrgxaOeZyZtWUyfZLTAqhM	2025-11-23 05:52:23.126947+02
fexrl42ioknct5ousnmog81cx2qfm21b	.eJxVjMEOwiAQRP-FsyHQpbR49N5vIMuySNVAUtqT8d9tkx70OPPezFt43Nbst8aLn6O4Ci0uv11AenI5QHxguVdJtazLHOShyJM2OdXIr9vp_h1kbHlfcyLqIWJiFzR2ONhgwaBLoBMF6KPhwMZ2Ku5RORicHtVogZwFNpTE5wsbgjjF:1vI6mU:VZnmBrklp6J4ggE71zcxlzYCJ_AR3ujAER4Rmptvw4w	2025-11-23 16:52:38.233971+02
ghi66i5ylod5j7n7a02balnqfh7j9ncr	.eJxVjMEOwiAQRP-FsyHQpbR49N5vIMuySNVAUtqT8d9tkx70OPPezFt43Nbst8aLn6O4Ci0uv11AenI5QHxguVdJtazLHOShyJM2OdXIr9vp_h1kbHlfcyLqIWJiFzR2ONhgwaBLoBMF6KPhwMZ2Ku5RORicHtVogZwFNpTE5wsbgjjF:1vPgKM:uhtJSctXI61DytQ9CeeMvd3xs8RYKnIM7VzAqqCZwYw	2025-12-14 14:14:54.310076+02
zxk6b7t8j5fj581aksr1ruv884grndak	.eJxVjDkOwjAUBe_iGlneF0r6nMH6Xj4OIFuKkwpxdxIpBbRvZt6bBNjWGrZRljBnciWKXH63COlZ2gHyA9q909TbusyRHgo96aBTz-V1O92_gwqj7jUXHi06x41Vyek9VAy487KYxDAn6230ShUhTEHBOKLK0oLXGpjExMnnC9dJN7M:1vSaM9:EUfpk5crFzxWqyA7lpauoaR0PYVaho0rqI3ynArfbCg	2025-12-22 14:28:45.017761+02
\.


--
-- Data for Name: governance_custom_field; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.governance_custom_field (id, tenant_id, entity_type, entity_id, field_name, field_type, field_value, created_at) FROM stdin;
\.


--
-- Data for Name: governance_self_assessment_task; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.governance_self_assessment_task (id, tenant_id, framework_id, control_id, assigned_to_id, title, description, status, due_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: news_newsarticle; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.news_newsarticle (id, title, summary, url, source, source_url, framework, article_type, published_at, fetched_at, is_active) FROM stdin;
171	19 Nov. 2025European Commission proposes significant reforms to GDPR, AI Act	IAPPYou need to enable JavaScript to run this app.Loading...	https://iapp.org/news/a/european-commission-proposes-significant-reforms-to-gdpr-ai-act	IAPP	https://iapp.org	AI Governance	standard	2025-11-19 02:00:00+02	2025-11-30 11:56:11.29283+02	t
167	20 Nov. 2025Notes from the Asia-Pacific region: India releases DPDPA rules, AI governance guidelines	IAPPYou need to enable JavaScript to run this app.Loading...	https://iapp.org/news/a/notes-from-the-asia-pacific-region-india-releases-dpdpa-rules-ai-governance-guidelines	IAPP	https://iapp.org	AI Governance	standard	2025-11-20 02:00:00+02	2025-11-29 15:59:09.742538+02	t
168	20 Nov. 2025Joint guidelines on GDPR-AI Act interplay to come soon, EDPS says	IAPPYou need to enable JavaScript to run this app.Loading...	https://iapp.org/news/a/edps-to-issue-joint-guidance-on-gdpr-ai-act-interplay-with-european-commission	IAPP	https://iapp.org	AI Governance	standard	2025-11-20 02:00:00+02	2025-11-29 15:59:10.850564+02	t
169	The AI audit burden: Why ‘Explainable AI’ is the key	AI decisions are only defensible when the reasoning behind them is visible, traceable, and auditable. Explainable AI delivers that visibility, turning black-box outputs into documented logic that compliance officers can stand behind when regulators, auditors, or stakeholders demand answers.	https://www.complianceweek.com/opinion/the-ai-audit-burden-why-explainable-ai-is-the-key/36361.article	Compliance Week	https://www.complianceweek.com	AI Governance	standard	2025-11-29 15:59:29.754231+02	2025-11-29 15:59:29.758369+02	t
170	The rise of the AI compliance officer	As AI reshapes business operations and regulators move quickly, companies increasingly need a dedicated AI compliance officer to ensure ethical, transparent, and accountable deployment.	https://www.complianceweek.com/opinion/the-rise-of-the-ai-compliance-officer/36343.article	Compliance Week	https://www.complianceweek.com	AI Governance	standard	2025-11-29 15:59:32.119499+02	2025-11-29 15:59:32.123563+02	t
\.


--
-- Data for Name: risk_category; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_category (id, name, parent_id, description, created_at) FROM stdin;
\.


--
-- Data for Name: risk_control; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_control (id, framework_id, control_id, description, maturity_level, created_at) FROM stdin;
1	1	GOVERN-1.1	Legal and regulatory requirements	Level 3	2025-11-05 08:17:36.582793
2	1	GOVERN-1.2	Risk management processes	Level 3	2025-11-05 08:17:36.582793
3	1	MAP-1.1	Context documentation	Level 2	2025-11-05 08:17:36.582793
4	1	MEASURE-2.3	Privacy assessment	Level 2	2025-11-05 08:17:36.582793
5	1	MANAGE-1.1	Risk prioritization	Level 3	2025-11-05 08:17:36.582793
6	2	A.5.1	AI system inventory	Level 4	2025-11-05 08:17:36.582793
7	2	A.6.1	Data governance	Level 3	2025-11-05 08:17:36.582793
8	3	Art.9	High-risk AI systems	Level 2	2025-11-05 08:17:36.582793
9	3	Art.10	Data and data governance	Level 2	2025-11-05 08:17:36.582793
10	3	Art.15	Accuracy, robustness and cybersecurity	Level 3	2025-11-05 08:17:36.582793
\.


--
-- Data for Name: risk_framework; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_framework (id, name, version, description, created_at) FROM stdin;
1	NIST AI RMF	1.0	NIST AI Risk Management Framework	2025-11-05 08:17:36.582264
2	ISO/IEC 42001	2023	AI Management System	2025-11-05 08:17:36.582264
3	EU AI Act	Draft	European Union AI Act	2025-11-05 08:17:36.582264
\.


--
-- Data for Name: risk_note; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_note (id, scenario_id, author_id, text, created_at) FROM stdin;
\.


--
-- Data for Name: risk_scenario; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_scenario (id, tenant_id, owner_id, name, description, likelihood, impact, priority, status, response_plan, annual_likelihood, peer_rate, financial_loss_min, financial_loss_max, pii_exposure, pci_exposure, phi_exposure, review_date, created_date, last_edited, mitigation_cost, ticket_link, created_at, updated_at) FROM stdin;
1	1	1	Sensitive data exposure via AI tools	Employees may inadvertently share confidential information with AI assistants	Likely	Major	High	Analyzing	\N	\N	\N	50000.00	500000.00	0	0	0	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571	\N	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571
2	1	2	Code vulnerability from AI suggestions	AI-generated code may contain security flaws or vulnerabilities	Possible	Moderate	Medium	Mitigating	\N	\N	\N	20000.00	200000.00	0	0	0	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571	\N	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571
3	1	6	Biased AI recommendations in sales	AI sales tools may provide biased recommendations affecting customer fairness	Possible	Major	High	Identified	\N	\N	\N	30000.00	300000.00	0	0	0	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571	\N	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571
4	1	7	Financial fraud via AI manipulation	AI models used in finance could be manipulated for fraudulent activities	Unlikely	Severe	High	Analyzing	\N	\N	\N	100000.00	1000000.00	0	0	0	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571	\N	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571
5	1	8	Privacy breach in HR AI systems	AI tools processing employee data may violate privacy regulations	Possible	Major	High	Mitigating	\N	\N	\N	40000.00	400000.00	0	0	0	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571	\N	\N	2025-11-05 08:17:36.583571	2025-11-05 08:17:36.583571
\.


--
-- Data for Name: risk_scenario_categories; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_scenario_categories (id, scenario_id, category_id) FROM stdin;
\.


--
-- Data for Name: risk_scenario_control; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.risk_scenario_control (id, scenario_id, control_id, compliance_status, created_at) FROM stdin;
\.


--
-- Data for Name: visibility_ai_asset; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.visibility_ai_asset (id, tenant_id, name, asset_type, owner_id, technical_owner_id, owning_org_unit, vendor_source, vendor_name, status, use_case, description, intended_users, projected_value, lifecycle_stage, deployment_platform, environment, risk_tier, risk_score, inherent_risk_score, residual_risk_score, personal_data_used, sensitive_categories, regulatory_applicability, control_coverage, model_provider, model_version, service_principal_id, aad_permissions, user_assignments, network_destinations, first_seen, last_seen, first_deployment_date, created_at, updated_at, risk_profile_id, category, vendor, domain, entra_service_principal_id, entra_app_id, entra_publisher_name, entra_sign_in_audience) FROM stdin;
1	1	GitHub Copilot	app	2	1	Engineering	third_party	GitHub	sanctioned	Code completion	AI code assistant	["employees"]	$50K productivity	production	saas	["prod"]	medium	45.00	55.00	45.00	f	[]	[]	["access_control", "monitoring"]	OpenAI	GPT-4	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
2	1	Grammarly Business	app	4	5	Marketing	third_party	Grammarly	sanctioned	Writing assistance	Grammar and style checking	["employees"]	$30K time savings	production	saas	["prod"]	low	25.00	35.00	25.00	f	[]	[]	["access_control"]	Grammarly	2.0	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
3	1	Salesforce Einstein	model	6	12	Sales	third_party	Salesforce	sanctioned	Sales forecasting	AI-powered CRM analytics	["employees"]	$100K revenue increase	production	saas	["prod"]	medium	40.00	50.00	40.00	t	["financial"]	["gdpr"]	["explainability", "monitoring"]	Salesforce	Einstein 3.0	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
4	1	Zendesk AI Agent	agent	17	17	Marketing	third_party	Zendesk	sanctioned	Customer support	AI chatbot	["customers"]	$75K cost reduction	production	saas	["prod"]	high	55.00	70.00	55.00	t	["special_category"]	["gdpr", "ccpa"]	["human_oversight", "monitoring"]	Zendesk	Answer Bot 2.0	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
5	1	Tableau AI	app	7	13	Finance	third_party	Tableau	sanctioned	Data visualization	BI and analytics	["employees"]	$60K better decisions	production	saas	["prod"]	low	30.00	40.00	30.00	t	["financial"]	["sox"]	["access_control"]	Tableau	Einstein Discovery	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
6	1	Internal Fraud Detection	model	7	13	Finance	internal	Swift Tech	sanctioned	Fraud detection	Custom ML model	["employees"]	$200K fraud prevention	production	cloud	["prod"]	high	60.00	75.00	60.00	t	["financial", "special_category"]	["gdpr", "sox"]	["explainability", "human_oversight", "monitoring"]	Internal	v2.1	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
7	1	HubSpot AI	app	4	11	Marketing	third_party	HubSpot	sanctioned	Marketing automation	AI marketing platform	["employees"]	$80K efficiency	production	saas	["prod"]	medium	42.00	52.00	42.00	t	[]	["gdpr"]	["access_control"]	HubSpot	Content Assistant 1.0	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
8	1	Workday AI	app	8	14	HR	third_party	Workday	sanctioned	HR analytics	HR management system	["employees"]	$45K HR efficiency	production	saas	["prod"]	medium	48.00	58.00	48.00	t	["special_category", "health"]	["gdpr", "hipaa"]	["explainability", "monitoring"]	Workday	Prism Analytics	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
9	1	Zoom AI Companion	app	16	3	Engineering	third_party	Zoom	sanctioned	Meeting transcription	AI meeting assistant	["employees"]	$35K time savings	production	saas	["prod"]	low	28.00	38.00	28.00	f	[]	[]	["monitoring"]	Zoom	AI Companion 1.0	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
10	1	Microsoft 365 Copilot	app	16	15	Engineering	third_party	Microsoft	sanctioned	Productivity	AI for Office apps	["employees"]	$120K productivity	production	saas	["prod"]	medium	44.00	54.00	44.00	t	[]	["gdpr"]	["access_control", "monitoring"]	Microsoft	Copilot 1.0	\N	[]	[]	[]	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	2025-11-05 08:17:36.585177	2025-11-05 08:17:36.585177	\N	\N	\N	\N	\N	\N	\N	\N
31	1	Fireflies.ai	app	17	17	Customer Success	third_party	Fireflies.ai	under_review	Call recording	Meeting AI	["employees", "customers"]	$36K insights	pilot	saas	["test"]	high	64.00	74.00	64.00	t	["special_category"]	["gdpr", "ccpa"]	["human_oversight"]	Fireflies.ai	1.5	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
32	1	Descript	app	4	5	Marketing	third_party	Descript	under_review	Video editing	AI video editor	["employees"]	$30K content	testing	saas	["test"]	low	32.00	42.00	32.00	f	[]	[]	[]	Descript	3.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
33	1	Synthesia	app	4	11	Marketing	third_party	Synthesia	under_review	AI video generation	Video creation	["employees", "customers"]	$50K video	testing	saas	["test"]	medium	52.00	62.00	52.00	f	[]	[]	[]	Synthesia	2.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
34	1	Loom AI	app	16	3	Engineering	third_party	Loom	under_review	Video messaging	Async video	["employees"]	$28K communication	pilot	saas	["test", "prod"]	low	30.00	40.00	30.00	f	[]	[]	["monitoring"]	Loom	AI 1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
35	1	Superhuman AI	app	2	1	Engineering	third_party	Superhuman	under_review	Email management	AI email client	["employees"]	$35K email efficiency	pilot	saas	["test"]	medium	42.00	52.00	42.00	t	[]	["gdpr"]	["access_control"]	Superhuman	1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
36	1	Mem AI	app	1	9	Engineering	third_party	Mem	under_review	Knowledge management	AI notes	["employees"]	$22K knowledge	testing	saas	["test"]	low	28.00	38.00	28.00	f	[]	[]	[]	Mem	1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
37	1	Replit Ghostwriter	app	9	10	Engineering	third_party	Replit	under_review	Code generation	Browser IDE AI	["employees"]	$40K dev productivity	testing	saas	["test"]	medium	44.00	54.00	44.00	f	[]	[]	[]	Replit	Ghostwriter 1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
38	1	Tabnine	app	15	20	Engineering	third_party	Tabnine	under_review	Code completion	Privacy-focused AI	["employees"]	$38K productivity	pilot	on_premises	["test"]	low	26.00	36.00	26.00	f	[]	[]	["access_control"]	Tabnine	Pro 1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
39	1	Codeium	app	1	15	Engineering	third_party	Codeium	under_review	Code completion	Free alternative	["employees"]	$30K productivity	testing	saas	["test"]	low	24.00	34.00	24.00	f	[]	[]	[]	Codeium	1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
40	1	Amazon CodeWhisperer	app	16	15	Engineering	third_party	AWS	under_review	AWS code generation	AWS-focused AI	["employees"]	$42K AWS efficiency	pilot	saas	["test", "prod"]	medium	40.00	50.00	40.00	f	[]	[]	["access_control", "monitoring"]	AWS	CodeWhisperer 1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
41	1	Cursor AI	app	9	10	Engineering	third_party	Cursor	under_review	AI code editor	Next-gen IDE	["employees"]	$48K dev experience	testing	saas	["test"]	medium	46.00	56.00	46.00	f	[]	[]	[]	Cursor	0.9	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
42	1	Sourcegraph Cody	app	15	20	Engineering	third_party	Sourcegraph	under_review	Code AI	Context-aware	["employees"]	$52K codebase	pilot	saas	["test"]	medium	48.00	58.00	48.00	f	[]	[]	["access_control"]	Sourcegraph	Cody 1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
43	1	Anthropic Console	app	16	15	Engineering	third_party	Anthropic	under_review	Claude API	API integration	["employees"]	$60K custom AI	development	saas	["dev"]	high	68.00	78.00	68.00	t	[]	["gdpr"]	["access_control"]	Anthropic	Claude API 2.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
44	1	OpenAI API	service	16	15	Engineering	third_party	OpenAI	under_review	GPT API	Custom integration	["employees"]	$85K features	development	saas	["dev"]	high	72.00	82.00	72.00	t	["special_category"]	["gdpr"]	["access_control"]	OpenAI	GPT-4 API	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
45	1	Azure OpenAI	service	16	15	Engineering	third_party	Microsoft	under_review	Enterprise GPT	Azure-hosted AI	["employees"]	$95K enterprise	pilot	cloud	["test"]	medium	50.00	60.00	50.00	t	[]	["gdpr"]	["access_control", "monitoring"]	Microsoft	Azure OpenAI	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
46	1	Cohere API	service	10	9	Engineering	third_party	Cohere	under_review	NLP API	Language models	["employees"]	$45K NLP	development	saas	["dev"]	medium	55.00	65.00	55.00	t	[]	["gdpr"]	["access_control"]	Cohere	Command	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
47	1	Hugging Face	service	10	9	Engineering	open_source	Hugging Face	under_review	ML models	Open source models	["employees"]	$38K ML	development	cloud	["dev"]	medium	48.00	58.00	48.00	f	[]	[]	["access_control"]	Hugging Face	Transformers	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
48	1	Stability AI	service	11	11	Marketing	third_party	Stability AI	under_review	Image generation	Stable Diffusion	["employees"]	$42K creative	testing	saas	["test"]	medium	44.00	54.00	44.00	f	[]	[]	[]	Stability AI	SDXL	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
49	1	Replicate	service	10	9	Engineering	third_party	Replicate	under_review	ML deployment	Model hosting	["employees"]	$35K deployment	development	cloud	["dev"]	medium	46.00	56.00	46.00	f	[]	[]	["access_control"]	Replicate	1.0	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
50	1	LangChain	service	10	9	Engineering	open_source	LangChain	under_review	LLM framework	AI orchestration	["employees"]	$55K development	development	cloud	["dev"]	medium	50.00	60.00	50.00	f	[]	[]	["access_control"]	LangChain	0.1	\N	[]	[]	[]	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	2025-11-05 08:25:06.603701	2025-11-05 08:25:06.603701	\N	\N	\N	\N	\N	\N	\N	\N
21	1	ChatGPT	app	1	1	Engineering	third_party	OpenAI	shadow	General AI	Unapproved usage	["employees"]	\N	production	saas	["prod"]	critical	85.00	95.00	85.00	t	[]	[]	[]	OpenAI	GPT-4	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
22	1	Claude AI	app	9	10	Engineering	third_party	Anthropic	shadow	AI research	Unapproved	["employees"]	\N	production	saas	["prod"]	high	72.00	82.00	72.00	t	[]	[]	[]	Anthropic	Claude 2	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
23	1	Midjourney	app	11	11	Marketing	third_party	Midjourney	shadow	Image generation	Unapproved	["employees"]	\N	testing	saas	["test"]	medium	62.00	72.00	62.00	f	[]	[]	[]	Midjourney	v5	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
24	1	Perplexity AI	app	6	12	Sales	third_party	Perplexity	shadow	AI search	Unapproved	["employees"]	\N	production	saas	["prod"]	medium	58.00	68.00	58.00	f	[]	[]	[]	Perplexity	1.0	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
25	1	Character.AI	app	5	11	Marketing	third_party	Character.AI	shadow	AI personas	Unapproved	["employees"]	\N	testing	saas	["test"]	medium	54.00	64.00	54.00	f	[]	[]	[]	Character.AI	1.0	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
26	1	Poe	app	9	10	Engineering	third_party	Quora	shadow	Multi-model chat	Unapproved	["employees"]	\N	testing	saas	["test"]	high	70.00	80.00	70.00	t	[]	[]	[]	Quora	Poe 1.0	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
27	1	Bard	app	10	9	Engineering	third_party	Google	shadow	Google AI	Unapproved	["employees"]	\N	testing	saas	["test"]	high	66.00	76.00	66.00	t	[]	[]	[]	Google	Gemini Pro	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
28	1	Phind	app	1	20	Engineering	third_party	Phind	shadow	Dev search	Unapproved	["employees"]	\N	testing	saas	["test"]	low	22.00	32.00	22.00	f	[]	[]	[]	Phind	1.0	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
29	1	You.com	app	2	15	Engineering	third_party	You.com	shadow	AI search	Unapproved	["employees"]	\N	testing	saas	["test"]	medium	48.00	58.00	48.00	f	[]	[]	[]	You.com	1.0	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
30	1	Runway ML	app	11	11	Marketing	third_party	Runway	shadow	Creative AI	Unapproved	["employees"]	\N	testing	saas	["test"]	medium	48.00	58.00	48.00	f	[]	[]	[]	Runway	3.0	\N	[]	[]	[]	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	2025-11-05 08:25:18.852144	2025-11-05 08:25:18.852144	\N	\N	\N	\N	\N	\N	\N	\N
11	1	ChatGPT	app	1	1	Engineering	third_party	OpenAI	shadow	General AI assistant	Unapproved usage	["employees"]	\N	production	saas	["prod"]	critical	85.00	95.00	85.00	t	["special_category"]	["gdpr"]	[]	OpenAI	GPT-4	\N	[]	[]	[]	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	\N	\N	\N	\N	\N	\N	\N
12	1	Claude AI	app	9	10	Engineering	third_party	Anthropic	shadow	AI research assistant	Unapproved tool	["employees"]	\N	production	saas	["prod"]	high	72.00	82.00	72.00	t	[]	["gdpr"]	[]	Anthropic	Claude 2	\N	[]	[]	[]	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	\N	\N	\N	\N	\N	\N	\N
13	1	Jasper AI	app	5	11	Marketing	third_party	Jasper	shadow	Content generation	Unapproved content tool	["employees"]	\N	production	saas	["prod"]	high	68.00	78.00	68.00	f	[]	[]	[]	Jasper	2.0	\N	[]	[]	[]	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	\N	\N	\N	\N	\N	\N	\N
14	1	Midjourney	app	11	11	Marketing	third_party	Midjourney	shadow	Image generation	Unapproved design tool	["employees"]	\N	testing	saas	["test"]	medium	62.00	72.00	62.00	f	[]	[]	[]	Midjourney	v5	\N	[]	[]	[]	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	\N	\N	\N	\N	\N	\N	\N
15	1	Perplexity AI	app	6	12	Sales	third_party	Perplexity	shadow	AI search	Unapproved research tool	["employees"]	\N	production	saas	["prod"]	medium	58.00	68.00	58.00	f	[]	[]	[]	Perplexity	1.0	\N	[]	[]	[]	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	2025-11-30 14:33:02.419085	2025-11-30 14:33:02.419085	\N	\N	\N	\N	\N	\N	\N	\N
16	1	Baidu ERNIE Bot	app	1	1	Engineering	third_party	Baidu	blocked	AI assistant	BLOCKED: Data sovereignty and national security concerns	["employees"]	\N	blocked	saas	["prod"]	critical	92.00	98.00	92.00	t	["special_category"]	["gdpr", "ccpa"]	[]	Baidu	ERNIE 4.0	\N	[]	[]	[]	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	\N	\N	\N	\N	\N	\N	\N
17	1	Alibaba Tongyi Qianwen	app	9	10	Engineering	third_party	Alibaba Cloud	blocked	Large language model	BLOCKED: Corporate policy prohibits Chinese AI tools	["employees"]	\N	blocked	saas	["prod"]	critical	90.00	96.00	90.00	t	["financial", "special_category"]	["gdpr"]	[]	Alibaba	Qianwen 2.0	\N	[]	[]	[]	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	\N	\N	\N	\N	\N	\N	\N
18	1	Tencent Hunyuan	app	4	11	Marketing	third_party	Tencent	blocked	Content generation	BLOCKED: Compliance and data residency requirements not met	["employees"]	\N	blocked	saas	["prod"]	high	88.00	94.00	88.00	t	[]	["gdpr", "ccpa"]	[]	Tencent	Hunyuan 1.0	\N	[]	[]	[]	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	\N	\N	\N	\N	\N	\N	\N
19	1	ByteDance Doubao	app	6	12	Sales	third_party	ByteDance	blocked	AI chatbot	BLOCKED: Security review failed - data exfiltration risk	["employees"]	\N	blocked	saas	["prod"]	high	86.00	92.00	86.00	t	["special_category"]	["gdpr"]	[]	ByteDance	Doubao 1.0	\N	[]	[]	[]	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	2025-11-30 14:33:02.425235	2025-11-30 14:33:02.425235	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: visibility_asset_relationship; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.visibility_asset_relationship (id, user_id, ai_asset_id, discovery_source_id, relationship_type, confidence_score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: visibility_discovery_source; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.visibility_discovery_source (id, tenant_id, source_type, collection_date, confidence_level, metadata, created_at) FROM stdin;
\.


--
-- Data for Name: visibility_risk_profile; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.visibility_risk_profile (id, kovrr_vendor_id, risk_score, financial_exposure_min, financial_exposure_max, incident_history_ref, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: visibility_usage_indicator; Type: TABLE DATA; Schema: aikovrr; Owner: postgres
--

COPY aikovrr.visibility_usage_indicator (id, ai_asset_id, first_seen, last_seen, active_users_count, trend_status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: news_newsarticle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news_newsarticle (id, title, summary, url, source, source_url, framework, article_type, published_at, fetched_at, is_active) FROM stdin;
1	EU AI Act Implementation Guidelines Released	The European Data Protection Board has published comprehensive implementation guidelines for the EU AI Act.	https://iapp.org/news/a/eu-ai-act-implementation/	IAPP	https://iapp.org	EU AI Act	regulation	2025-11-27 18:40:53.295504+02	2025-11-27 20:40:53.322441+02	t
2	NIST Releases AI Risk Management Framework 2.0	NIST has published version 2.0 of the AI Risk Management Framework with enhanced guidance on generative AI.	https://www.nist.gov/itl/ai-risk-management-framework	NIST	https://www.nist.gov	NIST AI RMF	framework	2025-11-27 20:10:53.295823+02	2025-11-27 20:40:53.324033+02	t
3	ISO 42001 Adoption Accelerates Among Fortune 500	67% of Fortune 500 companies are pursuing ISO 42001 certification for AI management systems.	https://www.iso.org/standard/81230.html	ISO	https://www.iso.org	ISO 42001	standard	2025-11-27 16:40:53.295832+02	2025-11-27 20:40:53.324495+02	t
\.


--
-- Name: asset_compliance_link_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.asset_compliance_link_id_seq', 1, false);


--
-- Name: asset_control_link_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.asset_control_link_id_seq', 176, true);


--
-- Name: asset_evidence_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.asset_evidence_id_seq', 9, true);


--
-- Name: asset_integration_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.asset_integration_id_seq', 8, true);


--
-- Name: asset_note_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.asset_note_id_seq', 9, true);


--
-- Name: asset_risk_link_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.asset_risk_link_id_seq', 67, true);


--
-- Name: auth_app_user_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.auth_app_user_id_seq', 5, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.auth_permission_id_seq', 112, true);


--
-- Name: core_department_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.core_department_id_seq', 5, true);


--
-- Name: core_tenant_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.core_tenant_id_seq', 1, true);


--
-- Name: core_user_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.core_user_id_seq', 20, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.django_content_type_id_seq', 28, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.django_migrations_id_seq', 23, true);


--
-- Name: governance_custom_field_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.governance_custom_field_id_seq', 1, false);


--
-- Name: governance_self_assessment_task_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.governance_self_assessment_task_id_seq', 1, false);


--
-- Name: news_newsarticle_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.news_newsarticle_id_seq', 186, true);


--
-- Name: risk_category_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_category_id_seq', 1, false);


--
-- Name: risk_control_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_control_id_seq', 10, true);


--
-- Name: risk_framework_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_framework_id_seq', 3, true);


--
-- Name: risk_note_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_note_id_seq', 1, false);


--
-- Name: risk_scenario_categories_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_scenario_categories_id_seq', 1, false);


--
-- Name: risk_scenario_control_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_scenario_control_id_seq', 1, false);


--
-- Name: risk_scenario_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.risk_scenario_id_seq', 5, true);


--
-- Name: visibility_ai_asset_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.visibility_ai_asset_id_seq', 50, true);


--
-- Name: visibility_asset_relationship_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.visibility_asset_relationship_id_seq', 1, false);


--
-- Name: visibility_discovery_source_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.visibility_discovery_source_id_seq', 1, false);


--
-- Name: visibility_risk_profile_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.visibility_risk_profile_id_seq', 1, false);


--
-- Name: visibility_usage_indicator_id_seq; Type: SEQUENCE SET; Schema: aikovrr; Owner: postgres
--

SELECT pg_catalog.setval('aikovrr.visibility_usage_indicator_id_seq', 1, false);


--
-- Name: news_newsarticle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_newsarticle_id_seq', 6, true);


--
-- Name: asset_compliance_link asset_compliance_link_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_compliance_link
    ADD CONSTRAINT asset_compliance_link_pkey PRIMARY KEY (id);


--
-- Name: asset_control_link asset_control_link_asset_id_control_id_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_control_link
    ADD CONSTRAINT asset_control_link_asset_id_control_id_key UNIQUE (asset_id, control_id);


--
-- Name: asset_control_link asset_control_link_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_control_link
    ADD CONSTRAINT asset_control_link_pkey PRIMARY KEY (id);


--
-- Name: asset_evidence asset_evidence_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_evidence
    ADD CONSTRAINT asset_evidence_pkey PRIMARY KEY (id);


--
-- Name: asset_integration asset_integration_asset_id_integration_type_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_integration
    ADD CONSTRAINT asset_integration_asset_id_integration_type_key UNIQUE (asset_id, integration_type);


--
-- Name: asset_integration asset_integration_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_integration
    ADD CONSTRAINT asset_integration_pkey PRIMARY KEY (id);


--
-- Name: asset_note asset_note_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_note
    ADD CONSTRAINT asset_note_pkey PRIMARY KEY (id);


--
-- Name: asset_risk_link asset_risk_link_asset_id_risk_id_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_risk_link
    ADD CONSTRAINT asset_risk_link_asset_id_risk_id_key UNIQUE (asset_id, risk_id);


--
-- Name: asset_risk_link asset_risk_link_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_risk_link
    ADD CONSTRAINT asset_risk_link_pkey PRIMARY KEY (id);


--
-- Name: auth_app_user auth_app_user_email_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_app_user
    ADD CONSTRAINT auth_app_user_email_key UNIQUE (email);


--
-- Name: auth_app_user auth_app_user_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_app_user
    ADD CONSTRAINT auth_app_user_pkey PRIMARY KEY (id);


--
-- Name: auth_app_user auth_app_user_username_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_app_user
    ADD CONSTRAINT auth_app_user_username_key UNIQUE (username);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: core_department core_department_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_department
    ADD CONSTRAINT core_department_pkey PRIMARY KEY (id);


--
-- Name: core_tenant core_tenant_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_tenant
    ADD CONSTRAINT core_tenant_pkey PRIMARY KEY (id);


--
-- Name: core_user core_user_email_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_user
    ADD CONSTRAINT core_user_email_key UNIQUE (email);


--
-- Name: core_user core_user_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_user
    ADD CONSTRAINT core_user_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: governance_custom_field governance_custom_field_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_custom_field
    ADD CONSTRAINT governance_custom_field_pkey PRIMARY KEY (id);


--
-- Name: governance_self_assessment_task governance_self_assessment_task_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_self_assessment_task
    ADD CONSTRAINT governance_self_assessment_task_pkey PRIMARY KEY (id);


--
-- Name: news_newsarticle news_newsarticle_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.news_newsarticle
    ADD CONSTRAINT news_newsarticle_pkey PRIMARY KEY (id);


--
-- Name: news_newsarticle news_newsarticle_url_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.news_newsarticle
    ADD CONSTRAINT news_newsarticle_url_key UNIQUE (url);


--
-- Name: risk_category risk_category_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_category
    ADD CONSTRAINT risk_category_pkey PRIMARY KEY (id);


--
-- Name: risk_control risk_control_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_control
    ADD CONSTRAINT risk_control_pkey PRIMARY KEY (id);


--
-- Name: risk_framework risk_framework_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_framework
    ADD CONSTRAINT risk_framework_pkey PRIMARY KEY (id);


--
-- Name: risk_note risk_note_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_note
    ADD CONSTRAINT risk_note_pkey PRIMARY KEY (id);


--
-- Name: risk_scenario_categories risk_scenario_categories_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_categories
    ADD CONSTRAINT risk_scenario_categories_pkey PRIMARY KEY (id);


--
-- Name: risk_scenario_categories risk_scenario_categories_scenario_id_category_id_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_categories
    ADD CONSTRAINT risk_scenario_categories_scenario_id_category_id_key UNIQUE (scenario_id, category_id);


--
-- Name: risk_scenario_control risk_scenario_control_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_control
    ADD CONSTRAINT risk_scenario_control_pkey PRIMARY KEY (id);


--
-- Name: risk_scenario_control risk_scenario_control_scenario_id_control_id_key; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_control
    ADD CONSTRAINT risk_scenario_control_scenario_id_control_id_key UNIQUE (scenario_id, control_id);


--
-- Name: risk_scenario risk_scenario_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario
    ADD CONSTRAINT risk_scenario_pkey PRIMARY KEY (id);


--
-- Name: visibility_ai_asset visibility_ai_asset_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_ai_asset
    ADD CONSTRAINT visibility_ai_asset_pkey PRIMARY KEY (id);


--
-- Name: visibility_asset_relationship visibility_asset_relationship_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_asset_relationship
    ADD CONSTRAINT visibility_asset_relationship_pkey PRIMARY KEY (id);


--
-- Name: visibility_discovery_source visibility_discovery_source_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_discovery_source
    ADD CONSTRAINT visibility_discovery_source_pkey PRIMARY KEY (id);


--
-- Name: visibility_risk_profile visibility_risk_profile_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_risk_profile
    ADD CONSTRAINT visibility_risk_profile_pkey PRIMARY KEY (id);


--
-- Name: visibility_usage_indicator visibility_usage_indicator_pkey; Type: CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_usage_indicator
    ADD CONSTRAINT visibility_usage_indicator_pkey PRIMARY KEY (id);


--
-- Name: news_newsarticle news_newsarticle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_newsarticle
    ADD CONSTRAINT news_newsarticle_pkey PRIMARY KEY (id);


--
-- Name: news_newsarticle news_newsarticle_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_newsarticle
    ADD CONSTRAINT news_newsarticle_url_key UNIQUE (url);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON aikovrr.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON aikovrr.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON aikovrr.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON aikovrr.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON aikovrr.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON aikovrr.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON aikovrr.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON aikovrr.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: idx_ai_asset_lifecycle; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_lifecycle ON aikovrr.visibility_ai_asset USING btree (lifecycle_stage);


--
-- Name: idx_ai_asset_owner; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_owner ON aikovrr.visibility_ai_asset USING btree (owner_id);


--
-- Name: idx_ai_asset_risk_tier; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_risk_tier ON aikovrr.visibility_ai_asset USING btree (risk_tier);


--
-- Name: idx_ai_asset_status; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_status ON aikovrr.visibility_ai_asset USING btree (status);


--
-- Name: idx_ai_asset_tech_owner; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_tech_owner ON aikovrr.visibility_ai_asset USING btree (technical_owner_id);


--
-- Name: idx_ai_asset_tenant; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_tenant ON aikovrr.visibility_ai_asset USING btree (tenant_id);


--
-- Name: idx_ai_asset_type; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_type ON aikovrr.visibility_ai_asset USING btree (asset_type);


--
-- Name: idx_ai_asset_vendor_source; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_ai_asset_vendor_source ON aikovrr.visibility_ai_asset USING btree (vendor_source);


--
-- Name: idx_app_user_email; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_app_user_email ON aikovrr.auth_app_user USING btree (email);


--
-- Name: idx_app_user_username; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_app_user_username ON aikovrr.auth_app_user USING btree (username);


--
-- Name: idx_asset_compliance_link_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_compliance_link_asset ON aikovrr.asset_compliance_link USING btree (asset_id);


--
-- Name: idx_asset_control_link_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_control_link_asset ON aikovrr.asset_control_link USING btree (asset_id);


--
-- Name: idx_asset_control_link_control; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_control_link_control ON aikovrr.asset_control_link USING btree (control_id);


--
-- Name: idx_asset_evidence_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_evidence_asset ON aikovrr.asset_evidence USING btree (asset_id);


--
-- Name: idx_asset_integration_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_integration_asset ON aikovrr.asset_integration USING btree (asset_id);


--
-- Name: idx_asset_note_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_note_asset ON aikovrr.asset_note USING btree (asset_id);


--
-- Name: idx_asset_relationship_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_relationship_asset ON aikovrr.visibility_asset_relationship USING btree (ai_asset_id);


--
-- Name: idx_asset_relationship_user; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_relationship_user ON aikovrr.visibility_asset_relationship USING btree (user_id);


--
-- Name: idx_asset_risk_link_asset; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_risk_link_asset ON aikovrr.asset_risk_link USING btree (asset_id);


--
-- Name: idx_asset_risk_link_risk; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_asset_risk_link_risk ON aikovrr.asset_risk_link USING btree (risk_id);


--
-- Name: idx_department_tenant; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_department_tenant ON aikovrr.core_department USING btree (tenant_id);


--
-- Name: idx_risk_scenario_owner; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_risk_scenario_owner ON aikovrr.risk_scenario USING btree (owner_id);


--
-- Name: idx_risk_scenario_priority; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_risk_scenario_priority ON aikovrr.risk_scenario USING btree (priority);


--
-- Name: idx_risk_scenario_status; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_risk_scenario_status ON aikovrr.risk_scenario USING btree (status);


--
-- Name: idx_risk_scenario_tenant; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_risk_scenario_tenant ON aikovrr.risk_scenario USING btree (tenant_id);


--
-- Name: idx_sa_task_assigned; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_sa_task_assigned ON aikovrr.governance_self_assessment_task USING btree (assigned_to_id);


--
-- Name: idx_sa_task_status; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_sa_task_status ON aikovrr.governance_self_assessment_task USING btree (status);


--
-- Name: idx_sa_task_tenant; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_sa_task_tenant ON aikovrr.governance_self_assessment_task USING btree (tenant_id);


--
-- Name: idx_user_department; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_user_department ON aikovrr.core_user USING btree (department_id);


--
-- Name: idx_user_email; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_user_email ON aikovrr.core_user USING btree (email);


--
-- Name: idx_user_tenant; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX idx_user_tenant ON aikovrr.core_user USING btree (tenant_id);


--
-- Name: news_newsar_is_acti_idx; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX news_newsar_is_acti_idx ON aikovrr.news_newsarticle USING btree (is_active);


--
-- Name: news_newsar_publish_idx; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX news_newsar_publish_idx ON aikovrr.news_newsarticle USING btree (published_at DESC);


--
-- Name: news_newsarticle_url_3ea1af97_like; Type: INDEX; Schema: aikovrr; Owner: postgres
--

CREATE INDEX news_newsarticle_url_3ea1af97_like ON aikovrr.news_newsarticle USING btree (url varchar_pattern_ops);


--
-- Name: news_newsarticle_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX news_newsarticle_is_active_idx ON public.news_newsarticle USING btree (is_active);


--
-- Name: news_newsarticle_published_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX news_newsarticle_published_at_idx ON public.news_newsarticle USING btree (published_at DESC);


--
-- Name: asset_compliance_link asset_compliance_link_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_compliance_link
    ADD CONSTRAINT asset_compliance_link_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: asset_compliance_link asset_compliance_link_framework_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_compliance_link
    ADD CONSTRAINT asset_compliance_link_framework_id_fkey FOREIGN KEY (framework_id) REFERENCES aikovrr.risk_framework(id) ON DELETE SET NULL;


--
-- Name: asset_control_link asset_control_link_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_control_link
    ADD CONSTRAINT asset_control_link_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: asset_control_link asset_control_link_control_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_control_link
    ADD CONSTRAINT asset_control_link_control_id_fkey FOREIGN KEY (control_id) REFERENCES aikovrr.risk_control(id) ON DELETE CASCADE;


--
-- Name: asset_evidence asset_evidence_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_evidence
    ADD CONSTRAINT asset_evidence_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: asset_evidence asset_evidence_uploaded_by_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_evidence
    ADD CONSTRAINT asset_evidence_uploaded_by_id_fkey FOREIGN KEY (uploaded_by_id) REFERENCES aikovrr.core_user(id) ON DELETE SET NULL;


--
-- Name: asset_integration asset_integration_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_integration
    ADD CONSTRAINT asset_integration_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: asset_note asset_note_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_note
    ADD CONSTRAINT asset_note_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: asset_note asset_note_created_by_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_note
    ADD CONSTRAINT asset_note_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES aikovrr.core_user(id) ON DELETE SET NULL;


--
-- Name: asset_risk_link asset_risk_link_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_risk_link
    ADD CONSTRAINT asset_risk_link_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: asset_risk_link asset_risk_link_risk_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.asset_risk_link
    ADD CONSTRAINT asset_risk_link_risk_id_fkey FOREIGN KEY (risk_id) REFERENCES aikovrr.risk_scenario(id) ON DELETE CASCADE;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES aikovrr.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES aikovrr.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES aikovrr.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_department core_department_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_department
    ADD CONSTRAINT core_department_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: core_user core_user_department_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_user
    ADD CONSTRAINT core_user_department_id_fkey FOREIGN KEY (department_id) REFERENCES aikovrr.core_department(id) ON DELETE SET NULL;


--
-- Name: core_user core_user_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.core_user
    ADD CONSTRAINT core_user_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES aikovrr.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_app_user_id; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_app_user_id FOREIGN KEY (user_id) REFERENCES aikovrr.auth_app_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: governance_custom_field governance_custom_field_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_custom_field
    ADD CONSTRAINT governance_custom_field_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: governance_self_assessment_task governance_self_assessment_task_assigned_to_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_self_assessment_task
    ADD CONSTRAINT governance_self_assessment_task_assigned_to_id_fkey FOREIGN KEY (assigned_to_id) REFERENCES aikovrr.core_user(id) ON DELETE SET NULL;


--
-- Name: governance_self_assessment_task governance_self_assessment_task_control_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_self_assessment_task
    ADD CONSTRAINT governance_self_assessment_task_control_id_fkey FOREIGN KEY (control_id) REFERENCES aikovrr.risk_control(id) ON DELETE SET NULL;


--
-- Name: governance_self_assessment_task governance_self_assessment_task_framework_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_self_assessment_task
    ADD CONSTRAINT governance_self_assessment_task_framework_id_fkey FOREIGN KEY (framework_id) REFERENCES aikovrr.risk_framework(id) ON DELETE SET NULL;


--
-- Name: governance_self_assessment_task governance_self_assessment_task_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.governance_self_assessment_task
    ADD CONSTRAINT governance_self_assessment_task_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: risk_category risk_category_parent_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_category
    ADD CONSTRAINT risk_category_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES aikovrr.risk_category(id) ON DELETE SET NULL;


--
-- Name: risk_control risk_control_framework_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_control
    ADD CONSTRAINT risk_control_framework_id_fkey FOREIGN KEY (framework_id) REFERENCES aikovrr.risk_framework(id) ON DELETE CASCADE;


--
-- Name: risk_note risk_note_author_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_note
    ADD CONSTRAINT risk_note_author_id_fkey FOREIGN KEY (author_id) REFERENCES aikovrr.core_user(id) ON DELETE CASCADE;


--
-- Name: risk_note risk_note_scenario_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_note
    ADD CONSTRAINT risk_note_scenario_id_fkey FOREIGN KEY (scenario_id) REFERENCES aikovrr.risk_scenario(id) ON DELETE CASCADE;


--
-- Name: risk_scenario_categories risk_scenario_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_categories
    ADD CONSTRAINT risk_scenario_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES aikovrr.risk_category(id) ON DELETE CASCADE;


--
-- Name: risk_scenario_categories risk_scenario_categories_scenario_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_categories
    ADD CONSTRAINT risk_scenario_categories_scenario_id_fkey FOREIGN KEY (scenario_id) REFERENCES aikovrr.risk_scenario(id) ON DELETE CASCADE;


--
-- Name: risk_scenario_control risk_scenario_control_control_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_control
    ADD CONSTRAINT risk_scenario_control_control_id_fkey FOREIGN KEY (control_id) REFERENCES aikovrr.risk_control(id) ON DELETE CASCADE;


--
-- Name: risk_scenario_control risk_scenario_control_scenario_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario_control
    ADD CONSTRAINT risk_scenario_control_scenario_id_fkey FOREIGN KEY (scenario_id) REFERENCES aikovrr.risk_scenario(id) ON DELETE CASCADE;


--
-- Name: risk_scenario risk_scenario_owner_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario
    ADD CONSTRAINT risk_scenario_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES aikovrr.core_user(id) ON DELETE SET NULL;


--
-- Name: risk_scenario risk_scenario_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.risk_scenario
    ADD CONSTRAINT risk_scenario_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: visibility_ai_asset visibility_ai_asset_owner_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_ai_asset
    ADD CONSTRAINT visibility_ai_asset_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES aikovrr.core_user(id) ON DELETE SET NULL;


--
-- Name: visibility_ai_asset visibility_ai_asset_risk_profile_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_ai_asset
    ADD CONSTRAINT visibility_ai_asset_risk_profile_id_fkey FOREIGN KEY (risk_profile_id) REFERENCES aikovrr.visibility_risk_profile(id) ON DELETE SET NULL;


--
-- Name: visibility_ai_asset visibility_ai_asset_technical_owner_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_ai_asset
    ADD CONSTRAINT visibility_ai_asset_technical_owner_id_fkey FOREIGN KEY (technical_owner_id) REFERENCES aikovrr.core_user(id) ON DELETE SET NULL;


--
-- Name: visibility_ai_asset visibility_ai_asset_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_ai_asset
    ADD CONSTRAINT visibility_ai_asset_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: visibility_asset_relationship visibility_asset_relationship_ai_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_asset_relationship
    ADD CONSTRAINT visibility_asset_relationship_ai_asset_id_fkey FOREIGN KEY (ai_asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: visibility_asset_relationship visibility_asset_relationship_discovery_source_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_asset_relationship
    ADD CONSTRAINT visibility_asset_relationship_discovery_source_id_fkey FOREIGN KEY (discovery_source_id) REFERENCES aikovrr.visibility_discovery_source(id) ON DELETE SET NULL;


--
-- Name: visibility_asset_relationship visibility_asset_relationship_user_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_asset_relationship
    ADD CONSTRAINT visibility_asset_relationship_user_id_fkey FOREIGN KEY (user_id) REFERENCES aikovrr.core_user(id) ON DELETE CASCADE;


--
-- Name: visibility_discovery_source visibility_discovery_source_tenant_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_discovery_source
    ADD CONSTRAINT visibility_discovery_source_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES aikovrr.core_tenant(id) ON DELETE CASCADE;


--
-- Name: visibility_usage_indicator visibility_usage_indicator_ai_asset_id_fkey; Type: FK CONSTRAINT; Schema: aikovrr; Owner: postgres
--

ALTER TABLE ONLY aikovrr.visibility_usage_indicator
    ADD CONSTRAINT visibility_usage_indicator_ai_asset_id_fkey FOREIGN KEY (ai_asset_id) REFERENCES aikovrr.visibility_ai_asset(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: aikovrr; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA aikovrr GRANT ALL ON SEQUENCES  TO postgres;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: aikovrr; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA aikovrr GRANT ALL ON TABLES  TO postgres;


--
-- PostgreSQL database dump complete
--

\unrestrict SvJPd7NxvGYxRNmkFMMvLeXKz4wa3fkXeynDpvnO8rHF89eIgN1W7Iru2aJ1edH

