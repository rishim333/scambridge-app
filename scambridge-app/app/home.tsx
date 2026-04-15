






import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Logo from '../assets/images/logo.png'; // Make sure this path is correct

const translations = {
  en: {
    title: "Select a Function",
    report: "Report a Scam",
    info: "Scam Information",
    detector: "Scam Detector",
  },
  es: {
    title: "Selecciona una función",
    report: "Reportar una estafa",
    info: "Información de estafas",
    detector: "Detector de estafas",
  },
  hi: {
    title: "एक फ़ंक्शन चुनें",
    report: "धोखाधड़ी की रिपोर्ट करें",
    info: "धोखाधड़ी की जानकारी",
    detector: "धोखाधड़ी डिटेक्टर",
  },
  zh: {
    title: "选择一个功能",
    report: "举报诈骗",
    info: "诈骗信息",
    detector: "诈骗检测器",
  },
  fr: {
    title: "Sélectionnez une fonction",
    report: "Signaler une arnaque",
    info: "Informations sur les arnaques",
    detector: "Détecteur d'arnaque",
  },
};

export default function HomeScreen() {
  const { lang } = useLocalSearchParams();
  const router = useRouter();
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>{t.title}</Text>

      <Button
        icon={() => <Ionicons name="alert-circle-outline" size={20} color="white" />}
        mode="contained"
        style={styles.button}
        buttonColor="#007C91"
        onPress={() => router.push({ pathname: "/(tabs)/ReportScam", params: { lang } })}
      >
        {t.report}
      </Button>

      <Button
        icon={() => <Ionicons name="information-circle-outline" size={20} color="white" />}
        mode="contained"
        style={styles.button}
        buttonColor="#007C91"
        onPress={() => router.push({ pathname: "/(tabs)/resources", params: { lang } })}
      >
        {t.info}
      </Button>

      <Button
        icon={() => <Ionicons name="search-circle-outline" size={20} color="white" />}
        mode="contained"
        style={styles.button}
        buttonColor="#007C91"
        onPress={() => router.push({ pathname: "/(tabs)/ScamDetector", params: { lang } })}
      >
        {t.detector}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333333",
    textAlign: "center",
  },
  button: {
    marginBottom: 16,
    width: 260,
    borderRadius: 12,
  },
});
