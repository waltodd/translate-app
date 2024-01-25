import Image from "next/image"


interface Props {
  text: string;
}
export const TextToSpeak = ({ text }: Props) => {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  
  //Handle generate text to audio with Open AI
  const handleTextToSpeak = async (text: string) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }

  }
  return (
    <div className="btn-icon" onClick={() => handleTextToSpeak(text)}>
      <Image src="/assets/sound_max_fill.svg" width={25} height={25} alt="sound" />
    </div>
  )
}
