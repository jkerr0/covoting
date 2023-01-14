BEGIN;

INSERT INTO public.application_user (id, email, password_hash, user_type, full_name, vote_weight)
VALUES (1, 'admin@covoting.pl', '$2a$12$mn7590nq/K.sHihP8F5gauSb5NL4y7rYn9asySuT6TiCb0bg513P6', 'ADMIN', 'Jan Kowalski', 1), -- password 1234
       (2, 'voter@covoting.pl', '$2a$12$mn7590nq/K.sHihP8F5gauSb5NL4y7rYn9asySuT6TiCb0bg513P6', 'VOTER', 'Ewa Nowak', 1),
       (3, 'voter1@covoting.pl', '$2a$12$mn7590nq/K.sHihP8F5gauSb5NL4y7rYn9asySuT6TiCb0bg513P6', 'VOTER', 'Michał Bańka', 2)
ON CONFLICT (id) DO UPDATE SET email=excluded.email;

END;
