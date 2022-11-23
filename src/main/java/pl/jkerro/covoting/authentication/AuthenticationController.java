package pl.jkerro.covoting.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("auth")
@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    @PostMapping("login")
    public ResponseEntity<JwtTokenResponse> authenticate(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token = toToken(loginRequest);
        Authentication authentication = authenticationManager.authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtTokenService.generateToken(authentication);
        JwtTokenResponse response = JwtTokenResponse.builder()
                .tokenType(JwtTokenType.BEARER)
                .jwtToken(jwtToken)
                .build();

        return ResponseEntity.ok()
                .body(response);
    }

    private UsernamePasswordAuthenticationToken toToken(LoginRequest loginRequest) {
        return new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password());
    }

}
