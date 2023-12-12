package com.prjfinal.jogo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prjfinal.jogo.entities.Jogo;

public interface JogoRepository extends JpaRepository<Jogo, Long> {

}
