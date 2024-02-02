import { useState } from "react"
import Image from "next/image"

interface Props {
    setIsOpen: (isOpen: boolean) => void;
    allLanguage?: Language[];
}
interface Language {
    langCode: string;
    langEnglishName: string;
    langNativeName: string;

}

export const ChooseLanguage = ({ setIsOpen, allLanguage }: Props) => {
    const [filter, setFilter] = useState<string>('')

    const handleClose = () => {
        setIsOpen(false);

    }
    return (
        <div className='lang-container'>
            <div className='lang-modal'>
                <div className='lang-header'>
                    <div>
                        <Image className="lang-icon" src="/assets/search.svg" width={20} height={20} alt="go back" />

                        <input className="lang-search" value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            type="text" placeholder="Search Idioma" />
                    </div>
                    <Image className="lang-icon" src="/assets/close.svg" width={20} height={20} alt="close"
                        onClick={handleClose}
                    />
                </div>
                <div className='lang-content'>
                    {allLanguage?.filter(lang => lang.langEnglishName.toLowerCase().includes(filter.toLowerCase())).map((lang, index) => (
                        <p className="lang-text" key={index}>{lang.langNativeName} ({lang.langEnglishName})</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
