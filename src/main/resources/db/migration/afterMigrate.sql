BEGIN;

INSERT INTO public.application_user (id, email, password_hash, user_type, full_name)
VALUES (1, 'admin', '$2a$12$mn7590nq/K.sHihP8F5gauSb5NL4y7rYn9asySuT6TiCb0bg513P6', 'ADMIN', 'Jan Kowalski'), -- password 1234
       (2, 'voter', '$2a$12$mn7590nq/K.sHihP8F5gauSb5NL4y7rYn9asySuT6TiCb0bg513P6', 'VOTER', 'Ewa Nowak')
ON CONFLICT (id) DO UPDATE SET email=excluded.email;

END;