import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';


export default function Profile() {
  const [jobs, setJobs] = useState([]);

  const history = useHistory();
  const produtorId = localStorage.getItem('produtorId');
  const produtorName = localStorage.getItem('produtorName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: produtorId,
      }
    }).then(response => {
      setJobs(response.data);
    })
  }, [produtorId]);

  async function handleDeleteJob(id) {
    try {
      await api.delete(`jobs/${id}`, {
        headers: {
          Authorization: produtorId,
        }
      });

      setJobs(jobs.filter(jobs => jobs.id !== id));
    } catch (error) {
      alert('Erro ao deletar job, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={ logoImg } alt="CAV Jobs" to="/" />
        <span>Bem vindo, {produtorName}</span>
        <Link className="button" to="/jobs/new">Cadastrar novo job</Link>
        <button onClick={ handleLogout } type="button">
          <FiPower size= {18} color="#7C8083" />
        </button>
      </header>
      <h1>Jobs cadastrados</h1>
      <ul>
        {jobs.map(jobs => (
          <li key={ jobs.id }>
            <strong>JOB:</strong>
            <p>{jobs.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{jobs.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(jobs.value)}</p>

            <button onClick={() => handleDeleteJob(jobs.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
        </li>
        ))}
      </ul>
    </div>
  );
}