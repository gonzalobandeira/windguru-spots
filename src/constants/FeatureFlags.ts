type FeatureFlag = {
  enabled: boolean;
  description: string;
};

export const FeatureFlags: Record<string, FeatureFlag> = {
} as const;

export type FeatureFlagKey = keyof typeof FeatureFlags;

export const isFeatureEnabled = (feature: FeatureFlagKey): boolean => {
  return FeatureFlags[feature].enabled;
}; 