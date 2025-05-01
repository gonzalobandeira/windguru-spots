export const FeatureFlags = {
} as const;

export type FeatureFlagKey = keyof typeof FeatureFlags;

export const isFeatureEnabled = (feature: FeatureFlagKey): boolean => {
  return FeatureFlags[feature];
}; 