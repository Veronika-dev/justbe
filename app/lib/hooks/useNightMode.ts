const modeMap: ModeScheme = {
  5: ['video'],                          // очень высокая → только видео
  4: ['breathing', 'video'],             // высокая → дыхание или видео
  3: ['breathing', 'grounding', 'pmr'],  // средняя → дыхание, заземление, PMR
  2: ['grounding', 'interactive'],       // лёгкая → заземление, интерактив
  1: ['interactive', 'creative'],        // низкая → творческое, интерактив
};

// Ночной режим (22:00–6:00)
const nightModeMap: ModeScheme = {
  5: ['video'],
  4: ['pmr', 'video'],
  3: ['pmr', 'breathing'],
  2: ['breathing', 'pmr'],
  1: ['breathing'],
};

export function useNightMode() {
  let isNightMode = false;
  const time = new Date().getHours();
  if (time >= 22 || time <= 6) {
    isNightMode = true;
  }
  return {
    isNightMode,
    modeScheme: isNightMode ? nightModeMap : modeMap,
  }
}
