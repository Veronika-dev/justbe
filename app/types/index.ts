type Activity = 'grounding' | 'breathing' | 'video' | 'interactive' | 'creative' | 'pmr'

// Check stress level
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
  width?: number;
  height?: number;
  thoughtPace?: 1 | 2 | 3 | 4 | 5;
}

interface QuestionCheckin {
  id: string;
  question: string;
  answers: QuestionAnswer[];
}

interface ModeScheme {
  [key: number]: Activity[]
}

// Methods
interface MethodData {
  id: Activity;
  title: string;
  description: string;
  image?: string;
}

// Grounding
interface Step {
  step: number;
  stepNumber?: number;
  title: string;
  description?: string;
}

interface ChooseItem<T> {
  id: T;
  title: string;
}

// Breathing
type BreathingStep = 'inhale' | 'exhale' | 'hold' | 'hold1' | 'hold2'
type BreatingType = 'box' | '478'

// Interactive
type InteractiveType = 'sand' | 'lines'
