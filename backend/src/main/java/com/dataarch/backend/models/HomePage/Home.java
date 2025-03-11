package com.dataarch.backend.models.HomePage;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String intro;

    @OneToOne(cascade = CascadeType.ALL)
    private HeroSection hero;

    @OneToOne(cascade = CascadeType.ALL)
    private CardSection cards;

    @OneToOne(cascade = CascadeType.ALL)
    private ClientSaySection clientSay;

    @OneToOne(cascade = CascadeType.ALL)
    private Footer footer;
}