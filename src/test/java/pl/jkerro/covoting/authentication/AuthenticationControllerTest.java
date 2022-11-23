package pl.jkerro.covoting.authentication;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pl.jkerro.covoting.users.User;
import pl.jkerro.covoting.users.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@MockBean(classes = {UserRepository.class})
@AutoConfigureMockMvc
class AuthenticationControllerTest {

    private static final String TEST_USER_EMAIL = "abcd@abcd.pl";
    private static final String TEST_USER_PASS = "ababa123";

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setup() {
        Mockito.when(userRepository.findUserByEmail(TEST_USER_EMAIL))
                .thenReturn(Optional.of(new User(TEST_USER_EMAIL, passwordEncoder.encode(TEST_USER_PASS))));
    }

    ResponseEntity<JwtTokenResponse> getValidUserAuthenticationResponse() {
        LoginRequest request = new LoginRequest(TEST_USER_EMAIL, TEST_USER_PASS);
        return authenticationController.authenticate(request);
    }

    @Test
    void shouldReturnOkWhenValidUser() {
        assertEquals(HttpStatus.OK, getValidUserAuthenticationResponse().getStatusCode());
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
    void shouldGetOkFromSecureEndpointAfterAuthentication() throws Exception {
        JwtTokenResponse response = Optional.ofNullable(getValidUserAuthenticationResponse().getBody())
                .orElseThrow();

        RequestBuilder secureRequest = MockMvcRequestBuilders.get("/voting_sessions")
                .header("Authorization", String.format("%s %s", response.tokenType(), response.jwtToken()));

        mockMvc.perform(secureRequest).andExpect(status().isOk());
    }

    @Test
    void shouldGetUnauthorizedWithoutCredentials() throws Exception {
        RequestBuilder secureRequest = MockMvcRequestBuilders.get("/voting_sessions");
        mockMvc.perform(secureRequest).andExpect(status().isUnauthorized());
    }
}