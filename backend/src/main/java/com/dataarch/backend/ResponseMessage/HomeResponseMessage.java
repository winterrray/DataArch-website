package com.dataarch.backend.ResponseMessage;

import com.dataarch.backend.models.HomePage.CardSection;
import com.dataarch.backend.models.HomePage.ClientSaySection;
import com.dataarch.backend.models.HomePage.Footer;
import com.dataarch.backend.models.HomePage.HeroSection;
import com.dataarch.backend.models.HomePage.Home;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeResponseMessage {
    private String intro;
    private HeroSection hero;
    private CardSection cards;
    private ClientSaySection clientSay;
    private Footer footer;
}
