package pl.jkerro.covoting.users;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Override
    public Optional<User> findUserByEmail(String email) {
        if ("abcd".equals(email)) {
            return Optional.of(new User(email, "$2a$12$mn7590nq/K.sHihP8F5gauSb5NL4y7rYn9asySuT6TiCb0bg513P6"));
        }
        return Optional.empty();
    }
}
