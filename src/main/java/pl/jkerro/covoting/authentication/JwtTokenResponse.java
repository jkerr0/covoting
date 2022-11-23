package pl.jkerro.covoting.authentication;

import lombok.Builder;
import org.codehaus.plexus.util.StringUtils;

public record JwtTokenResponse(String jwtToken, String tokenType) {
    @Builder public JwtTokenResponse {}

    public static final class JwtTokenResponseBuilder {
        public JwtTokenResponseBuilder tokenType(JwtTokenType tokenType) {
            this.tokenType = StringUtils.capitalise(tokenType.toString().toLowerCase());
            return this;
        }
    }
}
