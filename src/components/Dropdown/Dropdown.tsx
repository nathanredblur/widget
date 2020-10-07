import { useState } from "react"
import styles from "./Dropdown.module.scss"

type Props = {
  options?: string[],
  selected?: string[],
  onClick?: (option: string) => void,
}

export const Dropdown: React.FC<Props> = ({
  options = [],
  selected = [],
  onClick = () => '',
}) => {
  const [isOpen, setOpen] = useState(false);

  const onClickDropdown = () => {
    setOpen(!isOpen)
  }

  const onClickItem = (option: string) => {
    setOpen(false)
    onClick(option)
  }

  return <div className={styles.DropdownContainer}>
    <a className={`${styles.Dropdown} ${isOpen && styles.active}`} onClick={onClickDropdown}>{selected.join(', ') || 'Please Select one'}</a>
    <ul className={`${styles.DropdownBox} ${isOpen && styles.active}`}>
      {options.map((option) => {
        return <li
          key={option}
          onClick={() => onClickItem(option)}
          className={`${selected.includes(option) && styles.active}`}
        >{option}</li>
      })}
    </ul>
  </div>
}