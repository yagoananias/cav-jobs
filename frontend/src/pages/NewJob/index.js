import React, { useState } from 'react';
import logoImg from '../../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

export default function NewJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const produtorId = localStorage.getItem('produtorId');

  const history = useHistory();

  async function handleNewJob(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('jobs', data, {
        headers: {
          Authorization: produtorId,
        }
      })

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar job, tente novamente.')
    }
  }

  return (
    <div className="new-job-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="CAV Jobs"/>
          <h1>Cadastrar novo job</h1>
          <p>Descreva o job detalhadamente para 
            encontrar a pessoa certa.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar                        
          </Link>
        </section>

        <form onSubmit={handleNewJob}>
          <input
            placeholder="Título do job"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
                   
          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}