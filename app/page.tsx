"use client"
import { useState, useEffect, ChangeEvent } from 'react'
import Image from "next/image";
import debounce from 'lodash/debounce';
import detectlanguage from './api/detectLanguage'
import toast, { Toaster } from 'react-hot-toast';
import copy from "copy-to-clipboard";
import { TextToSpeak } from '@/components/TextToSpeak';


interface Option {
  value: string;
  label: string;
}
interface OptionResult {
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
  { value: 'fr', label: 'French' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
];
export default function Home() {
  const [inputText, setInputText] = useState<string>('Hello, how are you?');
  const [sourceLang, setSourceLang] = useState<Option>({ value: 'auto', label: 'Detect Language' });
  const [targetLang, setTargetLang] = useState<OptionResult>({ value: 'fr', label: 'French' });
  const [translation, setTranslation] = useState('');
  const [active, setActive] = useState(0);
  const [activeResult, setActiveResult] = useState(0);



  const handleDetectLanguage = async () => {
   
    await detectlanguage.detectCode(inputText).then( async (result) => {
      try {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${result}|${targetLang.value}`;
        const response =await fetch(apiUrl);
        const data = await  response.json();
        const { responseData: { translatedText } } = data;

        if(result === targetLang.value){
          setTranslation(inputText)
        }else{

          if(inputText == ''){
            setTranslation('')
          }else{
            setTranslation(translatedText)
          }
          
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  const handleTranslate = async () => {
    try {
      
      if (sourceLang.value == "auto") {
        handleDetectLanguage()
      } else {
        const apiUrl = await `https://api.mymemory.translated.net/get?q=${inputText}!&langpair=${sourceLang.value}|${targetLang.value}`;
       
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { responseData: { translatedText } } = data;

        if(sourceLang.value === targetLang.value){
          setTranslation(inputText)
        }else{

          if(inputText == ''){
            setTranslation('')
          }else{
            setTranslation(translatedText)
          }
          
        }
      }


    } catch (error) {
      console.error('Translation error:', error);
    }

  }

  const debouncedTranslate = debounce(handleTranslate, 500)

  useEffect(() => {
    //This effect will run whenever inputText or sourceLang or targetLang
    debouncedTranslate()

    return () => debouncedTranslate.cancel();

  }, [inputText, sourceLang, targetLang])

  const handleSelectLanguage = (index: number, lang: { value: string, label: string }) => {
    setActive(index)
    setSourceLang(lang)
  }

  const handleSelectLanguageResult = (index: number, lang: { value: string, label: string }) => {
    setActiveResult(index)
    setTargetLang(lang)
  }

  const handleCopyToClipboard =(copyText:string) =>{
    copy(copyText)
    toast.success('Copied')
  }
  //Handling input lenght
  const handleInputChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    const newText = e.target.value;

    if(newText.length <= 500){
      setInputText(newText)
    }
  }

  const handleInputResultChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    
    const newText = e.target.value;
    if(newText.length <= 500){
      setTranslation(newText)
    }
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
                <div onClick={() => handleSelectLanguage(index, language)}
                  className={`btn-language ${active === index ? 'active' : ''}`} key={index}>
                  {language.label}
                </div>
              ))}
            </div>
            <div className="card-content">
              <textarea className="textare-input" value={inputText} onChange={handleInputChange} />
              <p>{inputText.length}/500 </p>
            </div>
            <div className="card-footer">
              <div className="btn-icon-container">
              <TextToSpeak text={inputText} />
                <div className="btn-icon" onClick={()=>handleCopyToClipboard(inputText)}>
                  <Image src="/assets/Copy.svg" width={25} height={25} alt="copy" />
                  <Toaster />
                </div>
              </div>
              <div>
                <div className="btn-translate" onClick={() => handleTranslate()}>
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
                  <div onClick={() => handleSelectLanguageResult(index, language)}
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
              <textarea className="textare-input" value={translation} onChange={handleInputResultChange} />
            </div>
            <div className="card-footer">
              <div className="btn-icon-container">
                <TextToSpeak text={translation} />
                <div className="btn-icon" onClick={()=>handleCopyToClipboard(translation)}>
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
