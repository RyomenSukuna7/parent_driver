import { Stack } from 'expo-router';
import { LangProvider } from '../i18n';

export default function RootLayout() {
  return (
    <LangProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LangProvider>
  );
}
