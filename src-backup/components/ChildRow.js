import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

const STATUS = {
  onbus: { label: 'On the bus', bg: colors.amberSoft, text: colors.amberText },
  wait: { label: 'Waiting at stop', bg: colors.waitBg, text: colors.navy2 },
  home: { label: 'Dropped at home', bg: colors.tealSoft, text: colors.teal },
};

export default function ChildRow({ child }) {
  const initials = child.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  const status = STATUS[child.status];

  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{child.name}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {child.grade} · {child.stop}
        </Text>
      </View>

      <View style={[styles.status, { backgroundColor: status.bg }]}>
        <Text style={[styles.statusText, { color: status.text }]}>{status.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.navy2,
    fontWeight: '800',
    fontSize: 15,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  status: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
}); 