import { tx } from "../i18n"
import { adilaCatalog } from '../data/adila'
import { ArrowIcon } from './Icons'
import './AdilaCatalog.css'

export function AdilaCatalog() {
  return (
    <section className="adila-catalog" id="ecossistema-adila" aria-labelledby="adila-catalog-title">
      <div className="adila-catalog-heading">
        <div>
          <h2 id="adila-catalog-title">{tx("Mais do que construo na Adila.")}</h2>
          <p>{tx("Ferramentas para desenvolver, operar e acompanhar produtos. Da identidade à infraestrutura, do editor ao estúdio de música.")}</p>
        </div>
        <a href="https://github.com/adila-sh">{tx("Organização no GitHub")} <ArrowIcon diagonal /></a>
      </div>
      {adilaCatalog.map(group => (
        <div className="adila-catalog-group" key={group.title}>
          <h3>{tx(group.title)}</h3>
          <ul className="adila-catalog-grid">
            {group.projects.map(project => (
              <li key={project.title}>
                <a href={project.url} aria-label={tx("Conhecer {{value0}}", {value0: tx(project.title)})}>
                  <span className="adila-catalog-category">{tx(project.category)}</span>
                  <h4>{tx(project.title)}</h4>
                  <p>{tx(project.description)}</p>
                  <ArrowIcon diagonal />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
