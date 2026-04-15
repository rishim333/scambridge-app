'use client';

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ReportScam() {
  const { lang } = useLocalSearchParams();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const submitReport = () => {
    setModalVisible(true);
    setInput('');
  };

  const getText = (key: string) => {
    const dict: any = {
      en: {
        title: 'Report a Scam',
        placeholder: 'Describe the scam or paste the message',
        submit: 'Submit Report',
        back: 'Back',
        confirm: 'Report submitted. Thank you!'
      },
      es: {
        title: 'Reportar una Estafa',
        placeholder: 'Describe la estafa o pega el mensaje',
        submit: 'Enviar Informe',
        back: 'Atrás',
        confirm: 'Informe enviado. ¡Gracias!'
      },
      hi: {
        title: 'धोखाधड़ी की रिपोर्ट करें',
        placeholder: 'धोखाधड़ी का विवरण दें या संदेश पेस्ट करें',
        submit: 'रिपोर्ट भेजें',
        back: 'वापस',
        confirm: 'रिपोर्ट भेज दी गई है। धन्यवाद!'
      },
    };
    return dict[lang as string]?.[key] || dict.en[key];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{getText('title')}</Text>

      <TextInput
        style={styles.input}
        placeholder={getText('placeholder')}
        multiline
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={styles.button} onPress={submitReport}>
        <Text style={styles.buttonText}>{getText('submit')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{getText('back')}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{getText('confirm')}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004d4d',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007C91',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007C91',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    color: '#004d4d',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007C91',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
