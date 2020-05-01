import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import styles from './styles';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(job) {
    navigation.navigate('Detail', { job });
  }

  async function loadJobs(){
    if (loading) {
      return;
    }

    if (total > 0 && jobs.length === total) {
      return;
    }

    setLoading(true);

  const response = await api.get('jobs', {
    params: { page }
  });

      setJobs([... jobs, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} jobs</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos jobs abaixo.</Text>

      <FlatList
        data={jobs}
        style={styles.jobList}        
        keyExtractor={ job => String(job.id) }
        showsVerticalScrollIndicator={false}
        onEndReached={loadJobs}
        onEndReachedThreshold={0.2}
        renderItem={({ item: job }) => (
          <View style={styles.job}>
            <Text style={styles.jobProperty}>PRODUTOR:</Text>
            <Text style={styles.jobValue}>{job.name}</Text>

            <Text style={styles.jobProperty}>JOB:</Text>
            <Text style={styles.jobValue}>{job.title}</Text>

            <Text style={styles.jobProperty}>VALOR:</Text>
            <Text style={styles.jobValue}>
              {Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL'
              }).format(job.value)}
            </Text>

            <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={() => navigateToDetail(job)}
            >              
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#7C8083" />
            </TouchableOpacity>
        </View>
        )}
      /> 
    </View>
  );
}