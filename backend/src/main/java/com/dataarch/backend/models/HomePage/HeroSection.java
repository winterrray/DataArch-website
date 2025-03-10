package com.dataarch.backend.models.HomePage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class HeroSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ElementCollection
    private List<String> heading;

    @ElementCollection
    @CollectionTable(name = "hero_statistics", joinColumns = @JoinColumn(name = "hero_id"))
    @MapKeyColumn(name = "stat_key")
    @Column(name = "stat_value")
    private Map<String, String> statistics;
}