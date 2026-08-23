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

type VideoReferenceProps = {
  embedUrl: string
  watchUrl: string
  title: string
  channel: string
  channelUrl: string
  children: ReactNode
}

function VideoReference({ embedUrl, watchUrl, title, channel, channelUrl, children }: VideoReferenceProps) {
  return (
    <figure className="video-reference">
      <div className="video-frame">
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption>
        <span className="video-credit">
          <a href={watchUrl} target="_blank" rel="noreferrer">{title}</a><br />
          by <a href={channelUrl} target="_blank" rel="noreferrer">{channel}</a>
        </span>
        <span className="video-context">{children}</span>
      </figcaption>
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
        <li><a className={current === 'home' ? 'current' : undefined} aria-current={current === 'home' ? 'page' : undefined} href="/">Overview</a></li>
        <li><a href="/#education">Education</a></li>
        <li><a href="/#selected-projects">Projects</a></li>
        {PROJECT_ROUTES.map((project) => (
          <li className="subitem" key={project.key}>
            <a className={current === project.key ? 'current' : undefined} aria-current={current === project.key ? 'page' : undefined} href={project.href}>{project.navLabel}</a>
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
          My name is Uthso Paul. I am an electrical and computer engineering student at New York Institute of Technology who builds embedded-audio, digital-hardware, sensing, and hardware/software integration projects. This portfolio shows how I turn technical ideas into working prototypes, documented architectures, and measurable engineering progress.
        </p>
        <p>
          Select a project below for its design story, implementation details, images, lessons learned, references, and source material.
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

        <h3>Reference tutorial</h3>
        <VideoReference
          embedUrl="https://www.youtube-nocookie.com/embed/aIadwRaK6F0"
          watchUrl="https://www.youtube.com/watch?v=aIadwRaK6F0"
          title="Speech-To-Text on the Edge 🔪 Running Whisper on the Raspberry Pi 5"
          channel="pi3g"
          channelUrl="https://www.youtube.com/@pi3g"
        >
          This Raspberry Pi 5 and USB-microphone walkthrough demonstrates a simple offline Whisper baseline. I used that workflow as a reference point, then expanded the idea into a dual-I²S microphone system with a Rust capture and signal-processing path plus a custom carrier-board design.
        </VideoReference>
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
          caption="KiCad 3D render of the editable dual-microphone carrier design."
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

        <h3>Engineering highlights</h3>
        <div className="table-scroll" role="region" aria-label="Speech project engineering highlights" tabIndex={0}>
          <table className="evidence-table">
            <thead>
              <tr><th>Area</th><th>Completed work</th><th>Next engineering step</th></tr>
            </thead>
            <tbody>
              <tr><td>KiCad schematic</td><td>Electrical rules check: 0 errors / 0 warnings</td><td>Fabricate and bench-test the carrier</td></tr>
              <tr><td>KiCad board</td><td>Board rules check: 0 violations / 0 unconnected pads</td><td>Validate routing on the assembled board</td></tr>
              <tr><td>Rust backend</td><td>11 automated tests across WAV, resampling, FFT, and delay-estimation paths</td><td>Characterize continuous ALSA capture on the Pi</td></tr>
              <tr><td>Physical prototype</td><td>Raspberry Pi and dual-microphone breadboard assembled</td><td>Record a repeatable stereo test set</td></tr>
              <tr><td>ASR and HID</td><td>Local-recognition and host-delivery pipeline designed</td><td>Benchmark transcription accuracy, latency, and delivery</td></tr>
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

        <h3>Engineering lessons</h3>
        <ul>
          <li>Microphone geometry and channel timing are first-class inputs to speech-recognition quality.</li>
          <li>Rust&apos;s ownership model encouraged bounded buffers and explicit data flow across capture, DSP, and file-processing stages.</li>
          <li>A modular pipeline makes it possible to test microphone capture, signal analysis, recognition, and HID delivery independently before end-to-end integration.</li>
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
      bannerSummary="A two-channel cantilever sensing study developed from mechanical geometry through circuit documentation and simulation."
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
          I designed the first experiment around repeatable manual impacts, synchronized metadata, baseline-versus-changed-state comparisons, and protected piezo inputs for the ESP32-S3. The next phase moves that documented plan into assembly and measured data collection, with the model providing expected response patterns for comparison.
        </p>
        <ProjectFigure
          src="/projects/vibroacoustic/prototype-concept.png"
          alt="Concept rendering of an aluminum cantilever with two piezo sensors and ESP32 acquisition"
          caption="Conceptual assembly rendering used to define sensor placement, geometry, and acquisition wiring before construction."
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
      bannerSummary="A Game Boy-inspired architecture study connecting system decomposition, VGA timing, VHDL, and ModelSim."
    >
      <article className="project-detail" aria-labelledby="pokemon-vhdl">
        <h2 id="pokemon-vhdl">Game Boy–Inspired VHDL Architecture Study</h2>
        <p className="project-meta">Academic team project with Richard Gill · VHDL · ModelSim · December 2024</p>
        <hr />

        <h3>Project vision</h3>
        <p>
          My original inspiration was the <a href="https://www.analogue.co/pocket" target="_blank" rel="noreferrer">Analogue Pocket</a>, a modern FPGA-based handheld designed around Game Boy-family cartridges and a high-resolution display. I wanted to explore that same hardware-first mindset through an original Pokémon-inspired VHDL architecture: game behavior expressed as interconnected digital modules instead of a conventional software loop.
        </p>

        <figure className="reference-figure portrait-figure">
          <a href="https://www.analogue.co/pocket" target="_blank" rel="noreferrer">
            <img
              src="/projects/pokemon-vhdl/analogue-pocket-reference.png"
              alt="Black Analogue Pocket handheld shown from the front"
              loading="lazy"
            />
          </a>
          <figcaption>
            The Analogue Pocket provided the design inspiration: a Game Boy-compatible handheld engineered around FPGA hardware. Product reference image; <a href="https://www.analogue.co/pocket" target="_blank" rel="noreferrer">official Pocket specifications and imagery by Analogue.</a>
          </figcaption>
        </figure>

        <h3>System architecture</h3>
        <p>
          Richard Gill and I decomposed the game concept into cooperating subsystems for player control, battle flow, team and profile data, Pokémon moves and statistics, world-map behavior, random encounters, memory control, and display generation. That planning work turned a familiar game concept into a concrete exercise in interfaces, state ownership, clocks, and data movement.
        </p>
        <ProjectFigure
          src="/projects/pokemon-vhdl/architecture-diagram.jpg"
          alt="Original Pokémon VHDL architecture diagram linking controllers, game data, map logic, memory, and display output"
          caption="Original high-level subsystem plan from the course project documentation."
          className="wide-figure"
        />

        <h3>VHDL implementation and simulation</h3>
        <p>
          I focused most deeply on the display controller: horizontal and vertical counters, active-video gating, HSYNC/VSYNC timing, pixel coordinates, and RGB selection between map and sprite inputs. ModelSim gave me a signal-level view of how those concurrent processes advanced together and made the display pipeline the strongest implementation result from the project.
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

        <h3>Engineering lessons</h3>
        <ul>
          <li>Translate game behavior into clocked datapaths, registers, memories, and finite-state machines rather than software-style object interactions.</li>
          <li>Build confidence subsystem by subsystem with focused testbenches before integrating control, memory, and video paths.</li>
          <li>Use clear module interfaces and timing diagrams early so an ambitious architecture can be divided across a team and integrated predictably.</li>
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
      bannerSummary="A successful fine-pitch installation that progressed from teardown and flex soldering to a Hekate boot."
    >
      <article className="project-detail" aria-labelledby="switch-modchip">
        <h2 id="switch-modchip">Nintendo Switch RP2040 Modchip Installation</h2>
        <p className="project-meta">Personal hardware project · board-level soldering · RP2040/Picofly · Hekate bootloader</p>

        <p className="outcome-callout">
          <b>Completed outcome:</b> The installed console successfully reached Hekate after soldering, reassembly, and microSD setup, confirming that the modchip and modified boot path were operating.
        </p>
        <ProjectFigure
          src="/projects/switch-modchip/hekate-success.png"
          alt="Hekate version 6.1.1 home interface with Launch, More Configs, Payloads, and emuMMC options"
          caption="Hekate v6.1.1 home interface—the successful boot stage reached after the hardware installation and microSD setup."
          className="wide-figure boot-result-figure"
        />

        <h3>Installation reference</h3>
        <figure className="video-reference">
          <a
            className="video-link-preview"
            href="https://www.youtube.com/watch?v=P4ZWLazR6xQ&t=928s"
            target="_blank"
            rel="noreferrer"
            aria-label="Watch Nintendo Switch OLED PicoFly Modchip Install Guide on YouTube from 15 minutes 28 seconds"
          >
            <img
              src="/projects/switch-modchip/switch-install-guide-preview.jpg"
              alt="Nintendo Switch OLED PicoFly modchip installation video preview"
              loading="lazy"
            />
            <span className="video-play" aria-hidden="true">▶</span>
          </a>
          <figcaption>
            <span className="video-credit">
              <a href="https://www.youtube.com/watch?v=P4ZWLazR6xQ&t=928s" target="_blank" rel="noreferrer">Nintendo Switch OLED PicoFly Modchip Install Guide</a><br />
              by <a href="https://www.youtube.com/@TheModSmith" target="_blank" rel="noreferrer">TheModSmith</a>
            </span>
            <span className="video-context">I used this guide as a working reference, especially the flex-cable soldering, heat-control, cleanup, shielding, and reassembly sequence beginning at 15:28.</span>
          </figcaption>
        </figure>
        <hr />

        <h3>Project overview</h3>
        <p>
          I disassembled a Nintendo Switch and installed an RP2040-based Picofly modchip and flex assembly around the processor. The modification uses controlled CPU voltage glitching during secure boot so the console can follow a microSD-based payload path and launch Hekate.
        </p>
        <p>
          The original NAND/eMMC storage remains part of the console; the RP2040-class device changes how the system moves through its boot chain. Working through that path connected the physical installation to the roles of the processor, boot ROM, bootloader, payload files, and persistent storage.
        </p>

        <h3>Installation workflow</h3>
        <ol>
          <li>Disassembled the console methodically and organized the shielding, thermal hardware, ribbon cables, and fasteners for reassembly.</li>
          <li>Aligned the Picofly flex assembly and completed the fine-pitch soldering around the processor, including the visible SP1 and SP2 points.</li>
          <li>Controlled dwell time on the small pads, cleaned the work with isopropyl alcohol, inspected the joints, and routed the flex beneath the shielding.</li>
          <li>Reassembled the console, prepared the Hekate files on microSD, powered the system, and reached the Hekate home interface.</li>
        </ol>

        <div className="image-pair switch-evidence">
          <ProjectFigure
            src="/projects/switch-modchip/switch-workbench.jpg"
            alt="Disassembled Nintendo Switch on an electronics work mat with its motherboard, shielding, heat pipe, screws, and modchip hardware"
            caption="Organized teardown and workbench layout during the installation."
          />
          <ProjectFigure
            src="/projects/switch-modchip/modchip-closeup.jpg"
            alt="Close-up of the Picofly flex assembly labeled SP1 and SP2 beside the NVIDIA processor package"
            caption="Installed Picofly flex around the processor package with SP1 and SP2 visible."
          />
        </div>

        <h3>Skills developed</h3>
        <ul>
          <li>Fine-pitch soldering, heat control, flux cleanup, and visual joint inspection around sensitive processor-side components.</li>
          <li>Safe teardown and reassembly of ribbon cables, thermal hardware, shielding, and board-mounted connectors.</li>
          <li>End-to-end troubleshooting across physical installation, RP2040 behavior, microSD provisioning, and bootloader startup.</li>
        </ul>

        <h3>Resources used</h3>
        <ul>
          <li>RP2040/Picofly modchip hardware and firmware.</li>
          <li><a href="https://github.com/CTCaer/hekate" target="_blank" rel="noreferrer">Hekate bootloader and microSD files</a>.</li>
          <li><a href="https://www.youtube.com/watch?v=P4ZWLazR6xQ&t=928s" target="_blank" rel="noreferrer">TheModSmith: Nintendo Switch OLED PicoFly Modchip Install Guide</a>.</li>
          <li><a href="https://switch.hacks.guide/user_guide/modchip/" target="_blank" rel="noreferrer">NH Switch Guide: Introduction to Modchips</a>.</li>
        </ul>
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
