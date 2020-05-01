import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logo from '../../assets/logo.png';

import styles from './styles'


export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const job = route.params.job;
  const message = `Olá ${job.name}, estou entrando em contato pois tenho interesse no job de "${job.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(job.value)}.`;

  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Candidato: ${job.title}`,
      recipients: [job.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${job.whatsapp}?text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo}/>
        <TouchableOpacity onPress={ navigateBack }>
          <Feather name="arrow-left" size={28} color="#7C8083" />
        </TouchableOpacity>
      </View>

      <View style={styles.job}>
        <Text style={[styles.jobProperty, { marginTop: 0 }]}>PRODUTOR:</Text>
        <Text style={styles.jobValue}>{job.name} de {job.city} - {job.uf} </Text>

        <Text style={styles.jobProperty}>JOB:</Text>
        <Text style={styles.jobValue}>{job.title}</Text>

        <Text style={styles.jobProperty}>VALOR:</Text>
        <Text style={styles.jobValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(job.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Vamos ao trabalho!</Text>
        <Text style={styles.heroTitle}>Mande um alô.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}