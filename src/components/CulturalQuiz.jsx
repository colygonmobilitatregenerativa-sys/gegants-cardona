import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Share2, Award, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CulturalQuiz() {
  const { t, lang } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  const questions = [
    {
      id: 0,
      text: {
        ca: 'En una festa o cercavila de Cardona, on et trobem habitualment?',
        es: 'En una fiesta o pasacalles de Cardona, ¿dónde sueles estar?',
        en: 'During a traditional festival in Cardona, where can people find you?'
      },
      options: [
        { label: { ca: 'Presidint el ball solemne amb respecte i orgull per la tradició', es: 'Presidiendo el baile solemne con respeto y orgullo por la tradición', en: 'Leading the solemn dance with pride and respect for heritage' }, type: 'borrell' },
        { label: { ca: 'Gaudiant de l\'ambient elegant i la música de gralles', es: 'Disfrutando del ambiente elegante y la música tradicional', en: 'Enjoying the elegant atmosphere and folk music' }, type: 'letgarda' },
        { label: { ca: 'Buscant l\'aventura i lluitant per allò que estimes amb passió', es: 'Buscando la aventura y luchando por lo que amas con pasión', en: 'Seeking romance and adventure, fighting for what you love' }, type: 'abdalla' },
        { label: { ca: 'Observant la vila des del punt més alt del castell sota els estels', es: 'Observando el pueblo desde lo más alto del castillo bajo las estrellas', en: 'Gazing at the village from the highest tower under the stars' }, type: 'adalgisa' },
        { label: { ca: 'Fent riure els nens, saltant i fent bromes a tothom', es: 'Haciendo reír a los niños, corriendo y bromeando con la gente', en: 'Making kids laugh, running around and bringing pure mischief' }, type: 'nan' }
      ]
    },
    {
      id: 1,
      text: {
        ca: 'Quin és el teu racó predilecte de la vila de Cardona?',
        es: '¿Cuál es tu rincón predilecto de la villa de Cardona?',
        en: 'What is your favourite spot in the town of Cardona?'
      },
      options: [
        { label: { ca: 'L\'Església de Sant Vicenç del Castell i el pati d\'armes', es: 'La Iglesia románica de San Vicente y el patio de armas', en: 'The Romanesque Church of Sant Vicenç and castle courtyard' }, type: 'borrell' },
        { label: { ca: 'Els porxos de la Plaça del Mercat en ple dia de fira', es: 'Los pórticos de la Plaza del Mercado en día de feria', en: 'The medieval arcades of the Market Square on fair day' }, type: 'letgarda' },
        { label: { ca: 'El camí secret que creua la vall fins a les muralles', es: 'El camino secreto que cruza el valle hasta las murallas', en: 'The scenic pathway crossing the valley up to the walls' }, type: 'abdalla' },
        { label: { ca: 'La finestra circular de la Torre de la Minyona', es: 'La ventana circular de la Torre de la Minyona', en: 'The circular window of the Minyona Tower' }, type: 'adalgisa' },
        { label: { ca: 'La Plaça de la Fira en ple enrenou de festa major', es: 'La Plaza de la Fira en pleno bullicio festivo', en: 'The crowded main square during peak festival celebration' }, type: 'nan' }
      ]
    },
    {
      id: 2,
      text: {
        ca: 'Quin tret de caràcter et descriu millor?',
        es: '¿Qué rasgo de carácter te define mejor?',
        en: 'Which personality trait describes you best?'
      },
      options: [
        { label: { ca: 'Lideratge, fermesa i sentit del deure', es: 'Liderazgo, firmeza y sentido del deber', en: 'Leadership, determination, and duty' }, type: 'borrell' },
        { label: { ca: 'Dignitat, saviesa i generositat', es: 'Dignidad, sabiduría y generosidad', en: 'Grace, wisdom, and warmth' }, type: 'letgarda' },
        { label: { ca: 'Valenta indomable i esperit aventurer', es: 'Valentía indomable y espíritu aventurero', en: 'Fearless bravery and passionate heart' }, type: 'abdalla' },
        { label: { ca: 'Sensibilitat artística i fidelitat als teus ideals', es: 'Sensibilidad artística y fidelidad a tus ideales', en: 'Artistic sensibility and deep romanticism' }, type: 'adalgisa' },
        { label: { ca: 'Humor espontani, trapelleria i vitalitat', es: 'Humor espontáneo, picardía y vitalidad', en: 'Spontaneous humor, mischief, and non-stop energy' }, type: 'nan' }
      ]
    },
    {
      id: 3,
      text: {
        ca: 'Quin atribut o element festiu t\'agradaria portar?',
        es: '¿Qué atributo o elemento festivo preferirías llevar?',
        en: 'Which festive symbol would you prefer to carry?'
      },
      options: [
        { label: { ca: 'La corona comtal i el pergamí de 986', es: 'La corona condal y el pergamino de 986', en: 'The count crown and founding parchment of 986' }, type: 'borrell' },
        { label: { ca: 'El mantell de brocat fi i el ram de flors nobles', es: 'El manto de brocado fino y el ramo de flores nobles', en: 'The fine brocade cloak and noble flowers bouquet' }, type: 'letgarda' },
        { label: { ca: 'El turbant cerimonial i el sabre de cavaller', es: 'El turbante ceremonial y el sable de caballero', en: 'The royal turban and knightly curved sabre' }, type: 'abdalla' },
        { label: { ca: 'El vel poètic i el mirall d\'argent que reflecteix el cel', es: 'El velo poético y el espejo de plata que refleja el cielo', en: 'The poetic veil and silver mirror reflecting the sky' }, type: 'adalgisa' },
        { label: { ca: 'El barret de tres pics i una bona vara per ballar', es: 'El sombrero de tres picos y una vara para saltar', en: 'The tricorn hat and stick for dancing around' }, type: 'nan' }
      ]
    }
  ];

  const results = {
    borrell: {
      name: 'Borrell II',
      title: 'Comte de Barcelona i Senyor de Cardona (Barri Major)',
      image: './images/borrell.jpg',
      description: {
        ca: 'Tens ànima de líder natural. Igual que el noble comte que va atorgar la Carta de Poblament el 986, valores la comunitat, la història i el respecte per les arrels.',
        es: 'Tienes alma de líder natural. Como el noble conde que otorgó la Carta de Poblament en 986, valoras la comunidad, la historia y el respeto a las raíces.',
        en: 'You are a born leader. Just like Count Borrell II who granted Cardona its historic charter in 986, you cherish community, justice, and tradition.'
      }
    },
    letgarda: {
      name: 'Letgarda',
      title: 'Comtessa consort de Cardona (Barri Major)',
      image: './images/letgarda.jpg',
      description: {
        ca: 'Destaques per la teva elegància, serenor i saviesa. Ets la figura que aporta calma, equilibri i dignitat a cada celebració col·lectiva.',
        es: 'Destacas por tu elegancia, serenidad y sabiduría. Eres la figura que aporta calma, equilibrio y dignidad a cada celebración popular.',
        en: 'You shine with grace, wisdom, and serenity. You bring warmth, balance, and nobility to everyone around you.'
      }
    },
    abdalla: {
      name: 'Abdal·là',
      title: 'El Príncep Sarraí (Barri Nou)',
      image: './images/abdalla.jpg',
      description: {
        ca: 'Ets passió pura i coratge. No hi ha muralla ni dificultat que freni la teva entrega per les persones que estimes i pels teus somnis més alts.',
        es: 'Eres pura pasión y valentía. No hay muro ni dificultad que frene tu lealtad hacia tus seres queridos y tus ideales.',
        en: 'You are fueled by passion and courage. No castle wall or obstacle can stop your loyalty to the people you love.'
      }
    },
    adalgisa: {
      name: 'Adalgisa',
      title: 'La Minyona de Cardona (Barri Nou)',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      description: {
        ca: 'Sensible, lliure i amb un esperit poètic indomable. Fins i tot des de la torre més alta, el teu record i la teva veu ressonen com un símbol immortal.',
        es: 'Sensible, libre y con un espíritu poético indomable. Incluso en la torre más alta, tu voz y tus anhelos resuenan inmortales.',
        en: 'Free-spirited, sensitive, and romantic. Your heart knows no confinement, and your dreams inspire everyone who hears your song.'
      }
    },
    nan: {
      name: 'Els Nans del Mercat (Minga i Agneta)',
      title: 'Les figures més antigues i trapelles de Cardona',
      image: './images/nans-mercat.jpg',
      description: {
        ca: 'Ets pura alegria, tradició bicentenària i espontaneïtat. Com el Minga i l\'Agneta del Mercat, saps com arrencar un somriure i fer bategar el cor festiu de la vila a cada plaça.',
        es: 'Eres pura alegría, tradición bicentenaria y espontaneidad. Como Minga y Agneta del Mercado, sabes cómo arrancar una sonrisa y hacer vibrar el corazón festivo del pueblo.',
        en: 'You are pure joy, bicentennial tradition, and spontaneous fun. Like Minga & Agneta, you bring laughter and celebration wherever you go.'
      }
    }
  };

  const handleSelectOption = (type) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateResult = () => {
    const counts = {};
    answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
    let maxType = 'borrell';
    let maxCount = 0;
    for (const type in counts) {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        maxType = type;
      }
    }
    return results[maxType] || results.borrell;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizFinished(false);
    setCopied(false);
  };

  const resultFigure = quizFinished ? calculateResult() : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`He fet el Quiz dels Gegants de Cardona i sóc: ${resultFigure.name}! Fes-lo tu també a la web oficial.`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="quiz" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('quiz', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-cardona-burgundyDark mb-3">
            {t('quiz', 'title')}
          </h2>
          <div className="w-16 h-1 bg-cardona-gold mx-auto mb-4 rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base">
            {t('quiz', 'subtitle')}
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-cardona-sand p-6 sm:p-10 rounded-3xl border-2 border-cardona-stone shadow-xl">
          {!quizFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
                <span>{t('quiz', 'questionOf')} {currentQuestion + 1} {t('quiz', 'of')} {questions.length}</span>
                <span className="text-cardona-burgundy font-black">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-cardona-burgundy transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cardona-burgundyDark mb-8 leading-snug">
                {questions[currentQuestion].text[lang] || questions[currentQuestion].text.ca}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.type)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white hover:bg-cardona-burgundy hover:text-white border border-gray-200 transition-all duration-200 shadow-sm flex items-center justify-between group transform hover:-translate-y-0.5"
                  >
                    <span className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-white">
                      {opt.label[lang] || opt.label.ca}
                    </span>
                    <ArrowRight className="w-4 h-4 text-cardona-gold shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardona-gold/20 border border-cardona-gold text-cardona-burgundy font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-cardona-goldDark" />
                <span>{t('quiz', 'yourResult')}</span>
              </div>

              <div className="max-w-xs mx-auto h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-cardona-gold">
                <img
                  src={resultFigure.image}
                  alt={resultFigure.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-cardona-burgundyDark mb-1">
                  {resultFigure.name}
                </h3>
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-4">
                  {resultFigure.title}
                </p>
                <p className="text-sm sm:text-base text-gray-700 max-w-lg mx-auto leading-relaxed">
                  {resultFigure.description[lang] || resultFigure.description.ca}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-cardona-stone">
                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-cardona-gold" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Copiada al porta-retalls!' : t('quiz', 'share')}</span>
                </button>
                <button
                  onClick={restartQuiz}
                  className="px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider transition-all border border-gray-300 flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('quiz', 'retry')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
