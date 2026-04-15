'use client';

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const languageDictionary: Record<string, any> = {
  en: {
    title: 'Scam Detector',
    placeholder: 'Paste your suspicious message here...',
    button: 'Check Message',
    resultPrefix: 'Result:',
    likely: 'This message is likely a scam.',
    unlikely: 'This message does not appear to be a scam.',
    back: 'Back',
    helpful: 'Was this helpful?',
    yes: 'Yes',
    no: 'No',
    submit: 'Submit Report',
    confirm: 'Report submitted. Thank you!'
  },
  es: {
    title: 'Detector de Estafas',
    placeholder: 'Pega tu mensaje sospechoso aquí...',
    button: 'Verificar Mensaje',
    resultPrefix: 'Resultado:',
    likely: 'Este mensaje probablemente sea una estafa.',
    unlikely: 'Este mensaje no parece ser una estafa.',
    back: 'Atrás',
    helpful: '¿Fue útil esto?',
    yes: 'Sí',
    no: 'No',
    submit: 'Enviar Informe',
    confirm: 'Informe enviado. ¡Gracias!'
  },
  fr: {
    title: 'Détecteur d’Arnaque',
    placeholder: 'Collez votre message suspect ici...',
    button: 'Vérifier le message',
    resultPrefix: 'Résultat :',
    likely: 'Ce message est probablement une arnaque.',
    unlikely: 'Ce message ne semble pas être une arnaque.',
    back: 'Retour',
    helpful: 'Est-ce utile ?',
    yes: 'Oui',
    no: 'Non',
    submit: 'Soumettre le rapport',
    confirm: 'Rapport soumis. Merci!'
  },
  hi: {
    title: 'धोखाधड़ी डिटेक्टर',
    placeholder: 'अपना संदिग्ध संदेश यहां पेस्ट करें...',
    button: 'संदेश जांचें',
    resultPrefix: 'परिणाम:',
    likely: 'यह संदेश संभवतः एक धोखाधड़ी है।',
    unlikely: 'यह संदेश धोखाधड़ी नहीं लगता।',
    back: 'वापस',
    helpful: 'क्या यह मददगार था?',
    yes: 'हाँ',
    no: 'नहीं',
    submit: 'रिपोर्ट सबमिट करें',
    confirm: 'रिपोर्ट सबमिट की गई। धन्यवाद!'
  },
  zh: {
    title: '诈骗检测器',
    placeholder: '在此粘贴您可疑的信息...',
    button: '检查信息',
    resultPrefix: '结果：',
    likely: '此消息很可能是诈骗。',
    unlikely: '此消息似乎不是诈骗。',
    back: '返回',
    helpful: '这有帮助吗？',
    yes: '是',
    no: '否',
    submit: '提交报告',
    confirm: '报告已提交。谢谢！'
  }
};

export default function ScamDetector() {
  const { lang } = useLocalSearchParams<{ lang: string }>();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const texts = languageDictionary[lang || 'en'] || languageDictionary['en'];

  const detectScam = async () => {
    try {
      const response = await fetch("http://192.168.0.201:3001/api/check-scam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setResult(data.result);
      setFeedback(null);
    } catch (error) {
      setResult("Error connecting to scam detection server.");
    }
  };

  const submitReport = () => {
    setModalVisible(true);
    setInput('');
    setResult(null);
    setFeedback(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{texts.back}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{texts.title}</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder={texts.placeholder}
        value={input}
        onChangeText={setInput}
      />
      <Button title={texts.button} onPress={detectScam} color="#007C91" />
      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.result}>{texts.resultPrefix} {result}</Text>
          <Text style={styles.feedbackPrompt}>{texts.helpful}</Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity style={styles.feedbackButton} onPress={() => setFeedback('yes')}>
              <Text style={styles.feedbackText}>{texts.yes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feedbackButton} onPress={() => setFeedback('no')}>
              <Text style={styles.feedbackText}>{texts.no}</Text>
            </TouchableOpacity>
          </View>
          {feedback && <Text style={styles.thankYou}>Thank you for your feedback!</Text>}
          <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
            <Text style={styles.submitText}>{texts.submit}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{texts.confirm}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  backButton: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  input: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f1f9fa',
  },
  result: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  feedbackPrompt: {
    fontSize: 16,
    marginBottom: 8,
    color: '#004d4d',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  feedbackButton: {
    backgroundColor: '#007C91',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  feedbackText: {
    color: '#fff',
    fontSize: 16,
  },
  thankYou: {
    marginTop: 12,
    color: '#007C91',
    fontStyle: 'italic',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#007C91',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
