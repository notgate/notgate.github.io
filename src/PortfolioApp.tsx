import type { ReactNode } from 'react'

import { PROJECT_ROUTES, getPageKey, type PageKey, type ProjectPageKey } from './projectRoutes'

type ProjectRoute = (typeof PROJECT_ROUTES)[number]

type ProjectPreviewProps = {
  project: ProjectRoute
}

function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <article className="project-preview">
      <a href={project.href}>
        <img src={project.image} alt={project.alt} className="project-image" loading="lazy" />
      </a>
      <p className="project-preview-heading">
        <b><a href={project.href}>{project.title}</a></b><br />
        <span className="small">{project.category}</span>
      </p>
      <p className="project-preview-summary">{project.summary}</p>
      <p className="case-study-link"><a href={project.href}>Read the case study</a></p>
    </article>
  )
}

type ProjectFigureProps = {
  src: string
  alt: string
  caption: string
  className?: string
}

function ProjectFigure({ src, alt, caption, className = '' }: ProjectFigureProps) {
  return (
    <figure className={className}>
      <a href={src} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} loading="lazy" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

type SiteLayoutProps = {
  current: PageKey
  bannerTitle: string
  bannerSummary: string
  children: ReactNode
}

function SiteNavigation({ current }: { current: PageKey }) {
  return (
    <nav id="leftside" aria-label="Portfolio sections">
      <h2 className="hide">Menu</h2>
      <ul className="avmenu">
        <li><a className={current === 'home' ? 'current' : undefined} href="/">Overview</a></li>
        <li><a href="/#education">Education</a></li>
        <li><a href="/#selected-projects">Projects</a></li>
        {PROJECT_ROUTES.map((project) => (
          <li className="subitem" key={project.key}>
            <a className={current === project.key ? 'current' : undefined} href={project.href}>{project.navLabel}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SiteLayout({ current, bannerTitle, bannerSummary, children }: SiteLayoutProps) {
  return (
    <div id="wrap">
      <header id="header">
        <h1><a href="/">Paul — Engineering Portfolio</a></h1>
      </header>

      <div id="frontphoto" className="header-band" role="img" aria-label={`${bannerTitle}. ${bannerSummary}`}>
        <strong>{bannerTitle}</strong>
        <span>{bannerSummary}</span>
      </div>

      <SiteNavigation current={current} />
      <main id="contentwide">{children}</main>

      <footer id="footer">
        <p>
          <span>© Uthso Paul</span><br />
          Project hierarchy informed by <a href="http://evanjuras.com/" target="_blank" rel="noreferrer">Evan Juras</a>; template design by <a href="https://andreasviklund.com/templates/" target="_blank" rel="noreferrer">Andreas Viklund</a>.
        </p>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <SiteLayout
      current="home"
      bannerTitle="Embedded systems · signal processing · hardware design"
      bannerSummary="Short project summaries here; complete engineering evidence on each dedicated case-study page."
    >
      <section aria-labelledby="overview">
        <h2 id="overview">Overview</h2>
        <p>
          My name is Uthso Paul. I am an electrical and computer engineering student at New York Institute of Technology who builds embedded-audio, digital-hardware, sensing, and hardware/software integration projects. This portfolio focuses on what I designed, what I tested, and what remains unfinished.
        </p>
        <p>
          Select a project below for its complete description, engineering evidence, images, validation boundaries, and source material.
        </p>
        <ul id="profile-links">
          <li><a href="https://github.com/notgate" target="_blank" rel="noreferrer">GitHub profile</a></li>
          <li><a href="https://www.linkedin.com/in/uthsopaul/" target="_blank" rel="noreferrer">LinkedIn profile</a></li>
        </ul>
        <p>If you only have time to review three projects, start here:</p>
        <ol>
          <li><a href="/speech-to-text.html">Speech-to-Text Audio Communications</a></li>
          <li><a href="/pokemon-vhdl.html">Game Boy–Inspired VHDL Architecture Study</a></li>
          <li><a href="/switch-modchip.html">Nintendo Switch RP2040 Modchip Installation</a></li>
        </ol>
      </section>

      <hr />
      <section aria-labelledby="education">
        <h3 id="education">Education</h3>
        <div className="education-entry">
          <img
            className="education-mark"
            src="/assets/nyit-bears.svg"
            alt="NYIT Bears logo"
            width="250"
            height="239"
          />
          <p>
            <b>New York Institute of Technology (NYIT)</b><br />
            Bachelor of Engineering in Electrical and Computer Engineering<br />
            2023–2027 · Current GPA: 3.1 · Dean&apos;s List
          </p>
        </div>
      </section>

      <hr />
      <section aria-labelledby="selected-projects">
        <h3 id="selected-projects">Selected Projects</h3>
        <p>Each entry is a short orientation. Open its dedicated page for the complete case study.</p>

        <h4>Featured engineering work</h4>
        <div className="project-grid">
          {PROJECT_ROUTES.slice(0, 2).map((project) => <ProjectPreview key={project.key} project={project} />)}
        </div>

        <h4>Academic and early hardware work</h4>
        <div className="project-grid">
          {PROJECT_ROUTES.slice(2).map((project) => <ProjectPreview key={project.key} project={project} />)}
        </div>
      </section>
    </SiteLayout>
  )
}

function ProjectLayout({
  current,
  bannerTitle,
  bannerSummary,
  children,
}: {
  current: ProjectPageKey
  bannerTitle: string
  bannerSummary: string
  children: ReactNode
}) {
  return (
    <SiteLayout current={current} bannerTitle={bannerTitle} bannerSummary={bannerSummary}>
      {children}
      <p className="back-to-projects"><a href="/#selected-projects">Return to all projects</a></p>
    </SiteLayout>
  )
}

function SpeechPage() {
  return (
    <ProjectLayout
      current="speech"
      bannerTitle="Embedded audio · offline speech recognition"
      bannerSummary="Dual digital microphones, a Rust audio path, local ASR design, and an editable KiCad carrier."
    >
      <article className="project-detail" aria-labelledby="speech-to-text-audio">
        <h2 id="speech-to-text-audio">Speech-to-Text Audio Communications</h2>
        <p className="project-meta">Personal engineering project · Raspberry Pi 4 · Rust · I²S · KiCad · faster-whisper · 2026</p>
        <hr />

        <h3>Description</h3>
        <p>
          I developed a Raspberry Pi 4 proof of concept for converting local microphone input into text without relying on a cloud transcription service. Two SPH0645-style digital MEMS microphones are arranged as a synchronized stereo input path for comparing channels before audio is converted to the 16 kHz mono format expected by the recognizer.
        </p>
        <p>
          The hardware-facing backend is written in Rust. It implements bounded capture, borrowed overlapping audio chunks, WAV decoding and writing, channel combination, resampling, Hann-window FFT comparison, and a bounded GCC-PHAT delay estimate. The intended end-to-end path uses faster-whisper for local recognition and Bluetooth HID for keyboard-style delivery of the final text.
        </p>

        <ProjectFigure
          src="/projects/speech-to-text/carrier-3d.png"
          alt="KiCad three-dimensional view of the dual-SPH0645 carrier board"
          caption="Editable dual-microphone carrier design. This is a KiCad render, not a photograph of a fabricated PCB."
          className="hero-figure"
        />

        <h3>System architecture</h3>
        <ProjectFigure
          src="/projects/speech-to-text/system-flow.png"
          alt="Flow diagram from two I2S microphones through audio capture, FFT analysis, local speech recognition, and Bluetooth HID output"
          caption="Planned offline voice-input pipeline from dual microphones to a host device."
          className="wide-figure"
        />
        <ul>
          <li><b>Compute:</b> Raspberry Pi 4B with 2 GB RAM.</li>
          <li><b>Capture:</b> two SPH0645 I²S microphone breakouts sharing bit clock, word-select, and data lines; opposite SELECT states assign left and right slots.</li>
          <li><b>Geometry:</b> the carrier fixes microphone centers 25 mm apart and is designed around a 48 ksample/s stereo capture path.</li>
          <li><b>Recognizer preparation:</b> the Rust pipeline converts stereo WAV input to 16 kHz mono audio.</li>
          <li><b>Output concept:</b> gated Bluetooth keyboard output after local transcription and text cleanup.</li>
        </ul>

        <h3>Engineering evidence</h3>
        <div className="table-scroll" role="region" aria-label="Speech project verification status" tabIndex={0}>
          <table className="evidence-table">
            <thead>
              <tr><th>Area</th><th>Current evidence</th><th>Boundary</th></tr>
            </thead>
            <tbody>
              <tr><td>KiCad electrical rules</td><td>0 errors / 0 warnings</td><td>Design-source check, not physical operation</td></tr>
              <tr><td>KiCad board rules</td><td>0 violations / 0 unconnected pads</td><td>PCB has not been fabricated</td></tr>
              <tr><td>Rust backend</td><td>11 automated tests passing</td><td>Generated WAV fixtures; Pi ALSA timing is unmeasured</td></tr>
              <tr><td>Physical prototype</td><td>Breadboard and dual-microphone photographs</td><td>No preserved synchronized capture benchmark</td></tr>
              <tr><td>ASR and HID</td><td>Pipeline design and local-recognition work</td><td>No publishable WER, latency, or end-to-end HID benchmark yet</td></tr>
            </tbody>
          </table>
        </div>

        <div className="image-pair">
          <ProjectFigure
            src="/projects/speech-to-text/carrier-routing.png"
            alt="Two-layer PCB routing view for the dual-microphone carrier"
            caption="Two-layer carrier routing and test-point layout."
          />
          <ProjectFigure
            src="/projects/speech-to-text/breadboard-prototype.jpg"
            alt="Raspberry Pi connected to two MEMS microphone breakout boards on a breadboard"
            caption="Earlier Raspberry Pi and dual-microphone breadboard prototype."
          />
        </div>

        <h3>Project takeaways</h3>
        <ul>
          <li>Audio quality and channel timing are engineering inputs to ASR, not problems the language model automatically fixes.</li>
          <li>A credible comparison needs repeatable microphone geometry, source distance, background-noise conditions, and measured latency/error metrics.</li>
          <li>Separating verified design checks from unmeasured physical performance made the next validation steps explicit.</li>
        </ul>
        <p className="project-links">
          <a href="https://github.com/notgate/sph0645f_asr" target="_blank" rel="noreferrer">View source, KiCad files, tests, and project data on GitHub</a>
        </p>
      </article>
    </ProjectLayout>
  )
}

function VibroacousticPage() {
  return (
    <ProjectLayout
      current="vibroacoustic"
      bannerTitle="Structural response · piezoelectric sensing"
      bannerSummary="A planned two-channel cantilever experiment with explicit model and measurement boundaries."
    >
      <article className="project-detail" aria-labelledby="vibroacoustic-monitoring">
        <h2 id="vibroacoustic-monitoring">Vibroacoustic Condition Monitoring</h2>
        <p className="project-meta">Current design study · structural response · ESP32-S3 · piezoelectric sensing · 2026</p>
        <hr />
        <h3>Description</h3>
        <p>
          This project asks whether two low-cost piezo response channels can repeatedly distinguish an unchanged aluminum cantilever from a reversible mass or boundary-condition change. The current work includes the mechanical layout, protected two-channel wiring specification, experiment protocol, data contract, and an executable conceptual two-degree-of-freedom model.
        </p>
        <p>
          The model and renderings are planning artifacts, not measured validation. Manual impact force is not measured, the ESP32-S3 ADC channels are sequentially sampled, and the project does not claim calibrated force response, crack detection, or industrial readiness.
        </p>
        <ProjectFigure
          src="/projects/vibroacoustic/prototype-concept.png"
          alt="Concept rendering of an aluminum cantilever with two piezo sensors and ESP32 acquisition"
          caption="Conceptual assembly rendering. Hardware has not yet been assembled or measured."
          className="hero-figure"
        />
      </article>
    </ProjectLayout>
  )
}

function VhdlPage() {
  return (
    <ProjectLayout
      current="vhdl"
      bannerTitle="Digital hardware · VHDL · VGA timing"
      bannerSummary="An academic architecture study with candid boundaries and focused display-controller evidence."
    >
      <article className="project-detail" aria-labelledby="pokemon-vhdl">
        <h2 id="pokemon-vhdl">Game Boy–Inspired VHDL Architecture Study</h2>
        <p className="project-meta">Academic team project with Richard Gill · VHDL · ModelSim · December 2024</p>
        <hr />

        <h3>Description</h3>
        <p>
          This course project attempted to express a small Pokémon/Game Boy–inspired game architecture as synchronous digital hardware. The planned modules covered player input, game states, battle behavior, profile and team data, map logic, memory control, and VGA display timing.
        </p>
        <p>
          The complete game and CPU/memory architecture were not successfully validated. A central lesson was that VHDL describes concurrent hardware rather than a sequence of software instructions; several early modules were designed with software-style assumptions and would need to be re-architected before synthesis.
        </p>

        <h3>What worked</h3>
        <p>
          My strongest part of the project was the display-controller work: horizontal and vertical counters, active-video gating, HSYNC/VSYNC timing, pixel coordinates, and RGB selection between map and sprite inputs. I inspected the signal behavior in ModelSim. The original report states that the team worked with no board or output display, so the surviving evidence is VHDL source and simulation rather than FPGA deployment.
        </p>
        <div className="image-pair">
          <ProjectFigure
            src="/projects/pokemon-vhdl/vga-output-logic.png"
            alt="VHDL source excerpt implementing VGA synchronization and RGB selection"
            caption="VGA synchronization, active-video, coordinate, and RGB-selection logic."
          />
          <ProjectFigure
            src="/projects/pokemon-vhdl/vga-simulation-waveform.png"
            alt="ModelSim waveform for the display-controller simulation"
            caption="Display-controller simulation waveform used to inspect counters and output timing."
          />
        </div>

        <h3>Project takeaways</h3>
        <ul>
          <li>Start from clocked datapaths, registers, memories, and finite-state machines rather than translating software objects directly into HDL.</li>
          <li>Validate one synthesizable subsystem at a time with a focused testbench before integrating a larger architecture.</li>
          <li>Scope an FPGA project around demonstrable hardware behavior; a complete game architecture was too broad for the available semester.</li>
        </ul>
        <p className="project-links">
          <a href="https://github.com/notgate/pokemon-vhdl-architecture-study" target="_blank" rel="noreferrer">View the archived project repository on GitHub</a><br />
          <a href="/projects/pokemon-vhdl/Pokemon-VHDL-Project-Report.docx" download>Download the original course report (.docx)</a>
        </p>
      </article>
    </ProjectLayout>
  )
}

function SwitchPage() {
  return (
    <ProjectLayout
      current="switch"
      bannerTitle="Microsoldering · RP2040 boot-path modification"
      bannerSummary="An early hardware project documented without overstating the available functional evidence."
    >
      <article className="project-detail" aria-labelledby="switch-modchip">
        <h2 id="switch-modchip">Nintendo Switch RP2040 Modchip Installation</h2>
        <p className="project-meta">Early personal project · board-level soldering · RP2040/Picofly · custom boot chain</p>
        <hr />

        <h3>Description</h3>
        <p>
          As an introductory microsoldering project, I disassembled a Nintendo Switch and installed an RP2040-based Picofly modchip/flex assembly around the processor. The modification targets the secure boot path through controlled CPU voltage glitching so an SD-loaded payload such as Hekate can run and continue into custom firmware.
        </p>
        <p>
          The modchip does not emulate or replace the Switch&apos;s NAND/eMMC storage. The original storage remains installed; the RP2040-class device changes the boot path so the system can load a payload from the microSD card. This project introduced me to fine-pitch soldering, fragile flex assemblies, teardown discipline, and the practical difference between a processor, boot ROM, bootloader, and persistent storage.
        </p>

        <ProjectFigure
          src="/projects/switch-modchip/switch-workbench.jpg"
          alt="Disassembled Nintendo Switch on an electronics work mat with its motherboard, shielding, heat pipe, screws, and modchip hardware"
          caption="Nintendo Switch teardown and modchip workbench. The photograph documents the hardware work, not the final boot state."
          className="portrait-figure"
        />
        <ProjectFigure
          src="/projects/switch-modchip/modchip-closeup.jpg"
          alt="Close-up of the Picofly flex assembly labeled SP1 and SP2 beside the NVIDIA processor package"
          caption="Close-up of the installed flex around the NVIDIA processor package; SP1 and SP2 are visible on the assembly."
          className="wide-figure"
        />

        <h3>Resources used</h3>
        <ul>
          <li>RP2040/Picofly modchip hardware and firmware.</li>
          <li>Hekate payload and microSD boot files.</li>
          <li><a href="https://switch.hacks.guide/user_guide/modchip/" target="_blank" rel="noreferrer">NH Switch Guide: Introduction to Modchips</a>.</li>
        </ul>
        <p className="boundary-note">The photographs document disassembly and installed hardware. They do not independently demonstrate a successful custom-firmware boot or long-term reliability.</p>
      </article>
    </ProjectLayout>
  )
}

export function PortfolioApp() {
  const page = getPageKey(window.location.pathname)

  switch (page) {
    case 'speech':
      return <SpeechPage />
    case 'vibroacoustic':
      return <VibroacousticPage />
    case 'vhdl':
      return <VhdlPage />
    case 'switch':
      return <SwitchPage />
    default:
      return <HomePage />
  }
}
