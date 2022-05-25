BEGIN;


CREATE TABLE IF NOT EXISTS public.voting_session
(
    id integer NOT NULL,
    start_date timestamp with time zone NOT NULL,
    name character varying(200) NOT NULL,
    PRIMARY KEY (id)
);
END;