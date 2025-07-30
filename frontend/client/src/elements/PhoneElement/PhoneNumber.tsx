import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import styles from "./PhoneNumber.module.css"


export default function PhoneNumber({value, onChange}: {value: string, onChange: (val:string) => void}) {

  const [number, setNumber] = useState<string>("")

  const handleSave = (value: string | undefined) => {
    setNumber(value || "")
  }

  return (
    <PhoneInput
      className={styles["phone-input"]}
      placeholder="Введите номер телефона"
      value={value}
      onChange={(val) => onChange(val ? val : "")} 
      />
  )
}