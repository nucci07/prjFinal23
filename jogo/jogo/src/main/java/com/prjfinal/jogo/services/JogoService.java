package com.prjfinal.jogo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjfinal.jogo.entities.Jogo;
import com.prjfinal.jogo.repositories.JogoRepository;

@Service
public class JogoService {

	private final JogoRepository jogoRepository;

	@Autowired
	public JogoService(JogoRepository jogoRepository) {
		this.jogoRepository = jogoRepository;
	}

	// preparando as buscas por id
	public Jogo getJogoById(Long id) {
		return jogoRepository.findById(id).orElse(null);
	}

	// preparando a busca geral
	public List<Jogo> getAllJogos() {
		return jogoRepository.findAll();
	}

	// salvando o Jogo
	public Jogo saveJogo(Jogo jogo) {
		return jogoRepository.save(jogo);
	}

	// excluindo o Jogo
	public void deleteJogo(Long id) {
		jogoRepository.deleteById(id);
	}
	
}
