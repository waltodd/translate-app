import {useState} from "react"
import Image from "next/image"

interface Props {
    setIsOpen:(isOpen: boolean) => void;
    allLanguage?: Language[];
}
interface Language {
    langCode: string;
    langEnglishName: string;
    langNativeName: string;
  
  }
  
export const ChooseLanguage = ({setIsOpen, allLanguage}:Props) => {
    
   
    const handleClose = () =>{
        console.log(allLanguage);
        setIsOpen(false);
    }
    return (
        <div className='lang-container'>
            <div className='lang-modal'>
                <div className='lang-header'>
                    <div>
                        <Image className="lang-icon" src="/assets/search.svg" width={20} height={20} alt="go back" />

                        <input className="lang-search" type="text" placeholder="Search Idioma" />
                    </div>
                    <Image className="lang-icon" src="/assets/close.svg" width={20} height={20} alt="close" 
                    onClick={handleClose}
                    />
                </div>
                <div className='lang-content'>
                  {allLanguage?.map((lang, index) =>(
                    <p className="lang-text" key={index}>{lang.langEnglishName}</p>
                  ))}
                </div>
            </div>
        </div>
    )
}
