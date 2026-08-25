import { ArrowUpRight } from 'lucide-react'
import { SiteHeader, Footer } from '@/components/kreatik/site-shell'

const STEPS = [
  { n: '01', title: 'Tu postules', text: 'Envoie-nous 3 à 5 visuels qui représentent ton univers, par email.' },
  { n: '02', title: 'On échange', text: 'On regarde ensemble ce qui colle le mieux à un format sticker et à la collection en cours.' },
  { n: '03', title: 'On produit', text: 'Kreatik gère l\u2019impression, le packaging et l\u2019expédition — tu n\u2019as rien à avancer.' },
  { n: '04', title: 'Tu es payé', text: '50% de la marge nette te revient directement sur chaque vente, à chaque mois.' },
]

export default function DevenirArtistePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F3ECE0] px-5 py-16 text-[#12141C] md:px-10 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">MARKETPLACE D&apos;ARTISTES</p>
          <h1 className="mt-4 font-author text-5xl italic leading-[.95] tracking-[-0.04em] md:text-7xl">Ton design,<br />ton nom dessus.</h1>
          <p className="mt-7 max-w-xl font-montserrat text-sm leading-7 text-black/65">Kreatik n&apos;est pas qu&apos;une boutique — c&apos;est une marketplace où chaque design a un artiste derrière. On s&apos;occupe de toute la logistique (production, expédition, SAV), tu gardes ta liberté créative et ta communauté.</p>

          <div className="mt-10 inline-flex items-center gap-3 border border-[#00767D]/35 bg-[#00767D]/10 px-5 py-4 font-montserrat text-sm text-[#00767D]"><span className="font-author text-2xl italic">50%</span> de la marge nette reversés directement à l&apos;artiste sur chaque vente.</div>

          <div className="mt-16 grid gap-px bg-black/10 sm:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-[#F3ECE0] p-7">
                <p className="font-author text-sm italic text-[#C8336A]">{s.n}</p>
                <h3 className="mt-3 font-montserrat text-sm font-bold">{s.title}</h3>
                <p className="mt-3 font-montserrat text-[13px] leading-6 text-black/60">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-black/10 pt-10">
            <h2 className="font-author text-3xl italic">Prêt à postuler ?</h2>
            <p className="mt-3 max-w-md font-montserrat text-sm leading-6 text-black/60">Envoie-nous ton portfolio ou quelques visuels par email — on te répond sous quelques jours.</p>
            <a href="mailto:contact.kreatik@protonmail.com?subject=Candidature%20artiste%20partenaire" className="mt-7 inline-flex items-center gap-3 bg-[#12141C] px-6 py-4 font-montserrat text-[11px] font-bold tracking-[0.16em] text-[#F3ECE0] transition-transform hover:-translate-y-1">
              ENVOYER MA CANDIDATURE <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
