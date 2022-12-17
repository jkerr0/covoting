package pl.jkerro.covoting.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jkerro.covoting.users.UserType;

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
                .userType(getUserType((UserDetails) authentication.getPrincipal()))
                .build();

        return ResponseEntity.ok()
                .body(response);
    }

    private UserType getUserType(UserDetails userDetails) {
        return userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .map(authority -> authority.substring("ROLE_".length()))
                .map(UserType::valueOf)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("User without a role, email: " + userDetails.getUsername()));
    }

    private UsernamePasswordAuthenticationToken toToken(LoginRequest loginRequest) {
        return new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password());
    }

}
