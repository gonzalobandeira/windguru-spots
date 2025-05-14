export const FeatureFlags = {
  ForecastSharing: {
    enabled: true,
    description: 'Whether forecast sharing is enabled or not',
  },
} as const;

export type FeatureFlagKey = keyof typeof FeatureFlags;

export const isFeatureEnabled = (feature: FeatureFlagKey): boolean => {
  return FeatureFlags[feature].enabled;
}; 