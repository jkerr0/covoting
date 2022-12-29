package pl.jkerro.covoting.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

import static pl.jkerro.covoting.authentication.JwtRequestFilter.BEARER_PREFIX;

@Service
public class JwtTokenService {

    @Getter
    @Value("${jwt.secret}")
    private String secret;

    @Getter
    @Value("${jwt.expirationMs}")
    private String tokenExpirationMs;

    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + Integer.parseInt(getTokenExpirationMs())))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> resolver) {
        return resolver.apply(
                Jwts.parser()
                        .setSigningKey(getSecret())
                        .parseClaimsJws(token)
                        .getBody());
    }

    public Optional<String> findUsernameFromHeader(String authHeader) {
        return findJwtTokenFromHeader(authHeader).map(this::getUsernameFromToken);
    }

    public Optional<String> findJwtTokenFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            return Optional.empty();
        }
        return Optional.of(authHeader.substring(BEARER_PREFIX.length()));
    }



    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = getClaimFromToken(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    public boolean validateToken(String token) {
        try {
            return Jwts.parser().setSigningKey(secret).isSigned(token) && !isTokenExpired(token);
        } catch (RuntimeException e) {
            return false;
        }
    }
}
