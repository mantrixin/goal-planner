import { Smile, Meh, Frown, AlertCircle, Star, Zap, Heart, Target, Cloud } from 'lucide-react';

export const MOOD_DATA = {
  happy: { color: 'bg-emerald-500', icon: Smile },
  calm: { color: 'bg-sky-400', icon: Cloud },
  neutral: { color: 'bg-gray-400', icon: Meh },
  sad: { color: 'bg-red-400', icon: Frown },
  anxious: { color: 'bg-amber-400', icon: AlertCircle },
  excited: { color: 'bg-yellow-400', icon: Star },
  tired: { color: 'bg-indigo-400', icon: Zap },
  angry: { color: 'bg-orange-600', icon: Frown },
  grateful: { color: 'bg-pink-400', icon: Heart },
  focused: { color: 'bg-blue-600', icon: Target },
};
