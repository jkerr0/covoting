BEGIN;

CREATE TABLE IF NOT EXISTS public.presence_confirm
(
    user_id integer NOT NULL,
    voting_session_id integer NOT NULL,
    PRIMARY KEY (user_id, voting_session_id)
);

ALTER TABLE IF EXISTS public.presence_confirm
    ADD FOREIGN KEY (user_id)
        REFERENCES public.application_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS public.presence_confirm
    ADD FOREIGN KEY (voting_session_id)
        REFERENCES public.voting_session (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

-- missing fk constraints from V7

ALTER TABLE IF EXISTS public.vote
    ADD FOREIGN KEY (voting_id)
        REFERENCES public.voting (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS public.vote
    ADD FOREIGN KEY (user_id)
        REFERENCES public.application_user (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

END;