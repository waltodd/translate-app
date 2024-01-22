"use client"
import { useState } from "react";
import Image from "next/image";

interface Props {
  value: string;
  label: string;
}
const languageOptions = [
  { value: 'auto', label: 'Detect Language' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
];

const languageOptionsResult = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
];
export default function Home() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [translatedText, setTranslatedText] = useState('');
  const [active, setActive] = useState(0);
  const [activeResult, setActiveResult] = useState(0);

  const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API key

  // const handleTranslate = async () => {
  //   try {
  //     let targetLanguage = selectedLanguage.value;
  //     if (targetLanguage === 'auto') {
  //       targetLanguage = undefined; // Detect language automatically
  //     }

  //     const result = await translate(inputText, { to: targetLanguage, key: apiKey });
  //     setTranslatedText(result.text);
  //   } catch (error) {
  //     console.error('Translation error:', error);
  //   }
  const handleSelectLanguage = (index: number) => {
    console.log(index)
    setActive(index)
  }

  const handleSelectLanguageResult = (index: number) => {
    console.log(index)
    setActiveResult(index)
  }
  return (
    <main className="hero-section">
      <div className="main-container">
        <div className="logo">
          <Image src="/assets/logo.svg" alt="logo" width={200} height={200} />
        </div>
        <div className="card-container">
          <div className="card">
            <div className="card-header">
              {languageOptions.map((language, index) => (
                <div onClick={() => handleSelectLanguage(index)}
                  className={`btn-language ${active === index ? 'active' : ''}`} key={index}>
                  {language.label}
                </div>
              ))}
            </div>
            <div className="card-content">
              <textarea className="textare-input" />
              <p>19/500</p>
            </div>
            <div className="card-footer">
              <div className="btn-icon-container">
                <div className="btn-icon">
                  <Image src="/assets/sound_max_fill.svg" width={25} height={25} alt="sound" />
                </div>
                <div className="btn-icon">
                  <Image src="/assets/Copy.svg" width={25} height={25} alt="copy" />
                </div>
              </div>
              <div>
                <div className="btn-translate">
                  <Image className="img" src="/assets/Sort_alfa.svg" width={25} height={25} alt="copy" />
                  Translate
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header-result">
              <div className="result">
              {languageOptionsResult.map((language, index) => (
                <div onClick={() => handleSelectLanguageResult(index)}
                  className={`btn-language ${activeResult === index ? 'active' : ''}`} key={index}>
                  {language.label}
                </div>
              ))}
              </div>
              <div>
              <div className="btn-icon">
                <Image src="/assets/Horizontal_top_left_main.svg" width={25} height={25} alt="sound" />
              </div>
              </div>
            </div>
            <div className="card-content">
              <textarea className="textare-input" />
            </div>
            <div className="card-footer">
              <div className="btn-icon-container">
                <div className="btn-icon">
                  <Image src="/assets/sound_max_fill.svg" width={25} height={25} alt="sound" />
                </div>
                <div className="btn-icon">
                  <Image src="/assets/Copy.svg" width={25} height={25} alt="copy" />
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
