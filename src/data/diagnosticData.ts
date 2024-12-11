// Existing disorders data
export const disorders = {
  "الاكتئاب": ["depressedMood", "lossOfInterest", "guilt", "insomnia", "fatigue", "concentrationDifficulty", "suicidalThoughts"],
  "القلق العام": ["anxiety", "restlessness", "fatigue", "concentrationDifficulty", "irritability", "muscleTension", "sleepDisturbance"],
  "اضطراب ما بعد الصدمة (PTSD)": ["flashbacks", "avoidance", "negativeMood", "hyperarousal"],
  "ثنائي القطب": ["mania", "depressedMood"],
  "اضطراب الشخصية الحدية": ["unstableRelationships", "impulsivity", "emotionalInstability", "fearOfAbandonment", "identityDisturbance"],
  "اضطراب الوسواس القهري (OCD)": ["obsessions", "compulsions"],
  "الفصام": ["delusions", "hallucinations", "disorganizedSpeech", "negativeSymptoms"],
  "اضطراب الشخصية الإجرامية": ["disregardForRights", "deceitfulness", "impulsivity", "aggression"],
  "اضطراب الهلع": ["panicAttacks", "persistentConcern", "agoraphobia"],
  "رهاب اجتماعي": ["socialAnxiety", "fearOfJudgment"],
  "اضطرابات الأكل": ["preoccupationWithWeight", "restrictiveEating", "bingeEating", "purging"],
  "اضطراب نقص الانتباه مع فرط النشاط (ADHD)": ["inattention", "hyperactivity", "impulsivity"]
};

export const symptomsList = [
  { id: "depressedMood", question: "هل تعاني من مزاج منخفض/حزن مستمر؟" },
  { id: "lossOfInterest", question: "هل فقدت المتعة في الأنشطة التي كنت تستمتع بها سابقاً؟" },
  { id: "guilt", question: "هل تشعر بالذنب أو انعدام القيمة؟" },
  { id: "insomnia", question: "هل تعاني من أرق أو صعوبة بالنوم؟" },
  { id: "fatigue", question: "هل تشعر بالتعب أو فقدان الطاقة بشكل مستمر؟" },
  { id: "concentrationDifficulty", question: "هل تواجه صعوبة في التركيز أو اتخاذ القرارات؟" },
  { id: "suicidalThoughts", question: "هل تراودك أفكار انتحارية؟" },
  { id: "anxiety", question: "هل تشعر بقلق مستمر أو توتر دائم؟" },
  { id: "restlessness", question: "هل تشعر بالاضطراب أو عدم القدرة على الجلوس ساكناً؟" },
  { id: "irritability", question: "هل تشعر بالتهيج أو العصبية بشكل متكرر؟" },
  { id: "muscleTension", question: "هل تشعر بتوتر عضلي مستمر؟" },
  { id: "sleepDisturbance", question: "هل تعاني من اضطرابات في النوم؟" },
  { id: "flashbacks", question: "هل تراودك ذكريات مؤلمة أو كوابيس متكررة تتعلق بتجربة سابقة؟" },
  { id: "avoidance", question: "هل بدأت تتجنب مواقف أو أشخاصاً تذكرك بتجربة صادمة؟" },
  { id: "negativeMood", question: "هل تشعر بتغيرات سلبية في مزاجك مثل الشعور باليأس أو الانعزال؟" },
  { id: "hyperarousal", question: "هل تشعر بيقظة مفرطة أو توتر دائم دون سبب واضح؟" },
  { id: "mania", question: "هل تشعر بفترات من النشاط المفرط أو المزاج المرتفع بشكل غير طبيعي؟" },
  { id: "unstableRelationships", question: "هل تعاني من علاقات غير مستقرة أو متوترة باستمرار؟" },
  { id: "impulsivity", question: "هل تتصرف باندفاعية أو تتخذ قرارات سريعة دون تفكير؟" },
  { id: "emotionalInstability", question: "هل تواجه تقلبات مزاجية حادة وسريعة؟" },
  { id: "fearOfAbandonment", question: "هل تخاف من الهجر أو الانفصال عن الأشخاص المقربين؟" },
  { id: "identityDisturbance", question: "هل تشعر بعدم وضوح في هويتك أو في رؤيتك لنفسك؟" },
  { id: "obsessions", question: "هل تعاني من أفكار متكررة وغير مرغوب فيها (وسواسية)؟" },
  { id: "compulsions", question: "هل تقوم بسلوكيات متكررة أو طقوسية (قهرية) للتخفيف من التوتر الناتج عن الأفكار الوسواسية؟" },
  { id: "delusions", question: "هل تعاني من أوهام أو معتقدات غير واقعية تتعارض مع الواقع؟" },
  { id: "hallucinations", question: "هل ترى أو تسمع أشياء غير موجودة في الواقع (هلوسات)؟" },
  { id: "disorganizedSpeech", question: "هل تواجه صعوبة في تنظيم أفكارك أو حديثك بشكل منطقي؟" },
  { id: "negativeSymptoms", question: "هل تعاني من نقص في التعبير العاطفي أو في دافعية الأنشطة اليومية؟" },
  { id: "disregardForRights", question: "هل تتجاهل حقوق الآخرين أو تسخر منها؟" },
  { id: "deceitfulness", question: "هل تكذب أو تخدع الآخرين بشكل متكرر؟" },
  { id: "aggression", question: "هل تظهر سلوكيات عدوانية أو عدوان؟" },
  { id: "panicAttacks", question: "هل تعاني من نوبات هلع متكررة ومفاجئة؟" },
  { id: "persistentConcern", question: "هل تخاف باستمرار من حدوث نوبات هلع أخرى؟" },
  { id: "agoraphobia", question: "هل تخاف من الأماكن أو المواقف التي قد يكون من الصعب عليك الخروج منها أثناء نوبة هلع؟" },
  { id: "socialAnxiety", question: "هل تشعر بخوف شديد من المواقف الاجتماعية أو من الحكم عليك من قبل الآخرين؟" },
  { id: "preoccupationWithWeight", question: "هل تشغل بالك الوزن أو شكل الجسم بشكل مفرط؟" },
  { id: "restrictiveEating", question: "هل تقيد تناولك للطعام بشكل مفرط أو تتجنب أنواع معينة منه؟" },
  { id: "bingeEating", question: "هل تقوم بفترات من تناول كميات كبيرة من الطعام بشكل غير طبيعي؟" },
  { id: "purging", question: "هل تقوم بتصرفات لإفراغ ما تناولته من الطعام مثل القيء أو استخدام المسهلات؟" },
  { id: "inattention", question: "هل تواجه صعوبة في الانتباه أو التركيز لفترات طويلة؟" },
  { id: "hyperactivity", question: "هل تشعر بنشاط مفرط أو صعوبة في البقاء جالساً ساكناً؟" }
];

// New substance addiction data
interface SubstanceType {
  name: string;
  symptoms: { id: string; question: string; }[];
}

export const substances: { [key: string]: SubstanceType } = {
  alcohol: {
    name: "الكحول",
    symptoms: [
      { id: "lossOfControl", question: "هل تواجه صعوبة في التحكم في تناول المادة؟" },
      { id: "tolerance", question: "هل تحتاج لكميات أكبر للحصول على نفس التأثير؟" },
      { id: "withdrawal", question: "هل تعاني من أعراض انسحاب عند التوقف؟" },
      { id: "neglectDuties", question: "هل أهملت واجباتك بسبب تناول المادة؟" },
      { id: "socialImpact", question: "هل أثرت المادة على علاقاتك الاجتماعية؟" }
    ]
  },
  opioids: {
    name: "المخدرات الأفيونية",
    symptoms: [
      { id: "euphoria", question: "هل تشعر بنشوة شديدة عند تناول المادة؟" },
      { id: "painRelief", question: "هل تستخدم المادة لتخفيف الألم؟" },
      { id: "withdrawalPain", question: "هل تعاني من آلام جسدية عند التوقف؟" },
      { id: "craving", question: "هل تشعر برغبة قوية في تناول المادة؟" },
      { id: "tolerance", question: "هل تحتاج لزيادة الجرعة مع الوقت؟" }
    ]
  },
  stimulants: {
    name: "المنشطات",
    symptoms: [
      { id: "increasedEnergy", question: "هل تشعر بزيادة في الطاقة والنشاط؟" },
      { id: "decreasedAppetite", question: "هل قل شهيتك للطعام؟" },
      { id: "insomnia", question: "هل تعاني من صعوبة في النوم؟" },
      { id: "anxiety", question: "هل تشعر بقلق أو توتر شديد؟" },
      { id: "paranoia", question: "هل تشعر بشك أو خوف غير مبرر؟" }
    ]
  },
  sedatives: {
    name: "المهدئات",
    symptoms: [
      { id: "drowsiness", question: "هل تشعر بنعاس شديد؟" },
      { id: "confusion", question: "هل تعاني من تشوش في التفكير؟" },
      { id: "memoryIssues", question: "هل تواجه مشاكل في الذاكرة؟" },
      { id: "coordination", question: "هل تعاني من ضعف في التناسق الحركي؟" },
      { id: "dependence", question: "هل تشعر باعتماد نفسي على المادة؟" }
    ]
  }
};

export const substanceCategories = [
  {
    id: "physical",
    name: "الأعراض الجسدية",
    description: "الأعراض التي تظهر على الجسم"
  },
  {
    id: "behavioral",
    name: "الأعراض السلوكية",
    description: "التغيرات في السلوك والتصرفات"
  },
  {
    id: "psychological",
    name: "الأعراض النفسية",
    description: "التأثيرات على الحالة النفسية"
  },
  {
    id: "social",
    name: "الأعراض الاجتماعية",
    description: "التأثيرات على العلاقات والحياة الاجتماعية"
  }
];
