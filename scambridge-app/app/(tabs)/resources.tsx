import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const translations = {
    en: {
    title: 'Helpful Resources',
    avoidScams: '🚫 How to Avoid Scams',
    avoidText: '• Never share personal or financial info over text or phone with unverified sources.\n• If it sounds too good to be true, it probably is.\n• Research companies before investing.',
    helplines: '📞 Helpline Numbers',
    helplineText: '• FTC Fraud Hotline: 1-877-382-4357\n• Elder Fraud Hotline: 1-833-372-8311',
    websites: '🌐 Trusted Websites',
    glossary: '📖 Glossary',
    glossaryText: '• Phishing: Fake messages trying to steal your info.\n• Ponzi Scheme: Fraud where returns are paid using new investors\' money.\n• Impersonation Scam: Scammers pretend to be someone you know or trust.'
  },
  es: {
    title: 'Recursos Útiles',
    avoidScams: '🚫 Cómo Evitar Estafas',
    avoidText: '• Nunca compartas información personal o financiera por texto o teléfono con fuentes no verificadas.\n• Si suena demasiado bueno para ser verdad, probablemente lo sea.\n• Investiga las empresas antes de invertir.',
    helplines: '📞 Números de Ayuda',
    helplineText: '• Línea directa de fraudes FTC: 1-877-382-4357\n• Línea directa para fraudes a personas mayores: 1-833-372-8311',
    websites: '🌐 Sitios Web Confiables',
    glossary: '📖 Glosario',
    glossaryText: '• Phishing: Mensajes falsos que intentan robar tu información.\n• Esquema Ponzi: Fraude donde los retornos se pagan con dinero de nuevos inversores.\n• Estafa de Suplantación: Estafadores que fingen ser alguien que conoces o en quien confías.'
  },
  fr: {
    title: 'Ressources Utiles',
    avoidScams: '🚫 Comment Éviter les Arnaques',
    avoidText: '• Ne partagez jamais d\'informations personnelles ou financières par message ou téléphone avec des sources non vérifiées.\n• Si cela semble trop beau pour être vrai, c\'est probablement le cas.\n• Faites des recherches sur les entreprises avant d\'investir.',
    helplines: '📞 Numéros d\'assistance',
    helplineText: '• Ligne d\'assistance contre la fraude FTC: 1-877-382-4357\n• Ligne d\'assistance pour les personnes âgées: 1-833-372-8311',
    websites: '🌐 Sites Fiables',
    glossary: '📖 Glossaire',
    glossaryText: '• Phishing: Faux messages visant à voler vos informations.\n• Schéma de Ponzi: Fraude où les rendements sont payés avec l\'argent de nouveaux investisseurs.\n• Arnaque d\'usurpation d\'identité: Les escrocs prétendent être quelqu\'un que vous connaissez ou en qui vous avez confiance.'
  },
  hi: {
    title: 'सहायक संसाधन',
    avoidScams: '🚫 धोखाधड़ी से कैसे बचें',
    avoidText: '• किसी भी अविश्वसनीय स्रोत को व्यक्तिगत या वित्तीय जानकारी न दें।\n• अगर कुछ बहुत अच्छा लग रहा है, तो वह शायद धोखाधड़ी है।\n• निवेश करने से पहले कंपनियों की जानकारी लें।',
    helplines: '📞 हेल्पलाइन नंबर',
    helplineText: '• FTC धोखाधड़ी हेल्पलाइन: 1-877-382-4357\n• वरिष्ठ नागरिक धोखाधड़ी हेल्पलाइन: 1-833-372-8311',
    websites: '🌐 भरोसेमंद वेबसाइटें',
    glossary: '📖 शब्दकोश',
    glossaryText: '• फ़िशिंग: आपकी जानकारी चुराने वाले नकली संदेश।\n• पोंज़ी योजना: जहां लाभ नए निवेशकों के पैसे से दिए जाते हैं।\n• पहचान की धोखाधड़ी: जब धोखेबाज़ किसी जानने वाले या भरोसेमंद व्यक्ति की नकल करते हैं।'
  },
  zh: {
    title: '实用资源',
    avoidScams: '🚫 如何避免诈骗',
    avoidText: '• 不要通过短信或电话向未验证的来源提供个人或财务信息。\n• 如果听起来好得不真实，那很可能是骗局。\n• 投资前请研究公司背景。',
    helplines: '📞 求助热线',
    helplineText: '• 美国联邦贸易委员会诈骗热线: 1-877-382-4357\n• 老年人诈骗热线: 1-833-372-8311',
    websites: '🌐 可信网站',
    glossary: '📖 术语表',
    glossaryText: '• 网络钓鱼: 试图窃取信息的假消息。\n• 庞氏骗局: 利用新投资者的钱支付回报的诈骗。\n• 冒充骗局: 骗子假冒你认识或信任的人。'
  },// keep all your translations object here as-is
};

export default function ResourcesScreen() {
  const { lang } = useLocalSearchParams();
  const router = useRouter();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{t.title}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.avoidScams}</Text>
        <Text style={styles.text}>{t.avoidText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.helplines}</Text>
        <Text style={styles.text}>{t.helplineText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.websites}</Text>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://consumer.ftc.gov/scams')}>
          <Text style={styles.linkText}>Visit FTC Scam Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.ic3.gov')}>
          <Text style={styles.linkText}>Visit FBI Internet Crime Center</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{t.glossary}</Text>
        <Text style={styles.text}>{t.glossaryText}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafa',
  },
  backButton: {
    backgroundColor: '#007C91',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007C91',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  linkButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#007C91',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
