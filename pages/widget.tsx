import { useState } from "react"
import { useServices } from "@src/hooks/useServices"
import { Dropdown } from "@src/components/Dropdown/Dropdown"
import { Card } from "@src/components/Card/Card"
import styles from '@src/utils/widget.module.scss'

const Widget = () => {
  const { categories, services, isLoading, isError } = useServices()
  const [selectedCategories, setCategories] = useState<string[]>([])

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>{isError.message}</div>

  const onClickOption = (category: string) => {
    let newSelected = []
    if (selectedCategories.includes(category)) {
      newSelected = selectedCategories.filter((c) => c !== category)
    } else {
      newSelected = [...selectedCategories, category]
    }
    setCategories(newSelected)
  }

  const filteredServices = services.filter((service) => {
    return service.categoryCodes.some((cs) => selectedCategories.includes(cs))
  })

  return (
    <div>
      <Dropdown options={categories} selected={selectedCategories} onClick={onClickOption} />
      <div className={styles.cardsContainer}>
        {filteredServices.map(service => <Card key={service.code} service={service} />)}
      </div>
    </div>
  )
}

export default Widget
