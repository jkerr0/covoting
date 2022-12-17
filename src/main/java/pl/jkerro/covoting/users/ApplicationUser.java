package pl.jkerro.covoting.users;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "application_user")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String email;
    private String fullName;
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private Integer voteWeight;


    public UserDetails toUserDetails() {
        return new User(email, passwordHash, getAuthorities());
    }

    private List<GrantedAuthority> getAuthorities() {
        return switch (userType) {
            case ADMIN -> List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
            case VOTER -> List.of(new SimpleGrantedAuthority("ROLE_VOTER"));
        };
    }
}
