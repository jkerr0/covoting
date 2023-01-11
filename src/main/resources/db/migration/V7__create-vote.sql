BEGIN;

CREATE TABLE IF NOT EXISTS public.vote
(
    voting_id integer NOT NULL,
    user_id integer NOT NULL,
    vote_type character varying(10) NOT NULL,
    PRIMARY KEY (user_id, voting_id)
);

END;