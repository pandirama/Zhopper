module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? {'react-native-flipper': {platforms: {ios: null}}}
      : {}),
  },
  project: {
    ios: {
      unstable_reactLegacyComponentNames: [
        'AIRMap',
        'AIRMapCallout',
        'AIRMapCalloutSubview',
        'AIRMapCircle',
        'AIRMapHeatmap',
        'AIRMapLocalTile',
        'AIRMapMarker',
        'AIRMapOverlay',
        'AIRMapPolygon',
        'AIRMapPolyline',
        'AIRMapUrlTile',
        'AIRMapWMSTile',
      ],
    },
    android: {
      unstable_reactLegacyComponentNames: [
        'AIRMap',
        'AIRMapCallout',
        'AIRMapCalloutSubview',
        'AIRMapCircle',
        'AIRMapHeatmap',
        'AIRMapLocalTile',
        'AIRMapMarker',
        'AIRMapOverlay',
        'AIRMapPolygon',
        'AIRMapPolyline',
        'AIRMapUrlTile',
        'AIRMapWMSTile',
      ],
    }, // grouped into "project"
  },
  assets: ['./assets/fonts'], // stays the same
};
