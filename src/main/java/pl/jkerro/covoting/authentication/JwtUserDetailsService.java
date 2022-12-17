package pl.jkerro.covoting.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.users.UserRepository;

@RequiredArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findApplicationUserByEmail(email)
                .map(ApplicationUser::toUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with email %s not found", email)));
    }
}
