import { tx } from "../i18n"
import { portfolio, profileLinks } from '../data/portfolio'
import { ArrowIcon } from './Icons'
export { PillHeader as SiteHeader } from './PillHeader'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <div className="footer-brand">
        <a
          className="wordmark"
          href="/"
          aria-label={tx("{{value0}}, início", {value0: tx(portfolio.fullName)})}
        >{tx("sousa.")}</a>
        <p>{tx("Software, sistemas em tempo real e IA aplicada.")}</p>
      </div>
      <div className="footer-location">
        <p>{tx("Joinville, Santa Catarina, Brasil")}</p>
        <p className="footer-availability">{tx("Disponível para trabalho remoto")}</p>
      </div>
      <nav className="footer-links" aria-label={tx("Redes e contato")}>
        <a href={profileLinks.github}>{tx("GitHub")}<ArrowIcon diagonal />
        </a>
        <a href={profileLinks.linkedin}>{tx("LinkedIn")}<ArrowIcon diagonal />
        </a>
        <a href={profileLinks.whatsapp}>{tx("WhatsApp profissional")}<ArrowIcon diagonal />
        </a>
      </nav>
      <span className="footer-copyright">
        © {tx(currentYear)} {tx(portfolio.fullName)}
      </span>
    </footer>
  )
}
