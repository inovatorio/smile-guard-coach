import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MapPin, Clock, Instagram, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { PlaquinhaJourney } from "@/components/PlaquinhaJourney";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { LazyVideoPlayer } from "@/components/LazyVideoPlayer";
import heroImg from "@/assets/dra-jaqueline-hero.jpg";
import autoridadeImg from "@/assets/dra-jaqueline-autoridade.jpg.asset.json";
import clinicaImg from "@/assets/clinica-estrutura.jpg";
import tratamentosImg from "@/assets/tratamentos-detalhe.jpg";
import plaquinhaRepouso from "@/assets/plaquinha-repouso.png";
import logoAsset from "@/assets/jm-monogram.png.asset.json";
import draVideo from "@/assets/dra-jaqueline-video.mp4.asset.json";
import draVideoPoster from "@/assets/dra-jaqueline-video-poster.jpg.asset.json";

const PAGE_TITLE = "Dra. Jaqueline Martins - Avaliação de Bruxismo";
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
          name: "Dra. Jaqueline Martins - Odontologia Avançada",
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
  { title: "Dor ou cansaço na mandíbula", desc: "Sente dor ou cansaço na mandíbula ao acordar ou ao mastigar?" },
  { title: "Dores de cabeça ao acordar", desc: "Acorda com dor de cabeça nas têmporas ou na região frontal com frequência?" },
  { title: "Dentes sensíveis", desc: "Seus dentes ficaram sensíveis ao frio, calor ou doce sem causa aparente?" },
  { title: "Desgaste ou pequenas fraturas", desc: "Notou os dentes mais curtos, com bordas lascadas ou pequenas trincas?" },
  { title: "Estalos ou desconforto na ATM", desc: "Sua mandíbula estala, trava ou incomoda ao abrir a boca?" },
  { title: "Tensão facial e travamento", desc: "Percebe o rosto tenso ou a mandíbula travada em momentos de estresse?" },
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
  { phase: "Escuta", title: "Escuta", desc: "Conversamos sobre seus sintomas, rotina e histórico de saúde." },
  { phase: "Exame clínico", title: "Exame clínico", desc: "Avaliação dos dentes, da mordida, da musculatura e da ATM." },
  { phase: "Identificação", title: "Identificação", desc: "Mapeamento de sinais de desgaste, sensibilidade ou fraturas." },
  { phase: "Plano de cuidado", title: "Plano de cuidado", desc: "Conduta personalizada de proteção, alívio e prevenção." },
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
      className={`inline-flex items-center justify-center bg-graphite text-ivory px-8 py-4 text-[13px] tracking-wide font-medium hover:bg-champagne hover:text-graphite transition-all duration-300 hover:scale-[1.03] animate-cta-glow ${className}`}
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
  const journeyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center" aria-label="Dra. Jaqueline Martins - Odontologia Estética">
            <img
              src={logoAsset.url}
              alt="Dra. Jaqueline Martins - Odontologia Estética"
              className="h-14 md:h-16 w-auto"
            />

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
        {/* JOURNEY WRAPPER - single plaquinha follows the scroll across these sections */}
        <div ref={journeyRef} className="relative">
          <PlaquinhaJourney wrapperRef={journeyRef} />

        {/* HERO */}
        <section className="px-6 pt-10 md:pt-14 pb-12 md:pb-16">

          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-end">
            <div className="md:col-span-7 animate-reveal">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-8">
                Odontologia Estética e Funcional · Bruxismo
              </p>
              <h1 className="font-display font-medium text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tight text-balance text-graphite mb-8">
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
                {/* Plaquinha condutora vive no PlaquinhaScrollGuide */}
                <div className="absolute -inset-3 border border-champagne/30 -z-10" aria-hidden />
                <img
                  src={heroImg}
                  alt="Dra. Jaqueline Martins, cirurgiã-dentista, em sua clínica odontológica em São Paulo."
                  width={896}
                  height={1152}
                  className="w-full aspect-[4/5] object-cover relative"
                />
                <p className="absolute -bottom-4 left-4 md:left-6 bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-graphite/60">
                  O bruxismo deixa pistas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SYMPTOMS - "O bruxismo deixa pistas." */}
        <section id="sintomas" className="px-6 py-14 md:py-20 bg-bone border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16 max-w-4xl">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
                Identifique-se
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-graphite mb-6">
                O bruxismo deixa pistas.
              </h2>
              <p className="text-graphite/65 leading-relaxed md:text-lg">
                Muitas pessoas convivem com sinais de bruxismo por meses ou anos sem perceber. Ele pode acontecer durante o sono ou ao longo do dia, em momentos de tensão, concentração ou ansiedade.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {symptoms.map((s) => (
                <article
                  key={s.title}
                  className="group bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-accent-soft"
                >
                  <h3 className="font-display text-2xl text-graphite mb-3">{s.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center text-center border-t border-border pt-8 gap-6">
              <p className="font-display text-xl md:text-2xl text-graphite/85 leading-snug italic max-w-2xl">
                Se esses sinais aparecem com frequência, é hora de investigar. O bruxismo age em silêncio antes de deixar marcas visíveis.
              </p>
              <PrimaryCta href={ctaSymptomsHref} label="Esses sintomas parecem comigo" />
            </div>
          </div>
        </section>

        {/* AUTHORITY STATS STRIP */}
        <section className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {([
              { tag: "Experiência", value: 21, prefix: "+", unit: "anos", desc: "de atuação clínica em odontologia estética e funcional." },
              { tag: "Pacientes", value: 24256, prefix: "+", unit: "atendidos", desc: "histórias acompanhadas ao longo da carreira." },
              { tag: "Estrutura", value: 2, formatter: (n: number) => String(n).padStart(2, "0"), unit: "unidades", desc: "Vila Formosa e São Miguel Paulista, em São Paulo." },
            ] as const).map((stat) => (
              <div key={stat.tag} className="p-10 md:p-14">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne block mb-4">
                  {stat.tag}
                </span>
                <div className="font-display text-5xl md:text-6xl text-graphite leading-none mb-2">
                  <AnimatedNumber value={stat.value} prefix={"prefix" in stat ? stat.prefix : undefined} formatter={"formatter" in stat ? stat.formatter : undefined} />{" "}
                  <span className="text-xl md:text-2xl text-graphite/60 align-middle">{stat.unit}</span>
                </div>
                <p className="text-sm text-graphite/60 mt-4 leading-relaxed max-w-xs">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONSEQUENCES */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
                  Consequências
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-graphite mb-6">
                O bruxismo pode deixar marcas no seu sorriso e na sua qualidade de vida.
              </h2>
              <p className="text-graphite/65 leading-relaxed">
                Quando os dentes recebem força excessiva de forma repetida, o impacto pode aparecer nos dentes, na musculatura e na articulação da mandíbula.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {consequences.map((c, i) => (
                <article
                  key={c.title}
                  className="bg-card border border-border p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]"
                >
                  <h3 className="font-display text-xl text-graphite mt-5 mb-3">{c.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{c.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center text-center gap-5 border-t border-border pt-8">
              <p className="font-display text-xl md:text-2xl text-graphite/85 leading-snug max-w-xl">
                Muitas dessas marcas começam silenciosas - e podem ser interrompidas com a avaliação certa.
              </p>
              <PrimaryCta href={ctaConsequencesHref} label="Quero entender se isso pode ser bruxismo" />
            </div>
          </div>
        </section>

        {/* EVALUATION - dark band */}
        <section className="px-6 py-14 md:py-20 bg-graphite text-ivory">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14 items-end">
              <div className="md:col-span-7">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
                  Avaliação
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

            <div className="relative mb-12 md:mb-14 border-y border-ivory/15 py-12 md:py-16 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 md:col-start-2">
                <LazyVideoPlayer
                  src={draVideo.url}
                  poster={draVideoPoster.url}
                  label="Assistir mensagem da Dra. Jaqueline Martins"
                  className="rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                />
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne mb-4">
                  Diagnóstico
                </p>
                <p className="font-display text-2xl md:text-3xl text-ivory leading-snug mb-4">
                  Cada caso tem sinais únicos. A avaliação revela o caminho.
                </p>
                <p className="text-sm text-ivory/60 leading-relaxed max-w-md">
                  Quando indicada, a placa é confeccionada sob medida - depois de entender o seu caso, não antes.
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
        <section id="tratamento" className="px-6 py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
                  Tratamentos
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-graphite mb-6">
                Cuidado personalizado para proteger seus dentes e reduzir desconfortos.
              </h2>
              <p className="text-graphite/65 leading-relaxed">
                A placa pode fazer parte do cuidado, mas o tratamento começa com uma avaliação individual. A conduta envolve proteção dental, orientações específicas e acompanhamento clínico - sempre desenhada para o seu caso.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-px bg-border border border-border">
              {treatments.map((t, i) => (
                <article
                  key={t.title}
                  className="bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-accent-soft lg:col-span-4"
                >
                  <h3 className="font-display text-2xl text-graphite mt-5 mb-3">{t.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{t.desc}</p>
                </article>
              ))}
              <figure className="relative lg:col-span-4 min-h-[280px] overflow-hidden">
                <img
                  src={tratamentosImg}
                  alt="Detalhe editorial de bancada em mármore com instrumentos odontológicos em clínica premium."
                  width={1280}
                  height={1600}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-graphite/70 via-graphite/10 to-transparent text-ivory">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-champagne mb-3">Nota clínica</span>
                  <p className="font-display text-lg md:text-xl leading-snug max-w-xs">
                    Cada conduta é desenhada para o seu caso - não para um padrão.
                  </p>
                </figcaption>
              </figure>
            </div>

            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-graphite/45">
              · O tratamento indicado depende da avaliação individual de cada paciente.
            </p>
          </div>
        </section>
        </div>
        {/* /JOURNEY WRAPPER */}

        {/* AUTHORITY - Dra. Jaqueline */}
        <section id="sobre" className="px-6 py-16 md:py-24 bg-bone border-y border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 md:-inset-6 border border-champagne/40 -z-10" aria-hidden />
                <div className="absolute -bottom-6 -right-6 hidden md:block bg-graphite text-ivory px-6 py-4 max-w-[220px] z-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-champagne block mb-1">CRO-SP 86932</span>
                  <span className="font-display text-lg leading-tight">Dra. Jaqueline Martins</span>
                </div>
                <img
                  src={autoridadeImg.url}
                  alt="Retrato da Dra. Jaqueline Martins, cirurgiã-dentista, em sua clínica em São Paulo."
                  width={1120}
                  height={1400}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover saturate-[0.82] brightness-[1.03] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-bone/20 mix-blend-overlay pointer-events-none" aria-hidden="true" />
              </div>
            </div>
            <div className="md:col-span-6 order-1 md:order-2">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
                Dra. Jaqueline Martins
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-graphite mb-8">
                Autoridade clínica em estética e função do sorriso.
              </h2>
              <p className="font-display text-xl md:text-2xl text-graphite/85 leading-snug mb-8">
                A atuação da Dra. Jaqueline une estética, função e cuidado preventivo para preservar não apenas a aparência do sorriso, mas também sua saúde, conforto e estabilidade ao longo do tempo.
              </p>
              <p className="text-graphite/65 leading-relaxed mb-10 max-w-2xl">
                Cirurgiã-dentista formada em 2004, especialista em implantodontia e com mais de 21 anos de experiência clínica. Atende em duas unidades em São Paulo - Vila Formosa e São Miguel Paulista - com um cuidado individualizado para cada paciente.
              </p>

              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne mb-2">Pacientes</dt>
                  <dd className="font-display text-3xl md:text-4xl text-graphite">
                    +24.256
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne mb-2">Carreira</dt>
                  <dd className="font-display text-3xl md:text-4xl text-graphite">
                    +21 anos
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne mb-2">Unidades</dt>
                  <dd className="font-display text-3xl md:text-4xl text-graphite">
                    02
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CLINIC - full-bleed image */}
        <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
          <img
            src={clinicaImg}
            alt="Interior da clínica odontológica da Dra. Jaqueline Martins, com luz natural e ambiente acolhedor."
            width={1920}
            height={1200}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/25 to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
              Estrutura
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ivory max-w-4xl text-balance">
              Uma clínica preparada para cuidar do seu sorriso com precisão e acolhimento.
            </h2>
          </div>
        </section>

        {/* CLINIC - diferenciais */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne mb-10">
              O que você encontra
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clinic.map((c) => (
                <article key={c.title} className="border border-border bg-card p-8">
                  <h3 className="font-display text-xl text-graphite mt-5 mb-3">{c.title}</h3>
                  <p className="text-sm text-graphite/65 leading-relaxed">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 py-14 md:py-20 bg-bone border-y border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-6">
                  Dúvidas frequentes
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-graphite">
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
        <section className="px-6 py-16 md:py-24 bg-graphite text-ivory overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-5">
                Agende sua avaliação
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-ivory mb-5 text-balance">
                Não espere o desgaste aparecer para cuidar do seu sorriso.
              </h2>
              <p className="text-ivory/70 leading-relaxed mb-8 max-w-xl">
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
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/45">
                A avaliação revela o caminho
              </p>
            </div>
            <div className="md:col-span-6 relative flex justify-center md:justify-end" aria-hidden="true">
              <img
                src={plaquinhaRepouso}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                className="plaquinha w-72 md:w-96 lg:w-[28rem]"
                style={{ filter: "drop-shadow(0 20px 40px oklch(0 0 0 / 0.5))" }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
       <footer className="px-6 py-16 bg-background">
         <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-border">
              <div className="md:col-span-4">
                <img
                  src={logoAsset.url}
                  alt="Dra. Jaqueline Martins - Odontologia Estética"
                  className="h-28 md:h-36 w-auto mb-5"
                />

                <p className="text-sm text-graphite/60 max-w-sm leading-relaxed">
                  Odontologia avançada com foco em estética, função e cuidado individualizado.
                </p>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne mb-5">Unidades</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-graphite/90 mb-1">Vila Formosa</p>
                    <div className="flex items-start gap-2 text-sm text-graphite/70 leading-relaxed">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-champagne/70" />
                      <span>Av. Dr. Eduardo Cotching, 1472 - Sala 6<br />São Paulo</span>
                    </div>
                    <a href="tel:1141160605" className="flex items-center gap-2 text-sm text-graphite/70 hover:text-champagne transition-colors mt-1">
                      <Phone className="w-4 h-4 shrink-0 text-champagne/70" />
                      <span>(11) 4116-0605</span>
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-graphite/90 mb-1">São Miguel Paulista</p>
                    <div className="flex items-start gap-2 text-sm text-graphite/70 leading-relaxed">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-champagne/70" />
                      <span>Rua Pedro Avelino, 70<br />São Paulo</span>
                    </div>
                    <a href="tel:1120371211" className="flex items-center gap-2 text-sm text-graphite/70 hover:text-champagne transition-colors mt-1">
                      <Phone className="w-4 h-4 shrink-0 text-champagne/70" />
                      <span>(11) 2037-1211</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne mb-4">Horários</h3>
                <ul className="space-y-2 text-sm text-graphite/70">
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-champagne/70" />
                    <span>Segunda à Sexta: 09:00 - 18:00</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-champagne/70" />
                    <span>Sábado: 09:00 - 12:00</span>
                  </li>
                </ul>
                <p className="text-[11px] text-graphite/45 mt-3 leading-relaxed">Horários iguais nas duas unidades.</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne mb-4">Contato</h3>
                <ul className="space-y-2 text-sm text-graphite/70">
                  <li>
                    <a href={ctaFinalHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-champagne transition-colors">
                      <MessageCircle className="w-4 h-4 shrink-0 text-champagne/70" />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                </ul>
                <div className="mt-5 space-y-2">
                  <a href="https://instagram.com/dra.jaquelinemartins" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-graphite/70 hover:text-champagne transition-colors">
                    <Instagram className="w-4 h-4 shrink-0 text-champagne/70" />
                    <span>@dra.jaquelinemartins</span>
                  </a>
                  <a href="https://instagram.com/jaqueline.martinsbarrientos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-graphite/70 hover:text-champagne transition-colors">
                    <Instagram className="w-4 h-4 shrink-0 text-champagne/70" />
                    <span>@jaqueline.martinsbarrientos</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-graphite/45 leading-relaxed max-w-2xl">
                As informações desta página são educativas e não substituem uma avaliação odontológica individual.
              </p>
              <p className="text-xs text-graphite/45">CRO-SP 86932</p>
            </div>
         </div>
       </footer>

      {/* Mobile sticky CTA */}
      <a
        href={ctaFinalHref}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-4 inset-x-4 z-50 inline-flex items-center justify-center bg-graphite text-ivory px-6 py-4 text-[12px] uppercase tracking-[0.18em] font-medium shadow-[var(--shadow-elevated)] hover:bg-champagne hover:text-graphite transition-colors"
      >
        Agendar avaliação
      </a>
      <div className="md:hidden h-20" aria-hidden />
    </div>
  );
}
