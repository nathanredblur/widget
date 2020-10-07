import { Service } from "@src/interfaces";
import styles from './Card.module.scss'

type Props = {
  service: Service
}

export const Card: React.FC<Props> = ({ service }) => {
  return (
    <div className={`${styles.Card} ${service.included && styles.included}`}>
      <div className={styles.front} style={{ backgroundImage: `url(https://picsum.photos/seed/${service.code}/300/200)` }}>
        {service.included && <div className={styles.ribon}>Included</div>}
        <h1 className={styles.title}>{service.title}</h1>
        <div className={styles.teaser}>{service.teaser}</div>
      </div>
      <div className={styles.back}>
        <h2 className={styles.subtitle}>{service.title}</h2>
        <div className={styles.description}>{service.description}</div>
      </div>
    </div>
  )
}