import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import BusMap from '../components/BusMap';
import ChildRow from '../components/ChildRow';
import { alerts, bus, children as initialChildren, notices } from '../data/children';
import { useLang } from '../i18n';
import { colors } from '../theme';

export default function ParentScreen() {
  const { t, lang, setLang } = useLang();
  const [children, setChildren] = useState(initialChildren);

  // "Not coming today" and its undo. Later this is also sent to the server,
  // so the driver's list shows the child as absent.
  const toggleAbsent = (id) => {
    setChildren((list) =>
      list.map((c) =>
        c.id === id ? { ...c, status: c.status === 'absent' ? 'wait' : 'absent' } : c
      )
    );
  };

  // Show the arrival time only while one of your children is still waiting.
  const someoneWaiting = children.some((c) => c.status === 'wait');

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[colors.navy, colors.navy2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {bus.plate} · {t.driver} {bus.driver}
            </Text>
          </View>
          <View style={styles.langSwitch}>
            {[
              ['en', 'EN'],
              ['hi', 'हिं'],
            ].map(([code, label]) => (
              <Pressable
                key={code}
                onPress={() => setLang(code)}
                style={[styles.langItem, lang === code && styles.langItemActive]}
              >
                <Text style={[styles.langText, lang === code && styles.langTextActive]}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 1. Map first, with the arrival time right under it */}
        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.panelTitle}>{t.busLocation}</Text>
            <View style={styles.live}>
              <Text style={styles.liveText}>{t.live}</Text>
            </View>
          </View>

          <View style={styles.mapWrap}>
            <BusMap busNumber={bus.number} />
          </View>

          {someoneWaiting && bus.eta ? (
            <View style={styles.etaRow}>
              <Text style={styles.iconLg}>⏱️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.etaTitle}>{t.etaTitle}</Text>
                <Text style={styles.etaText}>
                  {t.eta(bus.eta.stop, bus.eta.minutes, bus.eta.km)}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.legend}>
            <LegendItem color={colors.amber} label={t.busLegend(bus.number)} />
            <LegendItem color={colors.navy} label={t.school} />
            <LegendItem color={colors.teal} label={t.route} />
          </View>
        </View>

        {/* 2. Today's bus or driver changed */}
        {bus.changedToday ? (
          <View style={[styles.panel, styles.changePanel]}>
            <Text style={styles.icon}>🔄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.changeTitle}>{t.changeTitle}</Text>
              <Text style={styles.changeText}>{t.changeBody(bus.plate, bus.driver)}</Text>
            </View>
          </View>
        ) : null}

        {/* 3. Children */}
        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.panelTitle}>{t.yourChildren}</Text>
            <Text style={styles.count}>{t.students(children.length)}</Text>
          </View>

          {children.map((child) => (
            <ChildRow key={child.id} child={child} onToggleAbsent={toggleAbsent} />
          ))}

          <Pressable
            onPress={() => router.push('/history')}
            style={({ pressed }) => [styles.historyLink, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.icon}>📅</Text>
            <Text style={styles.historyText}>{t.viewHistory}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        {/* 4. Alerts (on the phone these will also arrive as notifications) */}
        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.panelTitle}>{t.alerts}</Text>
          </View>
          {alerts.map((a, i) => (
            <View key={a.id} style={[styles.listRow, i === alerts.length - 1 && styles.lastRow]}>
              <Text style={styles.icon}>🔔</Text>
              <Text style={styles.listText}>{t.alert(a)}</Text>
              <Text style={styles.listTime}>{a.at}</Text>
            </View>
          ))}
        </View>

        {/* 5. School notices */}
        <View style={styles.panel}>
          <View style={styles.panelHead}>
            <Text style={styles.panelTitle}>{t.notices}</Text>
          </View>
          {notices.map((n, i) => (
            <View key={n.id} style={[styles.listRow, i === notices.length - 1 && styles.lastRow]}>
              <Text style={styles.icon}>📢</Text>
              <Text style={styles.listText}>{n[lang] ?? n.en}</Text>
              <Text style={styles.listTime}>{n.date}</Text>
            </View>
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
    paddingTop: 58,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langSwitch: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    padding: 3,
  },
  langItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  langItemActive: {
    backgroundColor: '#fff',
  },
  langText: {
    color: '#ffffffcc',
    fontSize: 13,
    fontWeight: '700',
  },
  langTextActive: {
    color: colors.navy,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: '#ffffffcc',
    fontSize: 13,
    marginTop: 4,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 14,
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
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.tealSoft,
  },
  etaTitle: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '700',
  },
  etaText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  changePanel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: colors.amberSoft,
  },
  changeTitle: {
    color: colors.amberText,
    fontSize: 14,
    fontWeight: '700',
  },
  changeText: {
    color: colors.amberText,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 19,
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
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  listText: {
    flex: 1,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
  },
  listTime: {
    color: colors.muted,
    fontSize: 12,
  },
  historyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  historyText: {
    flex: 1,
    color: colors.navy2,
    fontSize: 14,
    fontWeight: '700',
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
  icon: {
    fontSize: 16,
  },
  iconLg: {
    fontSize: 22,
  },
  chevron: {
    color: colors.muted,
    fontSize: 22,
    lineHeight: 22,
  },
});
