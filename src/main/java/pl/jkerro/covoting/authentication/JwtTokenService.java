package pl.jkerro.covoting.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.function.Function;

@Service
public class JwtTokenService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationMs}")
    private Integer tokenExpirationMs;

    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + tokenExpirationMs))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> resolver) {
        return resolver.apply(
                Jwts.parser()
                        .setSigningKey(secret)
                        .parseClaimsJws(token)
                        .getBody());
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
