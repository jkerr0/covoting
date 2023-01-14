package pl.jkerro.covoting.users;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean isAdmin(String email) {
        return userRepository.findApplicationUserByEmail(email)
                .map(ApplicationUser::getUserType)
                .filter(UserType.ADMIN::equals)
                .isPresent();
    }
}
