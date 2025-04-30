export const FeatureFlags = {
  DONATE_FEATURE: true, // Set to false to disable the donate feature
} as const;

export type FeatureFlagKey = keyof typeof FeatureFlags;

export const isFeatureEnabled = (feature: FeatureFlagKey): boolean => {
  return FeatureFlags[feature];
}; 