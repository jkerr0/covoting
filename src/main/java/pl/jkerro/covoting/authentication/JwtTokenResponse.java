package pl.jkerro.covoting.authentication;

import lombok.Builder;
import org.codehaus.plexus.util.StringUtils;
import pl.jkerro.covoting.users.UserType;

public record JwtTokenResponse(String jwtToken, String tokenType, UserType userType, String email) {
    @Builder public JwtTokenResponse {}

    public static final class JwtTokenResponseBuilder {
        public JwtTokenResponseBuilder tokenType(JwtTokenType tokenType) {
            this.tokenType = StringUtils.capitalise(tokenType.toString().toLowerCase());
            return this;
        }
    }
}
