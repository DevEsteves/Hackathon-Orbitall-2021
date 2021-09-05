package com.orbitallcorp.hack21.cards.services;

import com.orbitallcorp.hack21.cards.domains.Card;
import com.orbitallcorp.hack21.cards.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Service
public class Cardservice {
    @Autowired
    private CardRepository CardRepository;

    public Card save(Card Card) {
        return CardRepository.save((Card));
    }

    public List<Card> findAll() {
        // O código abaixo é o sugerido pela comunidade Spring Boot:
        //List<> Cards = new ArrayList<>();
        //CardRepository.findAll().forEach(Cards :: add);

        // O código abaixo é a moda antiga, risos!
        List<Card> Cards = new ArrayList<Card>();
        for (Card Card : (List<Card>) CardRepository.findAll()) {
            Cards.add(Card);
        }

        // O código abaixo força o Iterable para List
        // return (List<Card>) repository.findAll();

        return Cards;
    }
}
