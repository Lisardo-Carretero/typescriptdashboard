--
-- PostgreSQL database dump
--

\restrict 72ooXYabyJvMoIT1Ij7zB5xIp96rIw5cQt4JZ0xFCfiDcC3e1CTdxWcBQv2OOmJ

-- Dumped from database version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)

-- Started on 2026-11-01 19:16:02 CET

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
-- TOC entry 11 (class 2615 OID 16397)
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- TOC entry 12 (class 2615 OID 16398)
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- TOC entry 8 (class 2615 OID 16399)
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- TOC entry 9 (class 2615 OID 16400)
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- TOC entry 10 (class 2615 OID 16401)
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- TOC entry 14 (class 2615 OID 16402)
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- TOC entry 15 (class 2615 OID 16403)
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- TOC entry 16 (class 2615 OID 16404)
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- TOC entry 2 (class 3079 OID 16405)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- TOC entry 4004 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 3 (class 3079 OID 16436)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- TOC entry 4005 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 4 (class 3079 OID 16473)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- TOC entry 4006 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 998 (class 1247 OID 16485)
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: lisardo
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO lisardo;

--
-- TOC entry 1001 (class 1247 OID 16492)
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: lisardo
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO lisardo;

--
-- TOC entry 1004 (class 1247 OID 16498)
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: lisardo
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO lisardo;

--
-- TOC entry 1007 (class 1247 OID 16504)
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: lisardo
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO lisardo;

--
-- TOC entry 1010 (class 1247 OID 16512)
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: lisardo
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO lisardo;

--
-- TOC entry 1013 (class 1247 OID 16518)
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: lisardo
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO lisardo;

--
-- TOC entry 1016 (class 1247 OID 16532)
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- TOC entry 1019 (class 1247 OID 16544)
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- TOC entry 1022 (class 1247 OID 16561)
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- TOC entry 1025 (class 1247 OID 16564)
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- TOC entry 1028 (class 1247 OID 16567)
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- TOC entry 1031 (class 1247 OID 16569)
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: lisardo
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO lisardo;

--
-- TOC entry 272 (class 1255 OID 16573)
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: lisardo
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO lisardo;

--
-- TOC entry 4007 (class 0 OID 0)
-- Dependencies: 272
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- TOC entry 322 (class 1255 OID 16574)
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: lisardo
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO lisardo;

--
-- TOC entry 361 (class 1255 OID 16575)
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: lisardo
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO lisardo;

--
-- TOC entry 4010 (class 0 OID 0)
-- Dependencies: 361
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- TOC entry 304 (class 1255 OID 16576)
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: lisardo
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO lisardo;

--
-- TOC entry 4012 (class 0 OID 0)
-- Dependencies: 304
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- TOC entry 373 (class 1255 OID 16577)
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 373
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- TOC entry 287 (class 1255 OID 16578)
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- TOC entry 4030 (class 0 OID 0)
-- Dependencies: 287
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- TOC entry 314 (class 1255 OID 16579)
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- TOC entry 4032 (class 0 OID 0)
-- Dependencies: 314
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- TOC entry 321 (class 1255 OID 16580)
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- TOC entry 289 (class 1255 OID 16581)
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- TOC entry 318 (class 1255 OID 16582)
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- TOC entry 4060 (class 0 OID 0)
-- Dependencies: 318
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- TOC entry 328 (class 1255 OID 16583)
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- TOC entry 305 (class 1255 OID 16584)
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 317 (class 1255 OID 16587)
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- TOC entry 334 (class 1255 OID 16588)
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- TOC entry 341 (class 1255 OID 16589)
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- TOC entry 296 (class 1255 OID 16590)
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- TOC entry 297 (class 1255 OID 16591)
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- TOC entry 310 (class 1255 OID 16592)
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 326 (class 1255 OID 16593)
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- TOC entry 276 (class 1255 OID 16594)
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- TOC entry 274 (class 1255 OID 16595)
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- TOC entry 353 (class 1255 OID 16596)
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- TOC entry 344 (class 1255 OID 16597)
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: lisardo
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO lisardo;

--
-- TOC entry 355 (class 1255 OID 16598)
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO lisardo;

--
-- TOC entry 299 (class 1255 OID 16599)
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO lisardo;

--
-- TOC entry 370 (class 1255 OID 16600)
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO lisardo;

--
-- TOC entry 298 (class 1255 OID 16601)
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO lisardo;

--
-- TOC entry 309 (class 1255 OID 16602)
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO lisardo;

--
-- TOC entry 375 (class 1255 OID 16603)
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO lisardo;

--
-- TOC entry 335 (class 1255 OID 16604)
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO lisardo;

--
-- TOC entry 339 (class 1255 OID 16605)
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO lisardo;

--
-- TOC entry 316 (class 1255 OID 16606)
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO lisardo;

--
-- TOC entry 271 (class 1255 OID 16607)
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO lisardo;

--
-- TOC entry 332 (class 1255 OID 16608)
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO lisardo;

--
-- TOC entry 268 (class 1255 OID 16609)
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO lisardo;

--
-- TOC entry 352 (class 1255 OID 16610)
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO lisardo;

--
-- TOC entry 292 (class 1255 OID 16611)
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO lisardo;

--
-- TOC entry 348 (class 1255 OID 16612)
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO lisardo;

--
-- TOC entry 359 (class 1255 OID 16613)
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO lisardo;

--
-- TOC entry 275 (class 1255 OID 16614)
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO lisardo;

--
-- TOC entry 312 (class 1255 OID 16615)
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO lisardo;

--
-- TOC entry 372 (class 1255 OID 16616)
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO lisardo;

--
-- TOC entry 343 (class 1255 OID 16617)
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO lisardo;

--
-- TOC entry 330 (class 1255 OID 16618)
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO lisardo;

--
-- TOC entry 374 (class 1255 OID 16619)
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO lisardo;

--
-- TOC entry 280 (class 1255 OID 16620)
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO lisardo;

--
-- TOC entry 302 (class 1255 OID 16621)
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO lisardo;

--
-- TOC entry 307 (class 1255 OID 16622)
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO lisardo;

--
-- TOC entry 329 (class 1255 OID 16623)
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO lisardo;

--
-- TOC entry 278 (class 1255 OID 16624)
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO lisardo;

--
-- TOC entry 338 (class 1255 OID 16625)
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO lisardo;

--
-- TOC entry 267 (class 1255 OID 16626)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: lisardo
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO lisardo;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 231 (class 1259 OID 16627)
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO lisardo;

--
-- TOC entry 4085 (class 0 OID 0)
-- Dependencies: 231
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- TOC entry 232 (class 1259 OID 16633)
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO lisardo;

--
-- TOC entry 4087 (class 0 OID 0)
-- Dependencies: 232
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- TOC entry 233 (class 1259 OID 16638)
-- Name: identities; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO lisardo;

--
-- TOC entry 4089 (class 0 OID 0)
-- Dependencies: 233
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- TOC entry 4090 (class 0 OID 0)
-- Dependencies: 233
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- TOC entry 234 (class 1259 OID 16645)
-- Name: instances; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO lisardo;

--
-- TOC entry 4092 (class 0 OID 0)
-- Dependencies: 234
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- TOC entry 235 (class 1259 OID 16650)
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO lisardo;

--
-- TOC entry 4094 (class 0 OID 0)
-- Dependencies: 235
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- TOC entry 236 (class 1259 OID 16655)
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO lisardo;

--
-- TOC entry 4096 (class 0 OID 0)
-- Dependencies: 236
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- TOC entry 237 (class 1259 OID 16660)
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO lisardo;

--
-- TOC entry 4098 (class 0 OID 0)
-- Dependencies: 237
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- TOC entry 238 (class 1259 OID 16665)
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_id text NOT NULL,
    client_secret_hash text NOT NULL,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO lisardo;

--
-- TOC entry 239 (class 1259 OID 16675)
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO lisardo;

--
-- TOC entry 240 (class 1259 OID 16683)
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO lisardo;

--
-- TOC entry 4102 (class 0 OID 0)
-- Dependencies: 240
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- TOC entry 241 (class 1259 OID 16688)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: lisardo
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO lisardo;

--
-- TOC entry 4104 (class 0 OID 0)
-- Dependencies: 241
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: lisardo
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- TOC entry 242 (class 1259 OID 16689)
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO lisardo;

--
-- TOC entry 4106 (class 0 OID 0)
-- Dependencies: 242
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- TOC entry 243 (class 1259 OID 16697)
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO lisardo;

--
-- TOC entry 4108 (class 0 OID 0)
-- Dependencies: 243
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- TOC entry 244 (class 1259 OID 16703)
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO lisardo;

--
-- TOC entry 4110 (class 0 OID 0)
-- Dependencies: 244
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- TOC entry 245 (class 1259 OID 16706)
-- Name: sessions; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO lisardo;

--
-- TOC entry 4112 (class 0 OID 0)
-- Dependencies: 245
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- TOC entry 4113 (class 0 OID 0)
-- Dependencies: 245
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- TOC entry 246 (class 1259 OID 16711)
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO lisardo;

--
-- TOC entry 4115 (class 0 OID 0)
-- Dependencies: 246
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- TOC entry 247 (class 1259 OID 16717)
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO lisardo;

--
-- TOC entry 4117 (class 0 OID 0)
-- Dependencies: 247
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- TOC entry 4118 (class 0 OID 0)
-- Dependencies: 247
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- TOC entry 248 (class 1259 OID 16723)
-- Name: users; Type: TABLE; Schema: auth; Owner: lisardo
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO lisardo;

--
-- TOC entry 4120 (class 0 OID 0)
-- Dependencies: 248
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- TOC entry 4121 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- TOC entry 249 (class 1259 OID 16738)
-- Name: Cloth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cloth" (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    tags json[],
    brand text,
    colour text,
    notes text,
    owner text NOT NULL,
    size text,
    name text NOT NULL
);


ALTER TABLE public."Cloth" OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 16744)
-- Name: Cloth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Cloth" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Cloth_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 251 (class 1259 OID 16745)
-- Name: Wardrobe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Wardrobe" (
    id bigint NOT NULL,
    name text NOT NULL,
    location text
);


ALTER TABLE public."Wardrobe" OWNER TO postgres;

--
-- TOC entry 4127 (class 0 OID 0)
-- Dependencies: 251
-- Name: TABLE "Wardrobe"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Wardrobe" IS 'This table represents wardrobes registrated on my house';


--
-- TOC entry 252 (class 1259 OID 16750)
-- Name: WardrobeHasCloth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WardrobeHasCloth" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "wardrobeId" bigint,
    "clothId" bigint,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."WardrobeHasCloth" OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 16755)
-- Name: Wardrobe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Wardrobe" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Wardrobe_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 254 (class 1259 OID 16756)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id bigint NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 16761)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tag ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 256 (class 1259 OID 16762)
-- Name: messages; Type: TABLE; Schema: realtime; Owner: lisardo
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO lisardo;

--
-- TOC entry 257 (class 1259 OID 16769)
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- TOC entry 258 (class 1259 OID 16772)
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- TOC entry 259 (class 1259 OID 16780)
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 260 (class 1259 OID 16781)
-- Name: buckets; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO lisardo;

--
-- TOC entry 4137 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: lisardo
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 261 (class 1259 OID 16791)
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO lisardo;

--
-- TOC entry 262 (class 1259 OID 16800)
-- Name: migrations; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO lisardo;

--
-- TOC entry 263 (class 1259 OID 16804)
-- Name: objects; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO lisardo;

--
-- TOC entry 4140 (class 0 OID 0)
-- Dependencies: 263
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: lisardo
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 264 (class 1259 OID 16814)
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO lisardo;

--
-- TOC entry 265 (class 1259 OID 16822)
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO lisardo;

--
-- TOC entry 266 (class 1259 OID 16829)
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: lisardo
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO lisardo;

--
-- TOC entry 3564 (class 2604 OID 16837)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 3958 (class 0 OID 16627)
-- Dependencies: 231
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- TOC entry 3959 (class 0 OID 16633)
-- Dependencies: 232
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- TOC entry 3960 (class 0 OID 16638)
-- Dependencies: 233
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- TOC entry 3961 (class 0 OID 16645)
-- Dependencies: 234
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3962 (class 0 OID 16650)
-- Dependencies: 235
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- TOC entry 3963 (class 0 OID 16655)
-- Dependencies: 236
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- TOC entry 3964 (class 0 OID 16660)
-- Dependencies: 237
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- TOC entry 3965 (class 0 OID 16665)
-- Dependencies: 238
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.oauth_clients (id, client_id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 3966 (class 0 OID 16675)
-- Dependencies: 239
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3967 (class 0 OID 16683)
-- Dependencies: 240
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- TOC entry 3969 (class 0 OID 16689)
-- Dependencies: 242
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- TOC entry 3970 (class 0 OID 16697)
-- Dependencies: 243
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- TOC entry 3971 (class 0 OID 16703)
-- Dependencies: 244
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
\.


--
-- TOC entry 3972 (class 0 OID 16706)
-- Dependencies: 245
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- TOC entry 3973 (class 0 OID 16711)
-- Dependencies: 246
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3974 (class 0 OID 16717)
-- Dependencies: 247
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- TOC entry 3975 (class 0 OID 16723)
-- Dependencies: 248
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: lisardo
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- TOC entry 3976 (class 0 OID 16738)
-- Dependencies: 249
-- Data for Name: Cloth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cloth" (id, created_at, tags, brand, colour, notes, owner, size, name) FROM stdin;
11	2025-09-29 17:37:20.32638+02	{"\\"Abrigo\\"","\\"Largo\\"","\\"Pantalón\\""}	dasdasdasd	asdadas	aaaaa	Papá	adadasda	sadasdsadasdas
13	2025-09-29 19:09:02.726611+02	{"\\"Pantalón\\"","\\"Corto\\""}	\N	Beige, Azulx2, Rojo,	Son 3	Papá	Grande	Pantalones
14	2025-09-29 19:09:44.544052+02	{"\\"Largo\\"","\\"Pantalón\\""}	\N	Gris	1	Papá	Grande	Pantalón largo
15	2025-09-29 19:10:13.210563+02	{"\\"Corto\\"","\\"Pantalón\\""}	\N	Azul x2	Son 2	Papá	Pequeño	Pantalón
16	2025-09-29 19:12:09.285071+02	{"\\"Corto\\""}	\N	Azul, Coral	Son 2	Papá	Grande	Polo
17	2025-09-29 19:13:24.243339+02	{"\\"Corto\\""}	Pierre cardin	Rojo	\N	Papá	Grande	Polo
18	2025-09-29 19:14:50.373752+02	{"\\"Camisa\\"","\\"Corto\\""}	\N	Rosa, blanco	\N	Papá	Grande	Camisa cuadros
19	2025-09-29 19:15:22.640908+02	{"\\"Corto\\""}	\N	Azul	Cuello blanco	Papá	Grande	Polo
20	2025-09-29 19:17:16.970364+02	{"\\"Corto\\""}	\N	Azul, blanco	\N	Papá	Grande	Polo rayas
21	2025-09-29 19:18:02.194856+02	{"\\"Corto\\""}	\N	Azul, Rosa, Verde	\N	Papá	Grande	Polo rayas
22	2025-09-29 19:18:51.139943+02	{"\\"Corto\\""}	\N	Amarillo	\N	Papá	Grande	Polo
23	2025-09-29 19:19:17.752407+02	{"\\"Corto\\""}	\N	Verde, Blanco	\N	Papá	Grande	Polo
24	2025-09-29 19:19:56.865556+02	{"\\"Corto\\""}	\N	Verde	\N	Papá	Grande	Polo
25	2025-09-29 19:20:31.722328+02	{"\\"Corto\\""}	\N	Rojo granate	\N	Papá	Grande	Polo
26	2025-09-29 19:21:08.519942+02	{"\\"Corto\\"","\\"Tela fina\\""}	\N	Azul	\N	Papá	Grande	Polo
27	2025-09-29 19:33:59.620106+02	{"\\"Largo\\"","\\"Invierno\\""}	\N	Verde Azul Negro Marrón	Como mínimo 8	Papá	Grande	Pantalones
28	2025-09-29 19:36:33.619003+02	{"\\"Tela fina\\"","\\"Corto\\"","\\"Verano\\""}	Adidas	Gris	\N	Papá	\N	Polo
29	2025-09-29 19:37:05.743665+02	{"\\"Largo\\""}	\N	Grafito	\N	Papá	Grande	Polo
30	2025-09-29 19:37:42.097576+02	{"\\"Largo\\"","\\"Invierno\\""}	Kiabi	Rosa palo	\N	Papá	Grande	Jersey
\.


--
-- TOC entry 3978 (class 0 OID 16745)
-- Dependencies: 251
-- Data for Name: Wardrobe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Wardrobe" (id, name, location) FROM stdin;
2	Habitación tito Jordi, 1	Armario arriba
3	Habitación tito Jordi, 2	El armario de siempre
4	Habitación tito Jordi, 3	El armario de siempre, este es uno de los que eran para arbrigos que se rompió
\.


--
-- TOC entry 3979 (class 0 OID 16750)
-- Dependencies: 252
-- Data for Name: WardrobeHasCloth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WardrobeHasCloth" (id, "wardrobeId", "clothId", created_at) FROM stdin;
20f15a06-df81-4cba-a88e-d09dc554f5e3	2	13	2025-09-29 19:09:02.856888+02
8cbfe664-4559-44ca-88f6-c81086638ed6	2	14	2025-09-29 19:09:44.693983+02
c9406717-15b2-4ab7-81d8-0d68814fbc21	2	15	2025-09-29 19:10:13.344724+02
b87c7897-9af2-41b5-8e5f-9fb870e7bcae	2	16	2025-09-29 19:12:09.426218+02
0f70737b-b8fb-4c17-8bbc-48167c51d0f7	2	18	2025-09-29 19:14:50.507396+02
88af01a6-32f6-4abf-bab1-44d4bc1e977b	2	19	2025-09-29 19:15:22.769262+02
a537e1db-7f55-41fc-ad53-a556fbef8e1b	2	20	2025-09-29 19:17:17.289689+02
25879c0d-375e-4e3a-ab05-09776bb85e61	2	21	2025-09-29 19:18:02.327385+02
e59bf9ad-9ea9-4522-a2c0-28ab56b8d225	2	17	2025-09-29 19:13:24.38831+02
123e362c-8d51-493b-9f48-a393890a13b5	4	25	2025-09-29 19:20:31.872409+02
d4ed6d68-a015-4fe6-a75c-447df810fd1b	4	24	2025-09-29 19:19:56.989906+02
31f01038-6f84-4008-8753-d95eb0a991fe	4	23	2025-09-29 19:19:17.876976+02
625430bd-d686-4e22-b79f-940c45bb63d2	4	22	2025-09-29 19:18:51.277729+02
37dd2f9c-0125-4532-96da-144aecaa8b74	3	27	2025-09-29 19:33:59.868416+02
005644bd-d1dd-429e-ac01-6f12b0fb67d9	4	28	2025-09-29 19:36:33.756102+02
815e449e-ed9c-4a74-adda-66d5318ac0d6	4	29	2025-09-29 19:37:05.897811+02
10350364-6ca6-4f7e-a668-40a5da60e679	4	30	2025-09-29 19:37:42.227052+02
\.


--
-- TOC entry 3981 (class 0 OID 16756)
-- Dependencies: 254
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name) FROM stdin;
1	Invierno
2	Verano
3	Abrigo
4	Pantalón
5	Camisa
6	Camiseta
7	Tela fina
8	Corto
9	Largo
\.


--
-- TOC entry 3983 (class 0 OID 16769)
-- Dependencies: 257
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-09-29 10:22:34
20211116045059	2025-09-29 10:22:36
20211116050929	2025-09-29 10:22:38
20211116051442	2025-09-29 10:22:40
20211116212300	2025-09-29 10:22:42
20211116213355	2025-09-29 10:22:44
20211116213934	2025-09-29 10:22:46
20211116214523	2025-09-29 10:22:48
20211122062447	2025-09-29 10:22:50
20211124070109	2025-09-29 10:22:52
20211202204204	2025-09-29 10:22:54
20211202204605	2025-09-29 10:22:55
20211210212804	2025-09-29 10:23:01
20211228014915	2025-09-29 10:23:03
20220107221237	2025-09-29 10:23:05
20220228202821	2025-09-29 10:23:06
20220312004840	2025-09-29 10:23:08
20220603231003	2025-09-29 10:23:11
20220603232444	2025-09-29 10:23:13
20220615214548	2025-09-29 10:23:15
20220712093339	2025-09-29 10:23:17
20220908172859	2025-09-29 10:23:19
20220916233421	2025-09-29 10:23:20
20230119133233	2025-09-29 10:23:22
20230128025114	2025-09-29 10:23:25
20230128025212	2025-09-29 10:23:26
20230227211149	2025-09-29 10:23:28
20230228184745	2025-09-29 10:23:30
20230308225145	2025-09-29 10:23:32
20230328144023	2025-09-29 10:23:34
20231018144023	2025-09-29 10:23:36
20231204144023	2025-09-29 10:23:39
20231204144024	2025-09-29 10:23:40
20231204144025	2025-09-29 10:23:42
20240108234812	2025-09-29 10:23:44
20240109165339	2025-09-29 10:23:46
20240227174441	2025-09-29 10:23:49
20240311171622	2025-09-29 10:23:51
20240321100241	2025-09-29 10:23:55
20240401105812	2025-09-29 10:24:00
20240418121054	2025-09-29 10:24:03
20240523004032	2025-09-29 10:24:09
20240618124746	2025-09-29 10:24:11
20240801235015	2025-09-29 10:24:13
20240805133720	2025-09-29 10:24:14
20240827160934	2025-09-29 10:24:16
20240919163303	2025-09-29 10:24:19
20240919163305	2025-09-29 10:24:21
20241019105805	2025-09-29 10:24:22
20241030150047	2025-09-29 10:24:29
20241108114728	2025-09-29 10:24:32
20241121104152	2025-09-29 10:24:34
20241130184212	2025-09-29 10:24:36
20241220035512	2025-09-29 10:24:38
20241220123912	2025-09-29 10:24:39
20241224161212	2025-09-29 10:24:41
20250107150512	2025-09-29 10:24:43
20250110162412	2025-09-29 10:24:45
20250123174212	2025-09-29 10:24:47
20250128220012	2025-09-29 10:24:48
20250506224012	2025-09-29 10:24:50
20250523164012	2025-09-29 10:24:51
20250714121412	2025-09-29 10:24:53
20250905041441	2025-09-29 10:24:55
\.


--
-- TOC entry 3984 (class 0 OID 16772)
-- Dependencies: 258
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- TOC entry 3986 (class 0 OID 16781)
-- Dependencies: 260
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- TOC entry 3987 (class 0 OID 16791)
-- Dependencies: 261
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3988 (class 0 OID 16800)
-- Dependencies: 262
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-09-29 10:22:30.03604
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-09-29 10:22:30.062716
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-09-29 10:22:30.071706
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-09-29 10:22:30.127969
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-09-29 10:22:30.233129
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-09-29 10:22:30.239138
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-09-29 10:22:30.245673
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-09-29 10:22:30.251649
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-09-29 10:22:30.258881
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-09-29 10:22:30.264824
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-09-29 10:22:30.271332
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-09-29 10:22:30.278296
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-09-29 10:22:30.287876
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-09-29 10:22:30.295319
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-09-29 10:22:30.302031
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-09-29 10:22:30.352286
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-09-29 10:22:30.359109
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-09-29 10:22:30.365109
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-09-29 10:22:30.372693
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-09-29 10:22:30.381283
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-09-29 10:22:30.387382
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-09-29 10:22:30.398237
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-09-29 10:22:30.4193
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-09-29 10:22:30.43873
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-09-29 10:22:30.447295
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-09-29 10:22:30.454995
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-09-29 17:29:27.913913
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-09-29 17:29:28.017469
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-09-29 17:29:28.028008
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-09-29 17:29:28.040655
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-09-29 17:29:28.045369
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-09-29 17:29:28.054541
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-09-29 17:29:28.062961
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-09-29 17:29:28.0716
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-09-29 17:29:28.073638
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-09-29 17:29:28.082588
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-09-29 17:29:28.087769
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-09-29 17:29:28.107889
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-09-29 17:29:28.113955
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-09-29 17:29:28.130734
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-09-29 17:29:28.137552
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-09-29 17:29:28.149644
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-09-29 17:29:28.155099
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-09-29 17:29:28.161025
\.


--
-- TOC entry 3989 (class 0 OID 16804)
-- Dependencies: 263
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
\.


--
-- TOC entry 3990 (class 0 OID 16814)
-- Dependencies: 264
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3991 (class 0 OID 16822)
-- Dependencies: 265
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- TOC entry 3992 (class 0 OID 16829)
-- Dependencies: 266
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: lisardo
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- TOC entry 4145 (class 0 OID 0)
-- Dependencies: 241
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: lisardo
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- TOC entry 4146 (class 0 OID 0)
-- Dependencies: 250
-- Name: Cloth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cloth_id_seq"', 31, true);


--
-- TOC entry 4147 (class 0 OID 0)
-- Dependencies: 253
-- Name: Wardrobe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Wardrobe_id_seq"', 4, true);


--
-- TOC entry 4148 (class 0 OID 0)
-- Dependencies: 255
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_seq', 9, true);


--
-- TOC entry 4149 (class 0 OID 0)
-- Dependencies: 259
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- TOC entry 3635 (class 2606 OID 16839)
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- TOC entry 3619 (class 2606 OID 16841)
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- TOC entry 3623 (class 2606 OID 16843)
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- TOC entry 3628 (class 2606 OID 16845)
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- TOC entry 3630 (class 2606 OID 16847)
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- TOC entry 3633 (class 2606 OID 16849)
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- TOC entry 3637 (class 2606 OID 16851)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- TOC entry 3640 (class 2606 OID 16853)
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- TOC entry 3643 (class 2606 OID 16855)
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- TOC entry 3645 (class 2606 OID 16857)
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- TOC entry 3651 (class 2606 OID 16859)
-- Name: oauth_clients oauth_clients_client_id_key; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_client_id_key UNIQUE (client_id);


--
-- TOC entry 3654 (class 2606 OID 16861)
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- TOC entry 3656 (class 2606 OID 16863)
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3664 (class 2606 OID 16865)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3667 (class 2606 OID 16867)
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- TOC entry 3670 (class 2606 OID 16869)
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- TOC entry 3672 (class 2606 OID 16871)
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 3677 (class 2606 OID 16873)
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- TOC entry 3680 (class 2606 OID 16875)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 3683 (class 2606 OID 16877)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3688 (class 2606 OID 16879)
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- TOC entry 3691 (class 2606 OID 16881)
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 3704 (class 2606 OID 16883)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 3706 (class 2606 OID 16885)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3708 (class 2606 OID 16887)
-- Name: Cloth Cloth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cloth"
    ADD CONSTRAINT "Cloth_pkey" PRIMARY KEY (id);


--
-- TOC entry 3712 (class 2606 OID 16889)
-- Name: WardrobeHasCloth WardrobeHasCloth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WardrobeHasCloth"
    ADD CONSTRAINT "WardrobeHasCloth_pkey" PRIMARY KEY (id);


--
-- TOC entry 3710 (class 2606 OID 16891)
-- Name: Wardrobe Wardrobe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wardrobe"
    ADD CONSTRAINT "Wardrobe_pkey" PRIMARY KEY (id);


--
-- TOC entry 3714 (class 2606 OID 16893)
-- Name: tag tag_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_name_key UNIQUE (name);


--
-- TOC entry 3716 (class 2606 OID 16895)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- TOC entry 3719 (class 2606 OID 16897)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: lisardo
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 3724 (class 2606 OID 16899)
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- TOC entry 3721 (class 2606 OID 16901)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 3730 (class 2606 OID 16903)
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- TOC entry 3728 (class 2606 OID 16905)
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- TOC entry 3732 (class 2606 OID 16907)
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- TOC entry 3734 (class 2606 OID 16909)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3742 (class 2606 OID 16911)
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- TOC entry 3745 (class 2606 OID 16913)
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- TOC entry 3750 (class 2606 OID 16915)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- TOC entry 3748 (class 2606 OID 16917)
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- TOC entry 3620 (class 1259 OID 16918)
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- TOC entry 3694 (class 1259 OID 16919)
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3695 (class 1259 OID 16920)
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3696 (class 1259 OID 16921)
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3641 (class 1259 OID 16922)
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- TOC entry 3621 (class 1259 OID 16923)
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- TOC entry 3626 (class 1259 OID 16924)
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- TOC entry 4150 (class 0 OID 0)
-- Dependencies: 3626
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- TOC entry 3631 (class 1259 OID 16925)
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- TOC entry 3624 (class 1259 OID 16926)
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- TOC entry 3625 (class 1259 OID 16927)
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- TOC entry 3638 (class 1259 OID 16928)
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- TOC entry 3646 (class 1259 OID 16929)
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- TOC entry 3647 (class 1259 OID 16930)
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- TOC entry 3649 (class 1259 OID 16931)
-- Name: oauth_clients_client_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX oauth_clients_client_id_idx ON auth.oauth_clients USING btree (client_id);


--
-- TOC entry 3652 (class 1259 OID 16932)
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- TOC entry 3657 (class 1259 OID 16933)
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- TOC entry 3658 (class 1259 OID 16934)
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- TOC entry 3659 (class 1259 OID 16935)
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- TOC entry 3697 (class 1259 OID 16936)
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3698 (class 1259 OID 16937)
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3660 (class 1259 OID 16938)
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- TOC entry 3661 (class 1259 OID 16939)
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- TOC entry 3662 (class 1259 OID 16940)
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- TOC entry 3665 (class 1259 OID 16941)
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- TOC entry 3668 (class 1259 OID 16942)
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- TOC entry 3673 (class 1259 OID 16943)
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- TOC entry 3674 (class 1259 OID 16944)
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- TOC entry 3675 (class 1259 OID 16945)
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- TOC entry 3678 (class 1259 OID 16946)
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- TOC entry 3681 (class 1259 OID 16947)
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- TOC entry 3684 (class 1259 OID 16948)
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- TOC entry 3686 (class 1259 OID 16949)
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- TOC entry 3689 (class 1259 OID 16950)
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- TOC entry 3692 (class 1259 OID 16951)
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- TOC entry 3693 (class 1259 OID 16952)
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- TOC entry 3648 (class 1259 OID 16953)
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- TOC entry 3685 (class 1259 OID 16954)
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- TOC entry 3699 (class 1259 OID 16955)
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- TOC entry 4151 (class 0 OID 0)
-- Dependencies: 3699
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: lisardo
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- TOC entry 3700 (class 1259 OID 16956)
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- TOC entry 3701 (class 1259 OID 16957)
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- TOC entry 3702 (class 1259 OID 16958)
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: lisardo
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- TOC entry 3722 (class 1259 OID 16959)
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- TOC entry 3717 (class 1259 OID 16960)
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: lisardo
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 3725 (class 1259 OID 16961)
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- TOC entry 3726 (class 1259 OID 16962)
-- Name: bname; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- TOC entry 3735 (class 1259 OID 16963)
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- TOC entry 3746 (class 1259 OID 16964)
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- TOC entry 3736 (class 1259 OID 16965)
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- TOC entry 3737 (class 1259 OID 16966)
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- TOC entry 3738 (class 1259 OID 16967)
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- TOC entry 3743 (class 1259 OID 16968)
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- TOC entry 3739 (class 1259 OID 16969)
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- TOC entry 3740 (class 1259 OID 16970)
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: lisardo
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- TOC entry 3769 (class 2620 OID 16971)
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- TOC entry 3770 (class 2620 OID 16972)
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- TOC entry 3771 (class 2620 OID 16973)
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- TOC entry 3772 (class 2620 OID 16974)
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- TOC entry 3773 (class 2620 OID 16975)
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- TOC entry 3775 (class 2620 OID 16976)
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- TOC entry 3776 (class 2620 OID 16977)
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- TOC entry 3774 (class 2620 OID 16978)
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: lisardo
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- TOC entry 3751 (class 2606 OID 16979)
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 3752 (class 2606 OID 16984)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 3753 (class 2606 OID 16989)
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- TOC entry 3754 (class 2606 OID 16994)
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 3755 (class 2606 OID 16999)
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 3756 (class 2606 OID 17004)
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 3757 (class 2606 OID 17009)
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 3758 (class 2606 OID 17014)
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- TOC entry 3759 (class 2606 OID 17019)
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 3760 (class 2606 OID 17024)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 3761 (class 2606 OID 17029)
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: lisardo
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 3762 (class 2606 OID 17034)
-- Name: WardrobeHasCloth WardrobeHasCloth_clothId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WardrobeHasCloth"
    ADD CONSTRAINT "WardrobeHasCloth_clothId_fkey" FOREIGN KEY ("clothId") REFERENCES public."Cloth"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3763 (class 2606 OID 17039)
-- Name: WardrobeHasCloth WardrobeHasCloth_wardrobeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WardrobeHasCloth"
    ADD CONSTRAINT "WardrobeHasCloth_wardrobeId_fkey" FOREIGN KEY ("wardrobeId") REFERENCES public."Wardrobe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3764 (class 2606 OID 17044)
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 3765 (class 2606 OID 17049)
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 3766 (class 2606 OID 17054)
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 3767 (class 2606 OID 17059)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 3768 (class 2606 OID 17064)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: lisardo
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- TOC entry 3922 (class 0 OID 16627)
-- Dependencies: 231
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3923 (class 0 OID 16633)
-- Dependencies: 232
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3924 (class 0 OID 16638)
-- Dependencies: 233
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3925 (class 0 OID 16645)
-- Dependencies: 234
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3926 (class 0 OID 16650)
-- Dependencies: 235
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3927 (class 0 OID 16655)
-- Dependencies: 236
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3928 (class 0 OID 16660)
-- Dependencies: 237
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3929 (class 0 OID 16675)
-- Dependencies: 239
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3930 (class 0 OID 16683)
-- Dependencies: 240
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3931 (class 0 OID 16689)
-- Dependencies: 242
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3932 (class 0 OID 16697)
-- Dependencies: 243
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3933 (class 0 OID 16703)
-- Dependencies: 244
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3934 (class 0 OID 16706)
-- Dependencies: 245
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3935 (class 0 OID 16711)
-- Dependencies: 246
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3936 (class 0 OID 16717)
-- Dependencies: 247
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3937 (class 0 OID 16723)
-- Dependencies: 248
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: lisardo
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3950 (class 3256 OID 17069)
-- Name: Cloth ALL; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "ALL" ON public."Cloth" USING (true);


--
-- TOC entry 3951 (class 3256 OID 17070)
-- Name: WardrobeHasCloth ALL; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "ALL" ON public."WardrobeHasCloth" USING (true);


--
-- TOC entry 3938 (class 0 OID 16738)
-- Dependencies: 249
-- Name: Cloth; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."Cloth" ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3952 (class 3256 OID 17071)
-- Name: tag DELETE; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "DELETE" ON public.tag FOR DELETE USING (true);


--
-- TOC entry 3953 (class 3256 OID 17072)
-- Name: tag INSERT; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "INSERT" ON public.tag FOR INSERT WITH CHECK (true);


--
-- TOC entry 3954 (class 3256 OID 17073)
-- Name: tag SELECT; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "SELECT" ON public.tag FOR SELECT USING (true);


--
-- TOC entry 3955 (class 3256 OID 17074)
-- Name: Wardrobe Todo; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Todo" ON public."Wardrobe" USING (true);


--
-- TOC entry 3956 (class 3256 OID 17075)
-- Name: tag UPDATE; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "UPDATE" ON public.tag FOR UPDATE USING (true);


--
-- TOC entry 3939 (class 0 OID 16745)
-- Dependencies: 251
-- Name: Wardrobe; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."Wardrobe" ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3940 (class 0 OID 16750)
-- Dependencies: 252
-- Name: WardrobeHasCloth; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."WardrobeHasCloth" ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3941 (class 0 OID 16756)
-- Dependencies: 254
-- Name: tag; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tag ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3942 (class 0 OID 16762)
-- Dependencies: 256
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: lisardo
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3943 (class 0 OID 16781)
-- Dependencies: 260
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3944 (class 0 OID 16791)
-- Dependencies: 261
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3945 (class 0 OID 16800)
-- Dependencies: 262
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3946 (class 0 OID 16804)
-- Dependencies: 263
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3947 (class 0 OID 16814)
-- Dependencies: 264
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3948 (class 0 OID 16822)
-- Dependencies: 265
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3949 (class 0 OID 16829)
-- Dependencies: 266
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: lisardo
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3957 (class 6104 OID 17076)
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 11
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- TOC entry 3999 (class 0 OID 0)
-- Dependencies: 12
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- TOC entry 4000 (class 0 OID 0)
-- Dependencies: 13
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- TOC entry 4001 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;


--
-- TOC entry 4002 (class 0 OID 0)
-- Dependencies: 15
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- TOC entry 4003 (class 0 OID 0)
-- Dependencies: 16
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- TOC entry 4008 (class 0 OID 0)
-- Dependencies: 272
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- TOC entry 4009 (class 0 OID 0)
-- Dependencies: 322
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- TOC entry 4011 (class 0 OID 0)
-- Dependencies: 361
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- TOC entry 4013 (class 0 OID 0)
-- Dependencies: 304
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- TOC entry 4014 (class 0 OID 0)
-- Dependencies: 364
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- TOC entry 4015 (class 0 OID 0)
-- Dependencies: 283
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- TOC entry 4016 (class 0 OID 0)
-- Dependencies: 284
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- TOC entry 4017 (class 0 OID 0)
-- Dependencies: 270
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- TOC entry 4018 (class 0 OID 0)
-- Dependencies: 357
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4019 (class 0 OID 0)
-- Dependencies: 281
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4020 (class 0 OID 0)
-- Dependencies: 315
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- TOC entry 4021 (class 0 OID 0)
-- Dependencies: 342
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- TOC entry 4022 (class 0 OID 0)
-- Dependencies: 345
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4023 (class 0 OID 0)
-- Dependencies: 367
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4024 (class 0 OID 0)
-- Dependencies: 340
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- TOC entry 4025 (class 0 OID 0)
-- Dependencies: 378
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- TOC entry 4026 (class 0 OID 0)
-- Dependencies: 291
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 290
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- TOC entry 4029 (class 0 OID 0)
-- Dependencies: 373
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- TOC entry 4031 (class 0 OID 0)
-- Dependencies: 287
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4033 (class 0 OID 0)
-- Dependencies: 314
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- TOC entry 4034 (class 0 OID 0)
-- Dependencies: 269
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4035 (class 0 OID 0)
-- Dependencies: 354
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- TOC entry 4036 (class 0 OID 0)
-- Dependencies: 327
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- TOC entry 4037 (class 0 OID 0)
-- Dependencies: 351
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4038 (class 0 OID 0)
-- Dependencies: 369
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- TOC entry 4039 (class 0 OID 0)
-- Dependencies: 360
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- TOC entry 4040 (class 0 OID 0)
-- Dependencies: 365
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4041 (class 0 OID 0)
-- Dependencies: 362
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4042 (class 0 OID 0)
-- Dependencies: 293
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4043 (class 0 OID 0)
-- Dependencies: 311
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4044 (class 0 OID 0)
-- Dependencies: 313
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4045 (class 0 OID 0)
-- Dependencies: 308
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4046 (class 0 OID 0)
-- Dependencies: 285
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- TOC entry 4047 (class 0 OID 0)
-- Dependencies: 366
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- TOC entry 4048 (class 0 OID 0)
-- Dependencies: 325
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4049 (class 0 OID 0)
-- Dependencies: 363
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4050 (class 0 OID 0)
-- Dependencies: 300
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- TOC entry 4051 (class 0 OID 0)
-- Dependencies: 279
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4052 (class 0 OID 0)
-- Dependencies: 349
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4053 (class 0 OID 0)
-- Dependencies: 377
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4054 (class 0 OID 0)
-- Dependencies: 376
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- TOC entry 4055 (class 0 OID 0)
-- Dependencies: 333
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- TOC entry 4056 (class 0 OID 0)
-- Dependencies: 294
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4057 (class 0 OID 0)
-- Dependencies: 282
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4058 (class 0 OID 0)
-- Dependencies: 321
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4059 (class 0 OID 0)
-- Dependencies: 289
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4061 (class 0 OID 0)
-- Dependencies: 318
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4062 (class 0 OID 0)
-- Dependencies: 306
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- TOC entry 4063 (class 0 OID 0)
-- Dependencies: 295
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- TOC entry 4064 (class 0 OID 0)
-- Dependencies: 273
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4065 (class 0 OID 0)
-- Dependencies: 337
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- TOC entry 4066 (class 0 OID 0)
-- Dependencies: 303
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4067 (class 0 OID 0)
-- Dependencies: 368
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- TOC entry 4068 (class 0 OID 0)
-- Dependencies: 301
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- TOC entry 4069 (class 0 OID 0)
-- Dependencies: 350
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- TOC entry 4070 (class 0 OID 0)
-- Dependencies: 319
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- TOC entry 4071 (class 0 OID 0)
-- Dependencies: 331
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- TOC entry 4072 (class 0 OID 0)
-- Dependencies: 328
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- TOC entry 4073 (class 0 OID 0)
-- Dependencies: 305
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;


--
-- TOC entry 4074 (class 0 OID 0)
-- Dependencies: 317
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- TOC entry 4075 (class 0 OID 0)
-- Dependencies: 334
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;


--
-- TOC entry 4076 (class 0 OID 0)
-- Dependencies: 341
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;


--
-- TOC entry 4077 (class 0 OID 0)
-- Dependencies: 296
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;


--
-- TOC entry 4078 (class 0 OID 0)
-- Dependencies: 297
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;


--
-- TOC entry 4079 (class 0 OID 0)
-- Dependencies: 310
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;


--
-- TOC entry 4080 (class 0 OID 0)
-- Dependencies: 326
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;


--
-- TOC entry 4081 (class 0 OID 0)
-- Dependencies: 276
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- TOC entry 4082 (class 0 OID 0)
-- Dependencies: 274
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;


--
-- TOC entry 4083 (class 0 OID 0)
-- Dependencies: 353
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;


--
-- TOC entry 4084 (class 0 OID 0)
-- Dependencies: 344
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: lisardo
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- TOC entry 4086 (class 0 OID 0)
-- Dependencies: 231
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- TOC entry 4088 (class 0 OID 0)
-- Dependencies: 232
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- TOC entry 4091 (class 0 OID 0)
-- Dependencies: 233
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- TOC entry 4093 (class 0 OID 0)
-- Dependencies: 234
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- TOC entry 4095 (class 0 OID 0)
-- Dependencies: 235
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- TOC entry 4097 (class 0 OID 0)
-- Dependencies: 236
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- TOC entry 4099 (class 0 OID 0)
-- Dependencies: 237
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- TOC entry 4100 (class 0 OID 0)
-- Dependencies: 238
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- TOC entry 4101 (class 0 OID 0)
-- Dependencies: 239
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- TOC entry 4103 (class 0 OID 0)
-- Dependencies: 240
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- TOC entry 4105 (class 0 OID 0)
-- Dependencies: 241
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- TOC entry 4107 (class 0 OID 0)
-- Dependencies: 242
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- TOC entry 4109 (class 0 OID 0)
-- Dependencies: 243
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- TOC entry 4111 (class 0 OID 0)
-- Dependencies: 244
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- TOC entry 4114 (class 0 OID 0)
-- Dependencies: 245
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- TOC entry 4116 (class 0 OID 0)
-- Dependencies: 246
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- TOC entry 4119 (class 0 OID 0)
-- Dependencies: 247
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- TOC entry 4122 (class 0 OID 0)
-- Dependencies: 248
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: lisardo
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- TOC entry 4123 (class 0 OID 0)
-- Dependencies: 227
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- TOC entry 4124 (class 0 OID 0)
-- Dependencies: 226
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: lisardo
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- TOC entry 4125 (class 0 OID 0)
-- Dependencies: 249
-- Name: TABLE "Cloth"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Cloth" TO anon;
GRANT ALL ON TABLE public."Cloth" TO authenticated;
GRANT ALL ON TABLE public."Cloth" TO service_role;


--
-- TOC entry 4126 (class 0 OID 0)
-- Dependencies: 250
-- Name: SEQUENCE "Cloth_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Cloth_id_seq" TO anon;
GRANT ALL ON SEQUENCE public."Cloth_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Cloth_id_seq" TO service_role;


--
-- TOC entry 4128 (class 0 OID 0)
-- Dependencies: 251
-- Name: TABLE "Wardrobe"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Wardrobe" TO anon;
GRANT ALL ON TABLE public."Wardrobe" TO authenticated;
GRANT ALL ON TABLE public."Wardrobe" TO service_role;


--
-- TOC entry 4129 (class 0 OID 0)
-- Dependencies: 252
-- Name: TABLE "WardrobeHasCloth"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."WardrobeHasCloth" TO anon;
GRANT ALL ON TABLE public."WardrobeHasCloth" TO authenticated;
GRANT ALL ON TABLE public."WardrobeHasCloth" TO service_role;


--
-- TOC entry 4130 (class 0 OID 0)
-- Dependencies: 253
-- Name: SEQUENCE "Wardrobe_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Wardrobe_id_seq" TO anon;
GRANT ALL ON SEQUENCE public."Wardrobe_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Wardrobe_id_seq" TO service_role;


--
-- TOC entry 4131 (class 0 OID 0)
-- Dependencies: 254
-- Name: TABLE tag; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tag TO anon;
GRANT ALL ON TABLE public.tag TO authenticated;
GRANT ALL ON TABLE public.tag TO service_role;


--
-- TOC entry 4132 (class 0 OID 0)
-- Dependencies: 255
-- Name: SEQUENCE tag_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.tag_id_seq TO anon;
GRANT ALL ON SEQUENCE public.tag_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.tag_id_seq TO service_role;


--
-- TOC entry 4133 (class 0 OID 0)
-- Dependencies: 256
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: lisardo
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- TOC entry 4134 (class 0 OID 0)
-- Dependencies: 257
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;


--
-- TOC entry 4135 (class 0 OID 0)
-- Dependencies: 258
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;


--
-- TOC entry 4136 (class 0 OID 0)
-- Dependencies: 259
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;


--
-- TOC entry 4138 (class 0 OID 0)
-- Dependencies: 260
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: lisardo
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- TOC entry 4139 (class 0 OID 0)
-- Dependencies: 261
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: lisardo
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- TOC entry 4141 (class 0 OID 0)
-- Dependencies: 263
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: lisardo
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- TOC entry 4142 (class 0 OID 0)
-- Dependencies: 264
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: lisardo
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- TOC entry 4143 (class 0 OID 0)
-- Dependencies: 265
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: lisardo
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- TOC entry 4144 (class 0 OID 0)
-- Dependencies: 266
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: lisardo
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- TOC entry 2321 (class 826 OID 17082)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2322 (class 826 OID 17083)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- TOC entry 2323 (class 826 OID 17084)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2324 (class 826 OID 17085)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2325 (class 826 OID 17086)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2326 (class 826 OID 17087)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2327 (class 826 OID 17088)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2328 (class 826 OID 17089)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2329 (class 826 OID 17090)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2330 (class 826 OID 17091)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2331 (class 826 OID 17092)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2332 (class 826 OID 17093)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2333 (class 826 OID 17094)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2334 (class 826 OID 17095)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2335 (class 826 OID 17096)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2336 (class 826 OID 17097)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2337 (class 826 OID 17098)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2338 (class 826 OID 17099)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2339 (class 826 OID 17100)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2340 (class 826 OID 17101)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2341 (class 826 OID 17102)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 3551 (class 3466 OID 17103)
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: lisardo
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO lisardo;

--
-- TOC entry 3552 (class 3466 OID 17104)
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: lisardo
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO lisardo;

--
-- TOC entry 3553 (class 3466 OID 17105)
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: lisardo
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO lisardo;

--
-- TOC entry 3554 (class 3466 OID 17106)
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: lisardo
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO lisardo;

--
-- TOC entry 3555 (class 3466 OID 17107)
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: lisardo
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO lisardo;

--
-- TOC entry 3556 (class 3466 OID 17108)
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: lisardo
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO lisardo;

-- Completed on 2026-11-01 19:16:02 CET

--
-- PostgreSQL database dump complete
--

\unrestrict 72ooXYabyJvMoIT1Ij7zB5xIp96rIw5cQt4JZ0xFCfiDcC3e1CTdxWcBQv2OOmJ

