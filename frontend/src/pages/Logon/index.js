import React, { useState } from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('produtorId', id);
            localStorage.setItem('produtorName', response.data.name);
            history.push('/profile');

        } catch (error) {
            alert('Falha no login, tente novamente.');            
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={ logo } alt ="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                    placeholder="Sua ID"
                    value={id}
                    onChange={e  => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#7C8083" />
                        Não tenho cadastro                        
                    </Link>
                </form>
            </section>

            <img src={ heroesImg } alt ="CAV"/>
        </div>
    );
}