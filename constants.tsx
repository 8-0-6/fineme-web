import React from 'react';
import { Heart, Globe, Droplets, Stethoscope } from 'lucide-react';
import { Charity, CharityId } from './types';

export const CHARITIES: Charity[] = [
  {
    id: CharityId.RED_CROSS,
    name: "Red Cross",
    description: "Emergency assistance & disaster relief.",
    icon: "Heart"
  },
  {
    id: CharityId.WWF,
    name: "WWF",
    description: "Wilderness preservation & ecology.",
    icon: "Globe"
  },
  {
    id: CharityId.MSF,
    name: "Doctors Without Borders",
    description: "Medical aid in conflict zones.",
    icon: "Stethoscope"
  },
  {
    id: CharityId.WATER_ORG,
    name: "Water.org",
    description: "Safe water & sanitation access.",
    icon: "Droplets"
  }
];

export const MIN_REPS = 20;
export const MIN_STAKE = 10;
export const DEFAULT_REPS = 25;
