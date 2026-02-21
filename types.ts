export enum CharityId {
  RED_CROSS = 'RED_CROSS',
  WWF = 'WWF',
  MSF = 'MSF', // Doctors Without Borders
  WATER_ORG = 'WATER_ORG'
}

export interface Charity {
  id: CharityId;
  name: string;
  description: string;
  icon: string;
}

export interface UserConfig {
  name: string;
  reps: number;
  charity: CharityId | null;
  stakeAmount: number;
  streakMode: boolean;
  referralSource?: string;
}

export interface OnboardingStepProps {
  config: UserConfig;
  updateConfig: (updates: Partial<UserConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

// New Types for Dashboard
export type AppView = 'ONBOARDING' | 'DASHBOARD' | 'WORKOUT';
export type DashboardTab = 'HOME' | 'STATS' | 'SETTINGS';

export interface DailyLog {
  date: string;
  repsCompleted: number;
  targetReps: number;
  status: 'SECURED' | 'FAILED';
  amount?: number;
}
