import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

function Success({isVisible,setVisible,text,linkText,linkTextLink,linkTextLinkOptionals}:{isVisible:Boolean,setVisible:React.Dispatch<React.SetStateAction<boolean>>,text:string,linkText?:string,linkTextLink?:string,linkTextLinkOptionals:Record<any,any>}) {
    const navigate = useNavigate();
  return (
    <div className="max-w-lg border flex items-center justify-center flex-col shadow-md rounded-md p-4 mx-auto">
        <img src="/image.png" />
        <h1 className="font-semibold text-3xl text-green-700">Successfully</h1>
        <p className="text-sm font-semibold">(Submitted Form)</p>
        <Button onClick={() => setVisible(!isVisible)} className="mt-3 cursor-pointer">{text}</Button>
        {linkText && <Button onClick={() => navigate(linkTextLink ?? '#',linkTextLinkOptionals)} className="mt-3 cursor-pointer bg-green-600 hover:bg-green-700">{linkText}</Button>}
    </div>
  )
}

export default Success