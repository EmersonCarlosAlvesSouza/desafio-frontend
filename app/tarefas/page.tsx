"use client";

import React, { useState } from 'react';
import tarefasStyles from './tarefas.module.scss';  // Renomeando o estilo das tarefas
import adicionarStyles from './modal.adicionar.module.scss';  // Estilo para adicionar modal
import deletarStyles from './modal.deletar.module.scss';  // Estilo para deletar modal

import Image from 'next/image';
import logo from '../src/logo.png'; // Caminho ajustado

interface Tarefa {
  id: number;
  nome: string;
  completed: boolean;
  hot?: boolean;
}

const Tarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, nome: 'Lavar as mãos', completed: false },
    { id: 2, nome: 'Fazer um bolo', completed: false, hot: true },
    { id: 3, nome: 'Lavar a louça', completed: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [tarefaParaDeletar, setTarefaParaDeletar] = useState<Tarefa | null>(null);
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleAddTarefa = () => {
    setTarefas([
      ...tarefas,
      { id: tarefas.length + 1, nome: novaTarefa, completed: false },
    ]);
    setNovaTarefa('');
    setModalVisible(false);
  };

  const handleDeleteTarefa = (tarefa: Tarefa) => {
    setTarefaParaDeletar(tarefa);
    setModalDeleteVisible(true);
  };

  const confirmDeleteTarefa = () => {
    if (tarefaParaDeletar) {
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== tarefaParaDeletar?.id));
      setTarefaParaDeletar(null);
      setModalDeleteVisible(false);
    }
  };

  return (
    <div className={tarefasStyles.container}>
      <header className={tarefasStyles.header}>
        <div className={tarefasStyles.logoContainer}>
          <Image src={logo} alt="FocalPoint logo" width={50} height={50} />
          <span className={tarefasStyles.logoText}>FocalPoint</span>
        </div>
        <div className={tarefasStyles.welcome}>
          <h1>Bem-vindo de volta, Marcus</h1>
        </div>
        <div className={tarefasStyles.date}>
          <span>Segunda, 01 de dezembro de 2025</span>
        </div>
      </header>

      <div className={tarefasStyles.tarefasContainer}>
        <h2>Suas tarefas de hoje</h2>
        <ul className={tarefasStyles.tarefasList}>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <input type="checkbox" />
              {tarefa.nome}
              {tarefa.hot && <span className={tarefasStyles.hot}>HOT</span>}
              <button
                className={tarefasStyles.deleteButton}
                onClick={() => handleDeleteTarefa(tarefa)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Colocando o botão fora da div de tarefas */}
      <div className={tarefasStyles.buttonContainer}>
        <button
          className={tarefasStyles.addButton}
          onClick={() => setModalVisible(true)}
        >
          Adicionar nova tarefa
        </button>
      </div>

      {modalVisible && (
        <div className={adicionarStyles.modalOverlay}>
          <div className={adicionarStyles.modalContent}>
            <h2 className={adicionarStyles.modalTitle}>Nova tarefa</h2>
            <label htmlFor="titulo" className={adicionarStyles.modalLabel}>Título</label>
            <input
              id="titulo"
              type="text"
              placeholder="Digite"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              className={adicionarStyles.modalInput}
            />
            <div className={adicionarStyles.modalButtons}>
              <button onClick={() => setModalVisible(false)} className={adicionarStyles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleAddTarefa} disabled={!novaTarefa} className={adicionarStyles.addButton}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDeleteVisible && (
        <div className={deletarStyles.modalOverlay}>
          <div className={deletarStyles.modalContent}>
            <h2>Deletar tarefa</h2>
            <p>Tem certeza que deseja deletar essa tarefa?</p>
            <div className={deletarStyles.modalButtons}>
              <button onClick={() => setModalDeleteVisible(false)} className={deletarStyles.cancelButton}>
                Cancelar
              </button>
              <button onClick={confirmDeleteTarefa} className={deletarStyles.delete}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tarefas;
