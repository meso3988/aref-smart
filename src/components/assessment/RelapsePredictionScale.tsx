import React, { useState } from 'react';
import './RelapsePredictionScale.css';

const RelapsePredictionScale: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [alias, setAlias] = useState('');
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [showResult, setShowResult] = useState(false);

    const questions = [
        "هل تشعر بصعوبة في مقاومة الرغبة في العودة للتعاطي عند التفكير فيه؟",
        "هل تجد نفسك تفكر في التعاطي كحل للتغلب على التوتر أو الضغوط اليومية؟",
        "هل تعتقد أن لديك دوافع داخلية قوية للعودة للتعاطي رغم محاولاتك للإقلاع؟",
        "هل تشعر بأنك غير قادر على التحكم برغباتك عند رؤية أشخاص أو أماكن مرتبطة بالتعاطي؟",
        "هل تحس بأنك تميل للانسحاب من الأنشطة الاجتماعية الإيجابية بسبب رغبتك في التعاطي؟",
        "هل سبق أن عدت للتعاطي بعد فترة انقطاع قصيرة لأنك شعرت باليأس أو الإحباط؟",
        "هل تشعر أن الضغوط النفسية والحياتية تزيد من احتمالية عودتك للتعاطي؟",
        "هل تشعر بصعوبة في استخدام استراتيجيات بديلة للسيطرة على الرغبة بالتعاطي؟",
        "عند الشعور بالضيق العاطفي، هل تجد نفسك تميل للتفكير بالتعاطي كوسيلة للهروب؟",
        "هل تعتقد أنك ستواجه صعوبة كبيرة في مقاومة الانتكاسة بدون دعم خارجي؟"
    ];

    const handleAnswerChange = (answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [`q${currentStep + 1}`]: answer
        }));
    };

    const handleNext = () => {
        if (!answers[`q${currentStep + 1}`]) {
            alert("يرجى اختيار إجابة قبل المتابعة.");
            return;
        }

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const calculateResult = () => {
        const score = Object.values(answers).filter(answer => answer === 'yes').length;
        let resultText = '';

        if (score <= 2) {
            resultText = "الخطر منخفض، يُنصح بمواصلة اتباع الاستراتيجيات الإيجابية.";
        } else if (score <= 5) {
            resultText = "الخطر متوسط، قد تحتاج لدعم إضافي واستراتيجيات مقاومة الرغبات.";
        } else if (score <= 8) {
            resultText = "الخطر مرتفع، يُفضل استشارة مختص والحصول على دعم علاجي لمواجهة الانتكاسة.";
        } else {
            resultText = "الخطر مرتفع جداً، يُنصح بطلب المساعدة الفورية من مختص.";
        }

        const displayName = alias ? `يا ${alias}، ` : '';
        return `${displayName}نتيجتك: ${score}/10\n${resultText}`;
    };

    return (
        <div className="rps-container">
            <h1>مقياس توقعات الانتكاسة (RPS)</h1>
            <div className="intro">
                <p>يقيّم هذا المقياس العوامل النفسية والسلوكية التي قد تزيد من خطر الانتكاسة.</p>
                <p>يشمل أسئلة حول الدوافع، والتحكم في الرغبات، والضغوط النفسية.</p>
            </div>
            <p className="note">هذا التقييم للمساعدة الأولية، ولا يعتبر تشخيصاً نهائياً. يُنصح باستشارة مختص إذا أشارت النتائج لارتفاع الخطر.</p>

            <div className="container">
                {!showResult ? (
                    <>
                        <input
                            type="text"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            placeholder="أدخل اسماً مستعاراً (اختياري)"
                            className="alias-input"
                        />

                        <div className="question-step active">
                            <div className="question">
                                <p>{currentStep + 1}. {questions[currentStep]}</p>
                                <div className="options">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`q${currentStep + 1}`}
                                            value="yes"
                                            checked={answers[`q${currentStep + 1}`] === 'yes'}
                                            onChange={() => handleAnswerChange('yes')}
                                        />
                                        نعم
                                    </label>
                                    <br />
                                    <label>
                                        <input
                                            type="radio"
                                            name={`q${currentStep + 1}`}
                                            value="no"
                                            checked={answers[`q${currentStep + 1}`] === 'no'}
                                            onChange={() => handleAnswerChange('no')}
                                        />
                                        لا
                                    </label>
                                </div>
                            </div>
                            <button onClick={handleNext}>
                                {currentStep === questions.length - 1 ? 'عرض النتيجة' : 'التالي'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        {calculateResult().split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelapsePredictionScale;
