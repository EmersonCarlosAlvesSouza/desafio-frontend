"use client";

import React, { useState } from 'react';
import styles from './tarefas.module.scss';
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
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== tarefaParaDeletar.id));
      setTarefaParaDeletar(null);
      setModalDeleteVisible(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="FocalPoint logo" width={50} height={50} />
          <span className={styles.logoText}>FocalPoint</span>
        </div>
        <div className={styles.welcome}>
          <h1>Bem-vindo de volta, Marcus</h1>
        </div>
        <div className={styles.date}>
          <span>Segunda, 01 de dezembro de 2025</span>
        </div>
      </header>

      <div className={styles.tarefasContainer}>
        <h2>Suas tarefas de hoje</h2>
        <ul className={styles.tarefasList}>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <input type="checkbox" />
              {tarefa.nome}
              {tarefa.hot && <span className={styles.hot}>HOT</span>}
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteTarefa(tarefa)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        <button
          className={styles.addButton}
          onClick={() => setModalVisible(true)}
        >
          Adicionar nova tarefa
        </button>
      </div>

      {modalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Nova tarefa</h2>
            <label htmlFor="titulo" className={styles.modalLabel}>Título</label>
            <input
              id="titulo"
              type="text"
              placeholder="Digite"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              className={styles.modalInput}
            />
            <div className={styles.modalButtons}>
              <button onClick={() => setModalVisible(false)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleAddTarefa} disabled={!novaTarefa} className={styles.addButton}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDeleteVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Deletar tarefa</h2>
            <p>Tem certeza que deseja deletar essa tarefa?</p>
            <div className={styles.modalButtons}>
              <button onClick={() => setModalDeleteVisible(false)} className={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={confirmDeleteTarefa} className={styles.delete}>
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
