import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLang } from '../i18n';
import { colors } from '../theme';

const STATUS_STYLE = {
  wait: { bg: colors.waitBg, text: colors.navy2 },
  onbus: { bg: colors.amberSoft, text: colors.amberText },
  atschool: { bg: colors.tealSoft, text: colors.teal },
  home: { bg: colors.tealSoft, text: colors.teal },
  absent: { bg: '#f1f5f9', text: colors.muted },
  unknown: { bg: '#f1f5f9', text: colors.muted },
};

export default function ChildRow({ child, onToggleAbsent }) {
  const { t } = useLang();
  const initials = child.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  const key = STATUS_STYLE[child.status] ? child.status : 'unknown';
  const style = STATUS_STYLE[key];

  // When it happened, e.g. "Picked up at 7:42 am".
  const time = child.droppedAt
    ? t.droppedAt(child.droppedAt)
    : child.pickedAt
      ? t.pickedAt(child.pickedAt)
      : null;

  // "Not coming today" only makes sense before the child is picked up.
  const canMarkAbsent = child.status === 'wait' || child.status === 'absent';
  const isAbsent = child.status === 'absent';

  const askToggle = () => {
    Alert.alert(
      isAbsent ? t.confirmComing(child.name) : t.confirmAbsent(child.name),
      isAbsent ? t.confirmComingBody : t.confirmAbsentBody,
      [
        { text: t.cancel, style: 'cancel' },
        { text: t.confirm, onPress: () => onToggleAbsent(child.id) },
      ]
    );
  };

  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{child.name}</Text>
          <Text style={styles.meta} numberOfLines={1}>
            {child.grade} · {child.stop}
          </Text>
          {time ? <Text style={styles.time}>{time}</Text> : null}
        </View>

        <View style={[styles.status, { backgroundColor: style.bg }]}>
          <Text style={[styles.statusText, { color: style.text }]} numberOfLines={1}>
            {t.status[key]}
          </Text>
        </View>
      </View>

      {canMarkAbsent ? (
        <Pressable
          onPress={askToggle}
          style={({ pressed }) => [styles.absentBtn, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.absentBtnText}>
            {isAbsent ? t.comingAfterAll : t.notComing}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    gap: 12,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
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
  time: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  status: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexShrink: 1,
    maxWidth: 140,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  absentBtn: {
    alignSelf: 'flex-start',
    marginLeft: 60,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  absentBtnText: {
    color: colors.navy2,
    fontSize: 13,
    fontWeight: '700',
  },
});
