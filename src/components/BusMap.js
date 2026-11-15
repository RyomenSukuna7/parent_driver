import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Rect, Line, Path, Circle, Text as SvgText } from 'react-native-svg';
import { colors } from '../theme';

// Same coordinates as the HTML design (viewBox 0 0 600 380)
const VB_W = 600;
const VB_H = 380;
const WIDTH = Dimensions.get('window').width - 32;
const SCALE = WIDTH / VB_W;
const HEIGHT = VB_H * SCALE;
const BUS_SIZE = 32;

const ROUTE = [
  [60, 320],
  [160, 320],
  [160, 200],
  [320, 200],
  [320, 110],
  [470, 110],
  [470, 60],
];
const ROUTE_D =
  'M 60 320 L 160 320 L 160 200 L 320 200 L 320 110 L 470 110 L 470 60';

export default function BusMap({ busNumber }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 18000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  // Spread the corner points evenly across the 0..1 animation range
  const inputRange = ROUTE.map((_, i) => i / (ROUTE.length - 1));

  const busX = progress.interpolate({
    inputRange,
    outputRange: ROUTE.map(([x]) => (x - BUS_SIZE / 2) * SCALE),
  });
  const busY = progress.interpolate({
    inputRange,
    outputRange: ROUTE.map(([, y]) => (y - BUS_SIZE / 2) * SCALE),
  });

  return (
    <View style={{ width: WIDTH, height: HEIGHT }}>
      <Svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${VB_W} ${VB_H}`}>
        {/* Park */}
        <Rect x="400" y="230" width="150" height="90" rx="10" fill="#d9ecd9" />
        <SvgText x="475" y="282" textAnchor="middle" fontSize="12" fill="#5b7f5b">
          Park
        </SvgText>

        {/* Streets */}
        <Line x1="0" y1="320" x2="600" y2="320" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <Line x1="160" y1="0" x2="160" y2="380" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <Line x1="320" y1="0" x2="320" y2="380" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <Line x1="470" y1="0" x2="470" y2="380" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <Line x1="0" y1="200" x2="600" y2="200" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <Line x1="0" y1="110" x2="600" y2="110" stroke="#fff" strokeWidth="14" strokeLinecap="round" />

        {/* Route */}
        <Path
          d={ROUTE_D}
          fill="none"
          stroke={colors.teal}
          strokeWidth="4"
          strokeDasharray={[10, 8]}
          strokeLinecap="round"
        />

        {/* Stops */}
        <Circle cx="60" cy="320" r="7" fill="#fff" stroke={colors.navy} strokeWidth="3" />
        <Circle cx="160" cy="200" r="7" fill="#fff" stroke={colors.navy} strokeWidth="3" />
        <Circle cx="320" cy="110" r="7" fill="#fff" stroke={colors.navy} strokeWidth="3" />

        <SvgText x="60" y="345" textAnchor="middle" fontSize="12" fontWeight="700" fill={colors.ink}>
          Aarav
        </SvgText>
        <SvgText x="172" y="190" fontSize="12" fontWeight="700" fill={colors.ink}>
          Maya
        </SvgText>

        {/* School */}
        <Rect x="446" y="36" width="48" height="36" rx="8" fill={colors.navy} />
        <SvgText x="470" y="59" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
          School
        </SvgText>
      </Svg>

      {/* Moving bus, positioned over the map */}
      <Animated.View
        style={[
          styles.bus,
          { transform: [{ translateX: busX }, { translateY: busY }] },
        ]}
      >
        <Text style={styles.busText}>{busNumber}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bus: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BUS_SIZE,
    height: BUS_SIZE,
    borderRadius: BUS_SIZE / 2,
    backgroundColor: colors.amber,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  busText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '800',
  },
});