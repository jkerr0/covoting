package pl.jkerro.covoting.users;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findUserByEmail(String email);
}
