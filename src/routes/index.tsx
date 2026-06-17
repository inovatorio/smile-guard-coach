import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import heroImg from "@/assets/dra-jaqueline-hero.jpg";
import clinicaImg from "@/assets/clinica-detalhe.jpg";
import tratamentosImg from "@/assets/tratamentos-detalhe.jpg";

const PAGE_TITLE = "Dra. Jaqueline Martins — Avaliação de Bruxismo";
const PAGE_DESC =
  "Dor na mandíbula, dentes sensíveis ou dor de cabeça ao acordar? Agende uma avaliação de bruxismo com a Dra. Jaqueline Martins.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "Dra. Jaqueline Martins — Odontologia Avançada",
          description: PAGE_DESC,
          medicalSpecialty: ["Dentistry", "CosmeticDentistry"],
          areaServed: ["Vila Formosa", "São Miguel Paulista", "São Paulo"],
          address: [
            {
              "@type": "PostalAddress",
              addressLocality: "Vila Formosa",
              addressRegion: "SP",
              addressCountry: "BR",
            },
            {
              "@type": "PostalAddress",
              addressLocality: "São Miguel Paulista",
              addressRegion: "SP",
              addressCountry: "BR",
            },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

const CTA_PRIMARY = "Quero avaliar meu bruxismo";
const CTA_SECONDARY = "Tenho dor na mandíbula";

const ctaPrimaryHref = buildWhatsAppUrl(
  "Olá, Dra. Jaqueline. Gostaria de agendar uma avaliação de bruxismo.",
);
const ctaSecondaryHref = buildWhatsAppUrl(
  "Olá, Dra. Jaqueline. Tenho dor na mandíbula e gostaria de uma avaliação.",
);
const ctaFinalHref = buildWhatsAppUrl(
  "Olá, Dra. Jaqueline. Quero agendar minha avaliação.",
);
const ctaSymptomsHref = buildWhatsAppUrl(
  "Olá, Dra. Jaqueline. Esses sintomas parecem comigo. Gostaria de uma avaliação.",
);
const ctaConsequencesHref = buildWhatsAppUrl(
  "Olá, Dra. Jaqueline. Quero entender se o que sinto pode ser bruxismo.",
);

const symptoms = [
  { code: "S-01", title: "Dor ou cansaço na mandíbula", desc: "Sente dor ou cansaço na mandíbula ao acordar ou ao mastigar?" },
  { code: "S-02", title: "Dores de cabeça ao acordar", desc: "Acorda com dor de cabeça nas têmporas ou na região frontal com frequência?" },
  { code: "S-03", title: "Dentes sensíveis", desc: "Seus dentes ficaram sensíveis ao frio, calor ou doce sem causa aparente?" },
  { code: "S-04", title: "Desgaste ou pequenas fraturas", desc: "Notou os dentes mais curtos, com bordas lascadas ou pequenas trincas?" },
  { code: "S-05", title: "Estalos ou desconforto na ATM", desc: "Sua mandíbula estala, trava ou incomoda ao abrir a boca?" },
  { code: "S-06", title: "Tensão facial e travamento", desc: "Percebe o rosto tenso ou a mandíbula travada em momentos de estresse?" },
];

const consequences = [
  { title: "Desgaste do esmalte dental", desc: "A força repetida fragiliza a camada que protege o dente." },
  { title: "Sensibilidade nos dentes", desc: "A perda de estrutura expõe regiões sensíveis a estímulos do dia a dia." },
  { title: "Dor muscular e facial", desc: "Os músculos da face podem ficar sobrecarregados e doloridos." },
  { title: "Sobrecarga na ATM", desc: "A articulação que move a mandíbula sofre com o esforço excessivo." },
  { title: "Fraturas em dentes ou restaurações", desc: "Pequenas fissuras podem evoluir para perdas estruturais." },
  { title: "Comprometimento estético do sorriso", desc: "O desgaste muda a forma dos dentes e a harmonia do sorriso." },
];

const steps = [
  { phase: "Fase 01", title: "Escuta", desc: "Conversamos sobre seus sintomas, rotina e histórico de saúde." },
  { phase: "Fase 02", title: "Exame clínico", desc: "Avaliação dos dentes, da mordida, da musculatura e da ATM." },
  { phase: "Fase 03", title: "Identificação", desc: "Mapeamento de sinais de desgaste, sensibilidade ou fraturas." },
  { phase: "Fase 04", title: "Plano de cuidado", desc: "Conduta personalizada de proteção, alívio e prevenção." },
];

const treatments = [
  { title: "Placa personalizada", desc: "Proteção dental confeccionada sob medida para o seu caso." },
  { title: "Orientações durante o dia", desc: "Estratégias para reduzir o apertamento em momentos de tensão." },
  { title: "Reabilitação de desgastes", desc: "Recuperação estética e funcional quando há perda de estrutura." },
  { title: "Avaliação estética e funcional", desc: "Análise integrada do sorriso, da mordida e da harmonia facial." },
  { title: "Encaminhamento complementar", desc: "Quando indicado, articulamos com outras especialidades de apoio." },
];

const clinic = [
  { title: "Estrutura moderna", desc: "Ambientes pensados para conforto e privacidade." },
  { title: "Atendimento humanizado", desc: "Escuta cuidadosa e tempo dedicado a cada paciente." },
  { title: "Tecnologia odontológica", desc: "Recursos atuais para avaliação e planejamento precisos." },
  { title: "Planejamento personalizado", desc: "Cada conduta é desenhada para o seu caso, não para um padrão." },
];

const faq = [
  {
    q: "Como saber se tenho bruxismo?",
    a: "Alguns sinais comuns são dor na mandíbula, dor de cabeça ao acordar, dentes sensíveis, desgaste dental, tensão facial e estalos na articulação. A confirmação depende de uma avaliação odontológica.",
  },
  {
    q: "Qual é o tratamento para bruxismo?",
    a: "O tratamento é individualizado e pode envolver placa oclusal personalizada, orientações para reduzir o apertamento durante o dia, acompanhamento clínico e, quando necessário, reabilitação de áreas desgastadas. A conduta é definida após a avaliação.",
  },
  {
    q: "A placa para bruxismo realmente protege os dentes?",
    a: "A placa, quando indicada e confeccionada sob medida, ajuda a proteger os dentes do desgaste causado pelo apertamento e pode reduzir desconfortos musculares. A necessidade e o modelo ideal são definidos na avaliação.",
  },
  {
    q: "Dor na mandíbula pode ser bruxismo?",
    a: "Pode ser um dos sinais. A dor ou cansaço na mandíbula, principalmente ao acordar ou após momentos de tensão, frequentemente está associada ao apertamento dental. É importante avaliar cada caso.",
  },
  {
    q: "Bruxismo pode causar dor de cabeça?",
    a: "Sim. A sobrecarga dos músculos da face e da mandíbula pode estar relacionada a dores de cabeça, especialmente ao acordar ou ao final do dia.",
  },
  {
    q: "Bruxismo tem cura?",
    a: "O bruxismo pode ter diferentes causas e manifestações. Em muitos casos, o objetivo do tratamento é controlar os sintomas, proteger os dentes e reduzir os impactos do apertamento ao longo do tempo.",
  },
  {
    q: "Onde fazer avaliação de bruxismo em Vila Formosa ou São Miguel Paulista?",
    a: "A Dra. Jaqueline Martins atende em duas unidades em São Paulo: Vila Formosa e São Miguel Paulista. O agendamento da avaliação pode ser feito diretamente pelo WhatsApp.",
  },
  {
    q: "Quando devo procurar uma avaliação?",
    a: "Quando houver dor frequente, desgaste nos dentes, sensibilidade, estalos, tensão facial ou suspeita de apertamento durante o sono ou ao longo do dia.",
  },
];

function PrimaryCta({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center bg-graphite text-ivory px-8 py-4 text-[13px] tracking-wide font-medium hover:bg-champagne hover:text-graphite transition-colors duration-300 ${className}`}
    >
      {label}
    </a>
  );
}

function GhostCta({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center border border-graphite/20 text-graphite px-8 py-4 text-[13px] tracking-wide font-medium hover:border-graphite hover:bg-graphite hover:text-ivory transition-colors duration-300 ${className}`}
    >
      {label}
    </a>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#top" className="font-display text-lg md:text-xl tracking-tight text-graphite">
            Dra. Jaqueline Martins
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-graphite/70">
            <a href="#sintomas" className="hover:text-champagne transition-colors">Sintomas</a>
            <a href="#tratamento" className="hover:text-champagne transition-colors">Tratamento</a>
            <a href="#sobre" className="hover:text-champagne transition-colors">Dra. Jaqueline</a>
            <a href="#faq" className="hover:text-champagne transition-colors">Dúvidas</a>
          </nav>
          <a
            href={ctaPrimaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-graphite text-ivory px-4 py-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] hover:bg-champagne hover:text-graphite transition-colors duration-300"
          >
            Agendar avaliação
          </a>
        </div>
      </header>

      <main id="top" className="pt-16 md:pt-20">
        {/* HERO */}
        <section className="px-6 pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-end">
            <div className="md:col-span-7 animate-reveal">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-8">
                Odontologia Estética e Funcional · Bruxismo
              </p>
              <h1 className="font-display font-medium text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-balance text-graphite mb-8">
                Você pode estar <em className="italic font-medium text-champagne">apertando</em> os dentes sem perceber.
              </h1>
              <p className="text-base md:text-lg text-graphite/70 max-w-xl leading-relaxed mb-10">
                Dor na mandíbula, dores de cabeça ao acordar, sensibilidade nos dentes e tensão facial podem ser sinais de bruxismo ou apertamento dental. Uma avaliação cuidadosa ajuda a entender o seu caso e proteger seu sorriso.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
                <PrimaryCta href={ctaPrimaryHref} label={CTA_PRIMARY} />
                <GhostCta href={ctaSecondaryHref} label={CTA_SECONDARY} />
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-graphite/55">
                <li>+21 anos de experiência</li>
                <li className="hidden sm:block text-champagne/60">·</li>
                <li>Odontologia estética e funcional</li>
                <li className="hidden sm:block text-champagne/60">·</li>
                <li>Vila Formosa e São Miguel Paulista</li>
              </ul>
            </div>

            <div className="md:col-span-5 animate-reveal" style={{ animationDelay: "200ms" }}>
              <div className="relative">
                <div className="absolute -inset-3 border border-champagne/30 -z-10" aria-hidden />
                <img
                  src={heroImg}
                  alt="Dra. Jaqueline Martins, cirurgiã-dentista, em sua clínica odontológica em São Paulo."
                  width={896}
                  height={1152}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SYMPTOMS — "O bruxismo deixa pistas." */}
        <section id="sintomas" className="px-6 py-20 md:py-28 bg-bone border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-16">
              <div className="md:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                  [ 01 ] Identifique-se
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-graphite">
                  O bruxismo deixa pistas.
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-graphite/65 leading-relaxed">
                  Muitas pessoas convivem com sinais de bruxismo por meses ou anos sem perceber. Ele pode acontecer durante o sono ou ao longo do dia, em momentos de tensão, concentração ou ansiedade.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {symptoms.map((s) => (
                <article
                  key={s.code}
                  className="group bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-accent-soft"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-champagne">{s.code}</span>
                  <h3 className="font-display text-2xl text-graphite mt-5 mb-3">{s.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-14 grid md:grid-cols-12 gap-8 items-center border-t border-border pt-10">
              <p className="md:col-span-7 font-display text-xl md:text-2xl text-graphite/85 leading-snug italic">
                Quando esses sinais aparecem com frequência, vale investigar. O bruxismo pode agir em silêncio antes de causar danos visíveis.
              </p>
              <div className="md:col-span-5 md:justify-self-end">
                <PrimaryCta href={ctaSymptomsHref} label="Esses sintomas parecem comigo" />
              </div>
            </div>
          </div>
        </section>

        {/* AUTHORITY STATS STRIP */}
        <section className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { tag: "[01] Experiência", number: "+21", unit: "anos", desc: "de atuação clínica em odontologia estética e funcional." },
              { tag: "[02] Pacientes", number: "+24.256", unit: "atendidos", desc: "histórias acompanhadas ao longo da carreira." },
              { tag: "[03] Estrutura", number: "02", unit: "unidades", desc: "Vila Formosa e São Miguel Paulista, em São Paulo." },
            ].map((stat) => (
              <div key={stat.tag} className="p-10 md:p-14">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne block mb-4">
                  {stat.tag}
                </span>
                <div className="font-display text-5xl md:text-6xl text-graphite leading-none mb-2">
                  {stat.number}{" "}
                  <span className="text-xl md:text-2xl text-graphite/60 align-middle">{stat.unit}</span>
                </div>
                <p className="text-sm text-graphite/60 mt-4 leading-relaxed max-w-xs">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONSEQUENCES */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                [ 02 ] Consequências
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-graphite mb-6">
                O bruxismo pode deixar marcas no seu sorriso e na sua qualidade de vida.
              </h2>
              <p className="text-graphite/65 leading-relaxed">
                Quando os dentes recebem força excessiva de forma repetida, o impacto pode aparecer nos dentes, na musculatura e na articulação da mandíbula.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consequences.map((c, i) => (
                <article
                  key={c.title}
                  className="bg-card border border-border p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-champagne">
                    C-{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-graphite mt-5 mb-3">{c.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EVALUATION — dark band */}
        <section className="px-6 py-20 md:py-28 bg-graphite text-ivory">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14 items-end">
              <div className="md:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                  [ 03 ] Avaliação
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-ivory">
                  O tratamento começa entendendo o seu caso.
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-ivory/70 leading-relaxed">
                  Nem todo bruxismo é igual. A avaliação odontológica é essencial para identificar sinais de desgaste, pontos de dor, hábitos associados e possíveis fatores que estejam contribuindo para o apertamento.
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-4 gap-10 md:gap-12">
              {steps.map((step) => (
                <li key={step.phase} className="border-l border-ivory/15 pl-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne block mb-4">
                    {step.phase}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory mb-3">{step.title}</h3>
                  <p className="text-sm text-ivory/65 leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TREATMENTS */}
        <section id="tratamento" className="px-6 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                [ 04 ] Tratamentos
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-graphite mb-6">
                Cuidado personalizado para proteger seus dentes e reduzir desconfortos.
              </h2>
              <p className="text-graphite/65 leading-relaxed">
                A conduta ideal depende da avaliação individual. Em muitos casos, o cuidado envolve proteção dental, orientações específicas e acompanhamento clínico.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {treatments.map((t, i) => (
                <article
                  key={t.title}
                  className="bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-accent-soft"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-champagne">
                    T-{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-graphite mt-5 mb-3">{t.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{t.desc}</p>
                </article>
              ))}
            </div>

            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-graphite/45">
              · O tratamento indicado depende da avaliação individual de cada paciente.
            </p>
          </div>
        </section>

        {/* AUTHORITY — Dra. Jaqueline */}
        <section id="sobre" className="px-6 py-20 md:py-28 bg-bone border-y border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-3 border border-champagne/30 -z-10" aria-hidden />
                <img
                  src={clinicaImg}
                  alt="Detalhe da clínica odontológica da Dra. Jaqueline Martins, com bancada em mármore e instrumentos."
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                [ 05 ] Dra. Jaqueline Martins
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-graphite mb-6">
                Conheça a Dra. Jaqueline Martins.
              </h2>
              <p className="text-graphite/70 leading-relaxed mb-10 max-w-2xl">
                Cirurgiã-dentista formada em 2004, com especialização em implantodontia, foco em odontologia estética e mais de 21 anos de experiência. Sua atuação une estética, função e cuidado individualizado para ajudar pacientes a preservarem a saúde bucal e a confiança no sorriso.
              </p>

              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne mb-2">Pacientes</dt>
                  <dd className="font-display text-3xl md:text-4xl text-graphite">+24.256</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne mb-2">Carreira</dt>
                  <dd className="font-display text-3xl md:text-4xl text-graphite">+21 anos</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne mb-2">Unidades</dt>
                  <dd className="font-display text-3xl md:text-4xl text-graphite">02</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CLINIC */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                [ 06 ] Estrutura
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-graphite">
                Uma clínica preparada para cuidar do seu sorriso com precisão e acolhimento.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clinic.map((c, i) => (
                <article key={c.title} className="border border-border bg-card p-8">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-champagne">
                    E-{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-graphite mt-5 mb-3">{c.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 py-20 md:py-28 bg-bone border-y border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-5">
                [ 07 ] Dúvidas frequentes
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-graphite">
                Perguntas que escutamos no consultório.
              </h2>
            </div>

            <Accordion type="single" collapsible className="border-t border-border">
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="font-display text-lg md:text-xl text-graphite hover:text-champagne py-6 text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-graphite/70 leading-relaxed text-base pb-6 pr-8">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-6 py-24 md:py-32 bg-graphite text-ivory">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-6">
              Agende sua avaliação
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-ivory mb-6 text-balance">
              Não espere o desgaste aparecer para cuidar do seu sorriso.
            </h2>
            <p className="text-ivory/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Agende uma avaliação e entenda se seus sintomas podem estar relacionados ao bruxismo ou apertamento dental.
            </p>
            <a
              href={ctaFinalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-champagne text-graphite px-10 py-5 text-sm tracking-wide font-medium hover:bg-ivory transition-colors duration-300"
            >
              Agendar avaliação pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-border">
            <div className="md:col-span-5">
              <div className="font-display text-2xl text-graphite mb-3">Dra. Jaqueline Martins</div>
              <p className="text-sm text-graphite/60 max-w-sm leading-relaxed">
                Odontologia avançada com foco em estética, função e cuidado individualizado.
              </p>
            </div>
            <div className="md:col-span-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne mb-4">Unidades</h3>
              <ul className="space-y-2 text-sm text-graphite/70">
                <li>Vila Formosa · São Paulo</li>
                <li>São Miguel Paulista · São Paulo</li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-graphite/70">
                <li>
                  <a href={ctaFinalHref} target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-10 text-xs text-graphite/45 leading-relaxed max-w-2xl">
            As informações desta página são educativas e não substituem uma avaliação odontológica individual.
          </p>
        </div>
      </footer>
    </div>
  );
}
