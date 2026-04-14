type Activity = 'grounding' | 'breathing' | 'video' | 'interactive' | 'creative' | 'pmr'

// interface CheckIn {
//   id: string;
//   timestamp: number; // unix ms
//   anxietyLevel: number;
//   answers: number[];
//   mode: Activity;
//   // activity: string; // конкретная техника
//   isNightMode: boolean;
//   durationMs?: number; // сколько провёл
// }
//
// interface CheckInResponse {
//   id: number
//   title: string
//   image?: string
//   description?: string
// }

type CheckinState = {
  currentResult: CheckInResult | null;
};
type CheckinActions = {
  setCurrentResult: (result: CheckInResult | null) => void;
}
type CheckinStore = CheckinState & CheckinActions

interface CheckInResult {
  level: number
  answers: number[];
  timestamp: number;
  variant: Activity
}

interface QuestionAnswer {
  id: number;
  title: string;
  value: number;
  image?: string;
  description?: string;
}

interface ModeScheme {
  [key: number]: Activity[]
}

interface MethodData {
  id: Activity;
  title: string;
  description: string;
  image?: string;
}

interface Step {
  step: number;
  stepNumber?: number;
  title: string;
  description?: string;
}
