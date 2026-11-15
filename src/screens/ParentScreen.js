import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import BusMap from '../components/BusMap';
import ChildRow from '../components/ChildRow';
import { bus, children } from '../data/children';
import { colors } from '../theme';

export default function ParentScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[colors.navy, colors.navy2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.eyebrow}>Parent</Text>
        <Text style={styles.title}>Bus tracker</Text>
        <Text style={styles.subtitle}>
          Bus {bus.number} · {bus.run} · Driver {bus.driver}
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Bus location */}
        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.panelTitle}>Bus location</Text>
            <View style={styles.live}>
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          <View style={styles.mapWrap}>
            <BusMap busNumber={bus.number} />
          </View>

          <View style={styles.legend}>
            <LegendItem color={colors.amber} label={`Bus ${bus.number}`} />
            <LegendItem color={colors.navy} label="School" />
            <LegendItem color={colors.teal} label="Route" />
          </View>
        </View>

        {/* Children */}
        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.panelTitle}>Your children</Text>
            <Text style={styles.count}>{children.length} students</Text>
          </View>

          {children.map((child) => (
            <ChildRow key={child.id} child={child} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function LegendItem({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  hero: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
  eyebrow: {
    color: '#ffffffbf',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: '#ffffffcc',
    fontSize: 14,
    marginTop: 8,
  },
scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
  panel: {
    backgroundColor: colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: colors.navy,
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    marginBottom: 16,
  },
  panelHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  panelTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  count: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  live: {
    backgroundColor: colors.tealSoft,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  liveText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '700',
  },
  mapWrap: {
    backgroundColor: '#eef3f8',
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: colors.muted,
    fontSize: 13,
  },
});