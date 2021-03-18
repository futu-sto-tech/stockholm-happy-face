CREATE TABLE public.entry (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    image_id integer NOT NULL,
    team_id integer NOT NULL,
    user_id text NOT NULL,
    presented boolean DEFAULT false NOT NULL
);
CREATE FUNCTION public.month(entry_row public.entry) RETURNS double precision
    LANGUAGE sql STABLE
    AS $$
  SELECT EXTRACT(month FROM entry_row.created_at)
$$;
CREATE TABLE public."user" (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    "order" integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    picture text,
    role text DEFAULT 'PARTICIPANT'::text NOT NULL,
    team_id integer NOT NULL,
    session_id integer,
    "timestamp" text,
    last_seen timestamp with time zone DEFAULT now() NOT NULL
);
CREATE FUNCTION public.online_team_users(user_team_id integer) RETURNS SETOF public."user"
    LANGUAGE sql STABLE
    AS $$
    SELECT *
    FROM "user"
    WHERE ("user".last_seen > (now() - '00:00:10'::interval) AND team_id=user_team_id);
$$;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE FUNCTION public.week(entry_row public.entry) RETURNS double precision
    LANGUAGE sql STABLE
    AS $$
  SELECT EXTRACT(week FROM entry_row.created_at)
$$;
CREATE FUNCTION public.year(entry_row public.entry) RETURNS double precision
    LANGUAGE sql STABLE
    AS $$
  SELECT EXTRACT(year FROM entry_row.created_at)
$$;
CREATE SEQUENCE public.entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.entry_id_seq OWNED BY public.entry.id;
CREATE TABLE public.image (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    original_url text NOT NULL,
    giphy_id text,
    preview_url text,
    fixed_width_url text,
    fixed_width_webp_url text,
    title text,
    color text
);
CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;
CREATE TABLE public.old_entry (
    id integer NOT NULL,
    user_id text NOT NULL,
    created_at date NOT NULL,
    url text NOT NULL
);
CREATE SEQUENCE public.old_entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.old_entry_id_seq OWNED BY public.old_entry.id;
CREATE SEQUENCE public.person_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.person_order_seq OWNED BY public."user"."order";
CREATE TABLE public.reaction (
    id integer DEFAULT nextval('public.entry_id_seq'::regclass) NOT NULL,
    entry_id integer NOT NULL,
    user_id text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.team (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    entry_id integer,
    active boolean DEFAULT false NOT NULL,
    changed_entry_at timestamp with time zone,
    status text DEFAULT 'DEFAULT'::text NOT NULL
);
CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;
CREATE VIEW public.user_online AS
 SELECT "user".id,
    "user".name,
    "user".last_seen,
    "user".picture,
    "user".team_id
   FROM public."user"
  WHERE ("user".last_seen > (now() - '00:00:10'::interval));
ALTER TABLE ONLY public.entry ALTER COLUMN id SET DEFAULT nextval('public.entry_id_seq'::regclass);
ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);
ALTER TABLE ONLY public.old_entry ALTER COLUMN id SET DEFAULT nextval('public.old_entry_id_seq'::regclass);
ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN "order" SET DEFAULT nextval('public.person_order_seq'::regclass);
ALTER TABLE ONLY public.entry
    ADD CONSTRAINT entry_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_giphy_id_key UNIQUE (giphy_id);
ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.old_entry
    ADD CONSTRAINT old_entry_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.old_entry
    ADD CONSTRAINT old_entry_user_id_url_created_at_key UNIQUE (user_id, url, created_at);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT person_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT reaction_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_name_key UNIQUE (name);
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_entry_updated_at BEFORE UPDATE ON public.entry FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_entry_updated_at ON public.entry IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_image_updated_at BEFORE UPDATE ON public.image FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_image_updated_at ON public.image IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_person_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_person_updated_at ON public."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_team_updated_at BEFORE UPDATE ON public.team FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_team_updated_at ON public.team IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.entry
    ADD CONSTRAINT entry_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.entry
    ADD CONSTRAINT entry_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.old_entry
    ADD CONSTRAINT old_entry_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT reaction_entry_id_fkey FOREIGN KEY (entry_id) REFERENCES public.entry(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT reaction_sender_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_entry_id_fkey FOREIGN KEY (entry_id) REFERENCES public.entry(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.team(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(id) ON UPDATE RESTRICT ON DELETE SET NULL;
