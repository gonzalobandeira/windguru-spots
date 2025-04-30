export const FeatureFlags = {
  DONATE_FEATURE: false, // Set to false to disable the donate feature
} as const;

export type FeatureFlagKey = keyof typeof FeatureFlags;

export const isFeatureEnabled = (feature: FeatureFlagKey): boolean => {
  return FeatureFlags[feature];
}; 