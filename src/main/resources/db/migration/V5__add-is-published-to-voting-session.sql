BEGIN;

ALTER TABLE IF EXISTS public.voting_session
    ADD COLUMN is_published boolean NOT NULL DEFAULT false;

END;