package pl.jkerro.covoting.authentication;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.context.WebApplicationContext;
import pl.jkerro.covoting.users.ApplicationUser;
import pl.jkerro.covoting.users.UserRepository;
import pl.jkerro.covoting.users.UserType;
import pl.jkerro.covoting.voting_session.VotingSessionRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class AuthenticationControllerTest {

    private static final String TEST_USER_EMAIL = "abcd@abcd.pl";
    private static final String TEST_USER_PASS = "ababa123";

    @Spy
    private JwtTokenService jwtTokenService;

    private AuthenticationController authenticationController;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private VotingSessionRepository votingSessionRepository;

    @Autowired
    private WebApplicationContext context;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(jwtTokenService, "secret", "testSecret");
        ReflectionTestUtils.setField(jwtTokenService, "tokenExpirationMs", "100000");

        authenticationController = new AuthenticationController(authenticationManager, jwtTokenService);

        ApplicationUser testApplicationUser = ApplicationUser.builder()
                .email(TEST_USER_EMAIL)
                .passwordHash(passwordEncoder.encode(TEST_USER_PASS))
                .userType(UserType.ADMIN)
                .build();
        Mockito.when(userRepository.findApplicationUserByEmail(TEST_USER_EMAIL))
                .thenReturn(Optional.of(testApplicationUser));

        Mockito.when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(TEST_USER_EMAIL, TEST_USER_PASS)))
                .thenReturn(new TestingAuthenticationToken(testApplicationUser.toUserDetails(), TEST_USER_PASS));

        Mockito.when(votingSessionRepository.findAll()).thenReturn(List.of());
    }

    ResponseEntity<JwtTokenResponse> getValidUserAuthenticationResponse() {
        LoginRequest request = getLoginRequest();
        return authenticationController.authenticate(request);
    }

    private LoginRequest getLoginRequest() {
        return new LoginRequest(TEST_USER_EMAIL, TEST_USER_PASS);
    }

    @Test
    void shouldReturnOkWhenValidUser() {
        assertEquals(HttpStatus.OK, getValidUserAuthenticationResponse().getStatusCode());
    }

    @Test
    void shouldThrowWhenInvalidUser() {
        LoginRequest loginRequest = new LoginRequest("aaa", "bbb");
        assertThrows(Exception.class, () -> authenticationController.authenticate(loginRequest));
    }

    @Test
    void shouldGenerateJwtToken() {
        String token = Optional.ofNullable(getValidUserAuthenticationResponse().getBody())
                .map(JwtTokenResponse::jwtToken)
                .orElse(null);

        assertNotNull(token);
    }

    @Test
    void shouldReturnTokenTypeBearer() {
        String tokenType = Optional.ofNullable(getValidUserAuthenticationResponse().getBody())
                .map(JwtTokenResponse::tokenType)
                .orElse(null);

        assertEquals("Bearer", tokenType);
    }

    @Test
    void shouldReturnUserType() {
        UserType userType = Optional.ofNullable(getValidUserAuthenticationResponse().getBody())
                .map(JwtTokenResponse::userType)
                .orElse(null);

        assertNotNull(userType);
    }
}