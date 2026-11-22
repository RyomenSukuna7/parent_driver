import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { children, history } from '../data/children';
import { useLang } from '../i18n';
import { colors } from '../theme';

const firstName = (id) => children.find((c) => c.id === id)?.name.split(' ')[0] ?? '';

// ['7:41 am', '8:04 am'] -> "7:41 am → 8:04 am" (picked up → dropped)
const span = (pair) => (pair ? `${pair[0]} → ${pair[1]}` : '—');

export default function HistoryScreen() {
  const { t } = useLang();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[colors.navy, colors.navy2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
          <Text style={styles.backText}>‹ {t.back}</Text>
        </Pressable>
        <Text style={styles.title}>{t.history}</Text>
        <Text style={styles.subtitle}>{t.historySub}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll}>
        {history.map((day) => (
          <View key={day.date} style={styles.panel}>
            <View style={styles.panelHead}>
              <Text style={styles.panelTitle}>{day.date}</Text>
            </View>

            {day.trips.map((trip, i) => (
              <View
                key={trip.childId}
                style={[styles.row, i === day.trips.length - 1 && { borderBottomWidth: 0 }]}
              >
                <Text style={styles.child}>{firstName(trip.childId)}</Text>
                {trip.absent ? (
                  <Text style={styles.absent}>{t.absentDay}</Text>
                ) : (
                  <View style={styles.trips}>
                    <Text style={styles.trip}>
                      <Text style={styles.tripLabel}>{t.morning} </Text>
                      {span(trip.morning)}
                    </Text>
                    <Text style={styles.trip}>
                      <Text style={styles.tripLabel}>{t.afternoon} </Text>
                      {span(trip.afternoon)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 28 },
  back: { alignSelf: 'flex-start', marginBottom: 10 },
  backText: { color: '#ffffffcc', fontSize: 15, fontWeight: '700' },
  title: { color: '#fff', fontSize: 26, fontWeight: '800' },
  subtitle: { color: '#ffffffcc', fontSize: 14, marginTop: 6 },
  scroll: { padding: 16, paddingBottom: 32, gap: 16 },
  panel: {
    backgroundColor: colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: colors.navy,
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  panelHead: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  panelTitle: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  child: { width: 64, color: colors.ink, fontSize: 14, fontWeight: '700' },
  trips: { flex: 1, gap: 4 },
  trip: { color: colors.ink, fontSize: 13 },
  tripLabel: { color: colors.muted, fontWeight: '600' },
  absent: { flex: 1, color: colors.muted, fontSize: 13, fontStyle: 'italic' },
});
