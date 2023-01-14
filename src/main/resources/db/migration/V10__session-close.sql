BEGIN;

ALTER TABLE public.voting_session
    ADD COLUMN is_closed boolean NOT NULL DEFAULT false;

END;