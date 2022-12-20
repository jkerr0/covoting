BEGIN;

ALTER TABLE IF EXISTS public.voting_session
    ADD COLUMN IF NOT EXISTS current_voting_seq integer NOT NULL DEFAULT 0;

END;