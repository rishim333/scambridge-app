import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Logo from "../assets/images/logo.png"; // Adjust if needed

export default function LandingScreen() {
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "zh", label: "中文 (Mandarin)" },
    { code: "fr", label: "Français (French)" },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#f0f9fb",
      }}
    >
      <Image
        source={Logo}
        style={{ width: 240, height: 100, marginBottom: 24 }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 16, marginBottom: 12, color: "#004d4d" }}>
        Welcome! Please select your language:
      </Text>

      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={{ pathname: "/home", params: { lang: lang.code } }}
          asChild
        >
          <Button
            mode="contained"
            style={{
              marginBottom: 8,
              width: 200,
              backgroundColor: "#007C91",
              borderRadius: 8,
            }}
            labelStyle={{ color: "white" }}
          >
            {lang.label}
          </Button>
        </Link>
      ))}
    </View>
  );
}
