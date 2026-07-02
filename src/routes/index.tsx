import React, { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MapPin, Clock, Instagram, MessageCircle, Star, Sunrise, Brain, Snowflake, Layers, Waves, Activity, ShieldAlert, Thermometer, HeartPulse, RotateCw, TriangleAlert, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { PlaquinhaJourney } from "@/components/PlaquinhaJourney";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { LazyVideoPlayer } from "@/components/LazyVideoPlayer";

import autoridadeImg from "@/assets/dra-jaqueline-autoridade.jpg.asset.json";
import clinicaImg from "@/assets/clinica-estrutura.jpg";
import tratamentosImg from "@/assets/tratamentos-detalhe-v2.jpg.asset.json";
import plaquinhaRepouso from "@/assets/plaquinha-repouso.png";
import logoAsset from "@/assets/jm-monogram.png.asset.json";
import draVideo from "@/assets/dra-jaqueline-video.mp4.asset.json";
import draVideoPoster from "@/assets/dra-jaqueline-video-poster.jpg.asset.json";
import heroDraAsset from "@/assets/hero_dra_jaqueline_v5.png.asset.json";

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
  { icon: Sunrise, title: "Dor ou cansaço na mandíbula", desc: "Sente dor ou cansaço na mandíbula ao acordar ou ao mastigar?" },
  { icon: Brain, title: "Dores de cabeça ao acordar", desc: "Acorda com dor de cabeça nas têmporas ou na região frontal com frequência?" },
  { icon: Snowflake, title: "Dentes sensíveis", desc: "Seus dentes ficaram sensíveis ao frio, calor ou doce sem causa aparente?" },
  { icon: Layers, title: "Desgaste ou pequenas fraturas", desc: "Notou os dentes mais curtos, com bordas lascadas ou pequenas trincas?" },
  { icon: Waves, title: "Estalos ou desconforto na ATM", desc: "Sua mandíbula estala, trava ou incomoda ao abrir a boca?" },
  { icon: Activity, title: "Tensão facial e travamento", desc: "Percebe o rosto tenso ou a mandíbula travada em momentos de estresse?" },
];

const consequences = [
  { icon: ShieldAlert, title: "Desgaste do esmalte dental", desc: "A força repetida fragiliza a camada que protege o dente." },
  { icon: Thermometer, title: "Sensibilidade nos dentes", desc: "A perda de estrutura expõe regiões sensíveis a estímulos do dia a dia." },
  { icon: HeartPulse, title: "Dor muscular e facial", desc: "Os músculos da face podem ficar sobrecarregados e doloridos." },
  { icon: RotateCw, title: "Sobrecarga na ATM", desc: "A articulação que move a mandíbula sofre com o esforço excessivo." },
  { icon: TriangleAlert, title: "Fraturas em dentes ou restaurações", desc: "Pequenas fissuras podem evoluir para perdas estruturais." },
  { icon: Sparkles, title: "Comprometimento estético do sorriso", desc: "O desgaste muda a forma dos dentes e a harmonia do sorriso." },
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
      className={`inline-flex items-center justify-center bg-petrol text-ivory px-8 py-4 text-[13px] tracking-wide font-medium hover:bg-champagne hover:text-petrol transition-all duration-300 hover:scale-[1.03] animate-cta-glow ${className}`}
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
      className={`inline-flex items-center justify-center border border-graphite/20 text-graphite px-8 py-4 text-[13px] tracking-wide font-medium hover:border-graphite hover:bg-petrol hover:text-ivory transition-colors duration-300 ${className}`}
    >
      {label}
    </a>
  );
}


function LandingPage() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [fabVisible, setFabVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setFabVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger de animação do Hero: adiciona .hero-play no próximo frame
  // garantindo que o estado inicial (invisível) seja pintado antes das keyframes.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => el.classList.add("hero-play"));
      (el as any).__raf2 = raf2;
    });
    return () => {
      cancelAnimationFrame(raf1);
      if ((el as any).__raf2) cancelAnimationFrame((el as any).__raf2);
    };
  }, []);



  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center" aria-label="Dra. Jaqueline Martins - Odontologia Estética">
            <img
              src={logoAsset.url}
              alt="Dra. Jaqueline Martins - Odontologia Estética"
              className="h-10 md:h-12 w-auto"
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
            className="inline-flex items-center bg-petrol text-ivory px-4 py-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] hover:bg-champagne hover:text-petrol transition-colors duration-300"
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
        <section ref={heroRef} className="hero-bg hero-bg-anim relative px-6 pt-10 md:pt-14 pb-12 md:pb-16 overflow-x-clip lg:min-h-[760px]">

          {/* Mobile background image — transparência para texto sobrepor */}
          <div className="lg:hidden absolute inset-0 z-0 pointer-events-none hero-figure-in-anim overflow-hidden">
            <img
              src={heroDraAsset.url}
              alt=""
              aria-hidden
              className="absolute right-[-20%] bottom-0 h-[85%] w-auto max-w-none opacity-20 select-none hero-figure-fade"
              draggable={false}
            />
          </div>

          <div className="max-w-7xl mx-auto relative">
            {/* Desktop image — ancorada à direita com respiro, proporção natural */}
            <div className="hidden lg:flex absolute right-[3%] bottom-0 top-0 w-[52%] max-w-[620px] z-10 pointer-events-none hero-figure-in-anim items-end justify-end">
              <img
                src={heroDraAsset.url}
                alt="Dra. Jaqueline Martins"
                className="w-full h-auto select-none"
                draggable={false}
              />
            </div>

            {/* Text column */}
            <div className="relative z-20 flex flex-col lg:max-w-[54%] hero-text-glow">
              <p className="hero-fade-up-lg font-mono text-[10px] uppercase tracking-[0.32em] label-mono mb-8" style={{ animationDelay: "500ms" }}>
                Odontologia Estética e Funcional · Bruxismo
              </p>
              <h1 className="font-display font-medium text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tight text-balance text-petrol mb-8">
                <span className="hero-line-mask"><span className="hero-line-inner" style={{ animationDelay: "600ms" }}>Você pode estar <span className="hero-em">apertando<span className="hero-underline-line" aria-hidden /></span></span></span>
                <span className="hero-line-mask"><span className="hero-line-inner" style={{ animationDelay: "800ms" }}>os dentes</span></span>
                <span className="hero-line-mask"><span className="hero-line-inner" style={{ animationDelay: "1000ms" }}>sem perceber.</span></span>
              </h1>
              <p className="hero-fade-up-lg text-base md:text-lg text-graphite/80 max-w-xl leading-relaxed mb-10" style={{ animationDelay: "1150ms" }}>
                Dor na mandíbula, dores de cabeça ao acordar, sensibilidade nos dentes e tensão facial podem ser sinais de bruxismo ou apertamento dental. Uma avaliação cuidadosa ajuda a entender o seu caso e proteger seu sorriso.
              </p>

              <div className="hero-fade-up-lg flex flex-col items-start gap-3 mb-4" style={{ animationDelay: "1300ms" }}>
                <PrimaryCta href={ctaPrimaryHref} label="Agendar avaliação pelo WhatsApp" />
                <a
                  href={ctaSecondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-graphite/75 underline underline-offset-[6px] decoration-champagne/50 hover:text-graphite hover:decoration-champagne transition-colors"
                >
                  Tenho dor na mandíbula, quero falar sobre isso
                </a>
              </div>
            </div>

            {/* Credentials — faixa full-width abaixo, quebra o eixo de duas colunas */}
            <ul className="relative z-20 mt-10 lg:mt-16 pt-6 border-t border-champagne/40 flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-x-6 text-[11px] uppercase tracking-[0.18em] text-graphite/75">
              {["+21 anos de experiência", "Odontologia estética e funcional", "Vila Formosa e São Miguel Paulista"].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <li className="whitespace-nowrap hero-fade-up-lg" style={{ animationDelay: `${1450 + i * 120}ms` }}>{item}</li>
                  {i < arr.length - 1 && <li className="hidden lg:block text-champagne/60" aria-hidden>·</li>}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </section>


        {/* SYMPTOMS - "O bruxismo deixa pistas." */}
        <section id="sintomas" className="px-6 py-14 md:py-20 bg-bone border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10 max-w-4xl">
              <p className="font-mono text-sm uppercase tracking-[0.2em] label-mono mb-6">
                Identifique-se
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-petrol mb-6">
                O bruxismo deixa pistas.
              </h2>
              <p className="text-graphite/80 leading-relaxed md:text-lg">
                Muitas pessoas convivem com sinais de bruxismo por meses ou anos sem perceber. Ele pode acontecer durante o sono ou ao longo do dia, em momentos de tensão, concentração ou ansiedade.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {symptoms.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className="group bg-background p-5 md:p-6 transition-colors duration-300 hover:bg-accent-soft"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon aria-hidden strokeWidth={1.4} size={20} className="text-champagne shrink-0" />
                      <h3 className="font-display text-lg md:text-xl text-petrol leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-sm text-graphite/75 leading-snug">{s.desc}</p>
                  </article>

                );
              })}
            </div>


            <div className="mt-10 flex flex-col items-center text-center border-t border-border pt-8 gap-6">
              <p className="font-display text-xl md:text-2xl text-graphite/85 leading-snug italic max-w-2xl">
                Se esses sinais aparecem com frequência, é hora de investigar.{"\u00a0"}<br />
                O bruxismo age em silêncio antes de deixar marcas visíveis.
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
              <div key={stat.tag} className="px-8 py-8 md:px-10 md:py-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] label-mono block mb-3">
                  {stat.tag}
                </span>
                <div className="font-display text-4xl md:text-5xl lg:text-6xl text-petrol leading-none mb-2">
                  <AnimatedNumber value={stat.value} prefix={"prefix" in stat ? stat.prefix : undefined} formatter={"formatter" in stat ? stat.formatter : undefined} />{" "}
                  <span className="text-base md:text-lg text-graphite/75 align-middle">{stat.unit}</span>
                </div>
                <p className="text-[13px] text-graphite/75 mt-3 leading-snug max-w-xs">{stat.desc}</p>

              </div>
            ))}
          </div>
        </section>

        {/* CONSEQUENCES */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-8 md:mb-10">
                <p className="font-mono text-sm uppercase tracking-[0.2em] label-mono mb-6">
                  Consequências
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-petrol mb-6">
                O bruxismo pode deixar marcas no seu sorriso e na sua qualidade de vida.
              </h2>
              <p className="text-graphite/80 leading-relaxed">
                Quando os dentes recebem força excessiva de forma repetida, o impacto pode aparecer nos dentes, na musculatura e na articulação da mandíbula.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {consequences.map((c) => {
                const Icon = c.icon;
                return (
                  <article
                    key={c.title}
                    className="bg-card border border-border p-5 md:p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon aria-hidden strokeWidth={1.4} size={20} className="text-champagne shrink-0" />
                      <h3 className="font-display text-lg md:text-xl text-petrol leading-tight">{c.title}</h3>
                    </div>
                    <p className="text-sm text-graphite/75 leading-snug">{c.desc}</p>
                  </article>

                );
              })}
            </div>


            <div className="mt-10 flex flex-col items-center text-center gap-5 border-t border-border pt-8">
              <p className="font-display text-xl md:text-2xl text-graphite/85 leading-snug max-w-xl">
                Muitas dessas marcas começam silenciosas e podem ser interrompidas com a avaliação certa.
              </p>
              <PrimaryCta href={ctaConsequencesHref} label="Quero entender se isso pode ser bruxismo" />
            </div>
          </div>
        </section>

        {/* EVALUATION - dark band */}
        <section className="px-6 py-10 md:py-14 bg-petrol text-ivory">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <LazyVideoPlayer
                  src={draVideo.url}
                  poster={draVideoPoster.url}
                  label="Assistir mensagem da Dra. Jaqueline Martins"
                  aspectRatio="16 / 9"
                  className="rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                />
              </div>

              <div className="md:col-span-7">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-5">
                  Avaliação
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ivory mb-6">
                  O tratamento começa entendendo o seu caso.
                </h2>
                <p className="text-ivory/85 leading-relaxed mb-8 md:mb-10 max-w-xl">
                  Nem todo bruxismo é igual. A avaliação odontológica é essencial para identificar sinais de desgaste, pontos de dor, hábitos associados e possíveis fatores que estejam contribuindo para o apertamento.
                </p>

                <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                  {steps.map((step) => (
                    <li key={step.title} className="border-l border-ivory/15 pl-5">
                      <h3 className="font-display text-2xl md:text-3xl text-ivory mb-2 leading-tight">{step.title}</h3>
                      <p className="text-sm text-ivory/75 leading-relaxed">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* TREATMENTS */}
        <section id="tratamento" className="px-6 py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-8 md:mb-10">
                <p className="font-mono text-sm uppercase tracking-[0.2em] label-mono mb-6">
                  Tratamentos
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-petrol mb-6">
                Cuidado personalizado para proteger seus dentes e reduzir desconfortos.
              </h2>
              <p className="text-graphite/78 leading-relaxed">
                A placa pode fazer parte do cuidado, mas o tratamento começa com uma avaliação individual. A conduta envolve proteção dental, orientações específicas e acompanhamento clínico - sempre desenhada para o seu caso.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-px bg-border border border-border">
              {treatments.map((t, i) => (
                <article
                  key={t.title}
                  className="bg-background p-6 md:p-7 transition-colors duration-300 hover:bg-accent-soft lg:col-span-4"
                >
                  <h3 className="font-display text-xl md:text-2xl text-petrol mb-2">{t.title}</h3>
                  <p className="text-sm text-graphite/78 leading-snug">{t.desc}</p>
                </article>
              ))}
              <figure className="relative lg:col-span-4 min-h-[220px] overflow-hidden">
                <img
                  src={tratamentosImg.url}
                  alt="Detalhe editorial de bancada em mármore com instrumentos odontológicos em clínica premium."
                  width={1280}
                  height={1600}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-graphite/70 via-graphite/10 to-transparent text-ivory">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-champagne mb-2">{"\n"}</span>
                  <p className="font-display text-base md:text-lg leading-snug max-w-xs">
                    Cada conduta é desenhada para o seu caso não para um padrão.
                  </p>
                </figcaption>
              </figure>
            </div>

            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-graphite/70">
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
                <div className="absolute -bottom-6 -right-6 hidden md:block bg-petrol text-ivory px-6 py-4 max-w-[220px] z-10">
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
              <p className="font-mono text-sm uppercase tracking-[0.2em] label-mono mb-6">
                Dra. Jaqueline Martins
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-petrol mb-8">
                Autoridade clínica em estética e função do sorriso.
              </h2>
              <p className="font-display text-xl md:text-2xl text-graphite/85 leading-snug mb-8">
                A atuação da Dra. Jaqueline une estética, função e cuidado preventivo para preservar não apenas a aparência do sorriso, mas também sua saúde, conforto e estabilidade ao longo do tempo.
              </p>
              <p className="text-graphite/78 leading-relaxed mb-10 max-w-2xl">
                Cirurgiã-dentista formada em 2004, especialista em implantodontia e com mais de 21 anos de experiência clínica. Atende em duas unidades em São Paulo - Vila Formosa e São Miguel Paulista - com um cuidado individualizado para cada paciente.
              </p>

              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] label-mono mb-2">Pacientes</dt>
                  <dd className="font-display text-3xl md:text-4xl text-petrol">
                    +24.256
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] label-mono mb-2">Carreira</dt>
                  <dd className="font-display text-3xl md:text-4xl text-petrol">
                    +21 anos
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] label-mono mb-2">Unidades</dt>
                  <dd className="font-display text-3xl md:text-4xl text-petrol">
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
            <p className="font-mono text-sm uppercase tracking-[0.2em] label-mono mb-6">
              {"\n"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ivory max-w-4xl text-balance">
              Uma clínica preparada para cuidar do seu sorriso com precisão e acolhimento.
            </h2>
          </div>
        </section>

        {/* CLINIC - diferenciais */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] label-mono mb-10">
              O que você encontra
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {clinic.map((c) => (
                <article key={c.title} className="border border-border bg-card p-6 md:p-7">
                  <h3 className="font-display text-xl md:text-2xl text-petrol mb-2">{c.title}</h3>
                  <p className="text-sm text-graphite/78 leading-snug">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF - Google reviews */}
        <section id="avaliacoes" className="px-6 py-10 md:py-14 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] label-mono mb-5">
              Reputação
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-1" aria-label="Avaliação 5 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    aria-hidden
                    className="w-4 h-4 md:w-[18px] md:h-[18px] text-champagne"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="font-display text-2xl md:text-3xl text-petrol leading-none">5,0</span>
              <span className="hidden sm:block h-5 w-px bg-graphite/20" aria-hidden />
              <span className="text-sm md:text-base text-graphite/80">
                +670 avaliações no Google
              </span>
              <span className="hidden sm:block h-5 w-px bg-graphite/20" aria-hidden />
              <span className="inline-flex items-center gap-2">
                <svg aria-hidden viewBox="0 0 48 48" className="w-4 h-4">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/75">Google Reviews</span>
              </span>
            </div>

            <p className="text-xs md:text-sm text-graphite/70 mt-5">
              {"\n"}
            </p>
          </div>
        </section>


        {/* FAQ */}

        <section id="faq" className="px-6 py-14 md:py-20 bg-bone border-y border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
                <p className="font-mono text-sm uppercase tracking-[0.2em] label-mono mb-6">
                  Dúvidas frequentes
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-petrol">
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
                  <AccordionTrigger className="font-display text-lg md:text-xl text-petrol hover:text-champagne py-6 text-left">
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
        <section className="px-6 py-16 md:py-24 bg-petrol text-ivory overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-champagne mb-5">
                Agende sua avaliação
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-ivory mb-5 text-balance">
                Não espere o desgaste aparecer para cuidar do seu sorriso.
              </h2>
              <p className="text-ivory/85 leading-relaxed mb-8 max-w-xl">
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
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/75">
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
                  className="h-20 md:h-24 w-auto mb-5"
                />

                <p className="text-sm text-graphite/75 max-w-sm leading-relaxed">
                  Odontologia avançada com foco em estética, função e cuidado individualizado.
                </p>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] label-mono mb-5">Unidades</h3>
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
                <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] label-mono mb-4">Horários</h3>
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
                <p className="text-[11px] text-graphite/70 mt-3 leading-relaxed">Horários iguais nas duas unidades.</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] label-mono mb-4">Contato</h3>
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
              <p className="text-xs text-graphite/70 leading-relaxed max-w-2xl">
                As informações desta página são educativas e não substituem uma avaliação odontológica individual.
              </p>
              <p className="text-xs text-graphite/70">CRO-SP 86932</p>
            </div>
         </div>
       </footer>

      {/* Floating WhatsApp FAB - desktop & mobile */}
      <div
        className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 transition-all duration-700 ease-out ${
          fabVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-hidden={!fabVisible}
      >
        <a
          href={ctaFinalHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar pelo WhatsApp"
          className="fab-whatsapp group relative w-14 h-14 md:w-16 md:h-16 rounded-full grid place-items-center bg-petrol text-champagne border border-champagne/50 shadow-[0_12px_32px_-8px_oklch(0.265_0.005_75/0.45)] hover:bg-champagne hover:text-petrol transition-[background-color,color,transform,box-shadow] duration-300 hover:scale-110 hover:shadow-[0_18px_44px_-8px_oklch(0.265_0.005_75/0.6)]"
        >
          <span aria-hidden className="fab-ring" />
          <span aria-hidden className="fab-ring fab-ring--delay" />
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fab-icon w-6 h-6 md:w-7 md:h-7 relative"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>



    </div>
  );
}
