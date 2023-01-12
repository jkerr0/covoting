BEGIN;

ALTER TABLE public.vote
    ADD COLUMN "weight" integer NULL;

UPDATE public.vote
    SET "weight" = 1
    WHERE "weight" IS NULL;

ALTER TABLE public.vote
    ALTER COLUMN "weight" SET NOT NULL;

END;