(() => {
  "use strict";

  const REPO = "pipelzm/Moleku";
  const API = `https://api.github.com/repos/${REPO}/releases?per_page=20`;
  const RELEASES = `https://github.com/${REPO}/releases`;
  const FALLBACK = {
    windows: `https://github.com/${REPO}/releases/tag/windows`,
    linux: `https://github.com/${REPO}/releases/tag/linux`,
    "mac-arm": `https://github.com/${REPO}/releases/tag/releases`,
    "mac-intel": `https://github.com/${REPO}/releases/tag/release-intel`
  };

  const state = {
    lang: "en",
    platform: "unknown",
    arch: "unknown",
    downloads: {
      windows: {url:FALLBACK.windows, asset:null},
      linux: {url:FALLBACK.linux, asset:null},
      "mac-arm": {url:FALLBACK["mac-arm"], asset:null},
      "mac-intel": {url:FALLBACK["mac-intel"], asset:null}
    }
  };

  const text = {
    en:{
      openSource:"Open-source desktop software",
      railIntro:"Reaction-driven virtual library generation, candidate prioritization and local ADMET in one focused application.",
      navHome:"Home",navHomeSub:"Overview · Download",navProduct:"Product",navProductSub:"Generate · Prioritize · ADMET",
      navWorkflows:"Pipeline",navWorkflowsSub:"Reagents · Library · ADMET",navResearch:"Research",navResearchSub:"Methods · Citation · License",navDownload:"Download",
      heroMeta:"Cheminformatics · Desktop · Open source",
      heroTagline:"Build chemical libraries.<br>Explore molecular possibilities.",
      heroEyebrow:"Reaction-driven by design",
      heroDescription:"Generate reaction-based virtual libraries, calculate descriptors, prioritize candidates and move directly into local ADMET analysis.",
      productTitle:"Product",productMeta:"Selected capabilities · 01—03",
      generateKicker:"Library Builder",generateTitle:"Reaction-driven generation",
      generateText:"Load reagent datasets, enumerate combinations and apply reaction SMARTS through curated MCR workflows.",
      priorityKicker:"Candidate Review",priorityTitle:"Explicit prioritization",
      priorityText:"Calculate physicochemical descriptors, detect duplicates and classify compounds with configurable rules.",
      admetTitle:"Local analysis workspace",
      admetText:"Send shortlisted candidates directly into the integrated ADMET tab and export analyzed results without leaving Moleku.",
      workflowsTitle:"Moleku pipeline",workflowsMeta:"End-to-end workflow · 01—07",
      workflowStatement:"From reagents to<br>prioritized candidates.",
      workflowLead:"A single sequence connects reaction setup, virtual enumeration, filtering, local ADMET and research-ready export.",
      pipelineInput:"Input",pipelineChemistry:"Chemistry",pipelineGeneration:"Generation",pipelineCharacterize:"Characterize",pipelinePrioritize:"Prioritize",pipelineOutput:"Output",
      pipeline1Title:"Load reagents",pipeline1Text:"Import reaction-ready reagent datasets and prepare the building blocks used for library generation.",
      pipeline2Title:"Select reaction system",pipeline2Text:"Choose a supported multicomponent reaction and its curated reaction logic before enumeration.",
      pipeline3Title:"Enumerate the library",pipeline3Text:"Generate virtual products from reagent combinations and track successful or failed transformations.",
      pipeline4Title:"Compute descriptors",pipeline4Text:"Calculate physicochemical properties and establish the molecular profile of each generated candidate.",
      pipeline5Title:"Filter candidates",pipeline5Text:"Apply duplicate control and configurable heuristic rules to separate candidates for further review.",
      pipeline6Title:"Analyze locally",pipeline6Text:"Move shortlisted structures into the integrated ADMET workspace without leaving the application.",
      pipeline7Title:"Export results",pipeline7Text:"Prepare tables, reports and molecular files for downstream computational research and documentation.",
      chemistryKicker:"Core chemistry",chemistryTitle:"Current reaction systems",
      chemistryLead:"Three curated 3-component reaction modules currently define the generation layer of Moleku.",
      biginelliCompact:"3-CR · DHPM-oriented library generation",
      gbbCompact:"3-CR · Heterocycle-oriented library generation",
      gewaldCompact:"3-CR · Sulfur-heterocycle library generation",
      researchTitle:"Built for research",researchMeta:"Transparent · Reproducible · Citable",
      researchStatement:"The website is the entry point. The scientific record remains directly accessible.",
      license:"Open-source license",methods:"Methods",methodsSub:"Computational workflow",citation:"Citation",quickStart:"Quick start",quickStartSub:"Installation & first workflow",
      downloadTitle:"Download",downloadMeta:"GitHub Releases · Platform-aware",
      downloadStatement:"Get Moleku.<br><span>Use the right build.</span>",
      downloadLead:"Your operating system is detected automatically. You can still choose another build or open the complete release list.",
      downloadButton:"Download",allReleases:"View all releases ↗",
      finalTitle:"Reaction to library.<br>Library to candidate.",
      footerCopy:"Open-source scientific software for reaction-driven virtual library workflows.",
      detect:"Detecting your platform…",
      win:"Detected: Windows · x64 build recommended",linux:"Detected: Linux · AppImage preferred",
      macArm:"Detected: macOS · Apple Silicon",macIntel:"Detected: macOS · Intel",
      macUnknown:"Detected: macOS · choose Apple Silicon or Intel",mobile:"Mobile device detected · Moleku is a desktop application",
      unknown:"Platform not identified · choose a build above",
      dlWin:"Download for Windows",dlLinux:"Download for Linux",dlMac:"Download for macOS",dlDesktop:"View desktop downloads",dlMoleku:"Download Moleku",compactWin:"Windows",compactLinux:"Linux",compactMac:"macOS",compactMacArm:"Apple Silicon",compactMacIntel:"Intel Mac",compactDesktop:"Desktop",compactDownload:"Platform",
      checking:"Checking current release…",ready:"Ready: {asset}",fallback:"Installer list available on GitHub",
      macKicker:"macOS download",macTitle:"Which Mac do you have?",
      macText:"Some browsers do not expose processor architecture reliably. Choose the version that matches your Mac.",
      macHelp:"Not sure? Open <strong>Apple menu → About This Mac</strong> and check “Chip” or “Processor”."
    },
    es:{
      openSource:"Software de escritorio de código abierto",
      railIntro:"Generación de bibliotecas virtuales basada en reacciones, priorización de candidatos y ADMET local en una aplicación enfocada.",
      navHome:"Inicio",navHomeSub:"Descripción · Descarga",navProduct:"Producto",navProductSub:"Generar · Priorizar · ADMET",
      navWorkflows:"Pipeline",navWorkflowsSub:"Reactivos · Biblioteca · ADMET",navResearch:"Investigación",navResearchSub:"Métodos · Citación · Licencia",navDownload:"Descargar",
      heroMeta:"Quimioinformática · Escritorio · Código abierto",
      heroTagline:"Construye bibliotecas químicas.<br>Explora posibilidades moleculares.",
      heroEyebrow:"Diseñado alrededor de reacciones",
      heroDescription:"Genera bibliotecas virtuales basadas en reacciones, calcula descriptores, prioriza candidatos y pasa directamente a análisis ADMET local.",
      productTitle:"Producto",productMeta:"Capacidades seleccionadas · 01—03",
      generateKicker:"Generador de biblioteca",generateTitle:"Generación basada en reacciones",
      generateText:"Carga conjuntos de reactivos, enumera combinaciones y aplica SMARTS de reacción mediante flujos MCR curados.",
      priorityKicker:"Revisión de candidatos",priorityTitle:"Priorización explícita",
      priorityText:"Calcula descriptores fisicoquímicos, detecta duplicados y clasifica compuestos mediante reglas configurables.",
      admetTitle:"Espacio de análisis local",
      admetText:"Envía candidatos seleccionados directamente a la pestaña ADMET integrada y exporta resultados analizados sin salir de Moleku.",
      workflowsTitle:"Pipeline de Moleku",workflowsMeta:"Flujo completo · 01—07",
      workflowStatement:"De reactivos a<br>candidatos priorizados.",
      workflowLead:"Una sola secuencia conecta la configuración de la reacción, la enumeración virtual, el filtrado, ADMET local y la exportación para investigación.",
      pipelineInput:"Entrada",pipelineChemistry:"Química",pipelineGeneration:"Generación",pipelineCharacterize:"Caracterización",pipelinePrioritize:"Priorización",pipelineOutput:"Salida",
      pipeline1Title:"Cargar reactivos",pipeline1Text:"Importa conjuntos de reactivos listos para reacción y prepara los bloques de construcción utilizados para generar la biblioteca.",
      pipeline2Title:"Seleccionar sistema de reacción",pipeline2Text:"Elige una reacción multicomponente compatible y su lógica de reacción curada antes de la enumeración.",
      pipeline3Title:"Enumerar la biblioteca",pipeline3Text:"Genera productos virtuales a partir de combinaciones de reactivos y registra transformaciones exitosas o fallidas.",
      pipeline4Title:"Calcular descriptores",pipeline4Text:"Calcula propiedades fisicoquímicas y establece el perfil molecular de cada candidato generado.",
      pipeline5Title:"Filtrar candidatos",pipeline5Text:"Aplica control de duplicados y reglas heurísticas configurables para separar candidatos para revisión posterior.",
      pipeline6Title:"Analizar localmente",pipeline6Text:"Lleva las estructuras seleccionadas al espacio ADMET integrado sin salir de la aplicación.",
      pipeline7Title:"Exportar resultados",pipeline7Text:"Prepara tablas, reportes y archivos moleculares para investigación computacional y documentación posterior.",
      chemistryKicker:"Química principal",chemistryTitle:"Sistemas de reacción actuales",
      chemistryLead:"Tres módulos curados de reacciones de 3 componentes definen actualmente la capa de generación de Moleku.",
      biginelliCompact:"3-CR · Generación de bibliotecas orientadas a DHPM",
      gbbCompact:"3-CR · Generación de bibliotecas orientadas a heterociclos",
      gewaldCompact:"3-CR · Generación de bibliotecas de heterociclos con azufre",
      researchTitle:"Diseñado para investigación",researchMeta:"Transparente · Reproducible · Citable",
      researchStatement:"La web es el punto de entrada. El registro científico permanece accesible directamente.",
      license:"Licencia de código abierto",methods:"Métodos",methodsSub:"Flujo computacional",citation:"Citación",quickStart:"Inicio rápido",quickStartSub:"Instalación y primer flujo",
      downloadTitle:"Descargar",downloadMeta:"GitHub Releases · Detección de plataforma",
      downloadStatement:"Obtén Moleku.<br><span>Usa la versión correcta.</span>",
      downloadLead:"Tu sistema operativo se detecta automáticamente. Aun así puedes elegir otra versión o abrir la lista completa de releases.",
      downloadButton:"Descargar",allReleases:"Ver todos los releases ↗",
      finalTitle:"De reacción a biblioteca.<br>De biblioteca a candidato.",
      footerCopy:"Software científico de código abierto para flujos de bibliotecas virtuales basados en reacciones.",
      detect:"Detectando tu sistema…",
      win:"Detectado: Windows · se recomienda x64",linux:"Detectado: Linux · se prioriza AppImage",
      macArm:"Detectado: macOS · Apple Silicon",macIntel:"Detectado: macOS · Intel",
      macUnknown:"Detectado: macOS · elige Apple Silicon o Intel",mobile:"Dispositivo móvil detectado · Moleku es una aplicación de escritorio",
      unknown:"No se pudo identificar el sistema · elige una versión arriba",
      dlWin:"Descargar para Windows",dlLinux:"Descargar para Linux",dlMac:"Descargar para macOS",dlDesktop:"Ver descargas de escritorio",dlMoleku:"Descargar Moleku",compactWin:"Windows",compactLinux:"Linux",compactMac:"macOS",compactMacArm:"Apple Silicon",compactMacIntel:"Mac Intel",compactDesktop:"Desktop",compactDownload:"Plataforma",
      checking:"Comprobando el release actual…",ready:"Listo: {asset}",fallback:"Lista de instaladores disponible en GitHub",
      macKicker:"Descarga para macOS",macTitle:"¿Qué Mac tienes?",
      macText:"Algunos navegadores no exponen de forma fiable la arquitectura del procesador. Elige la versión que corresponda a tu Mac.",
      macHelp:"Si no estás seguro, abre <strong>menú Apple → Acerca de esta Mac</strong> y revisa “Chip” o “Procesador”."
    }
  };

  const $=(q,s=document)=>s.querySelector(q);
  const $$=(q,s=document)=>[...s.querySelectorAll(q)];
  const tr=k=>text[state.lang][k]||text.en[k]||k;

  function applyLang(lang){
    state.lang=lang==="es"?"es":"en";
    document.documentElement.lang=state.lang;
    localStorage.setItem("moleku-lang",state.lang);
    $$("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(text[state.lang][k])el.textContent=text[state.lang][k]});
    $$("[data-i18n-html]").forEach(el=>{const k=el.dataset.i18nHtml;if(text[state.lang][k])el.innerHTML=text[state.lang][k]});
    const nextIsSpanish = state.lang === "en";
    const flagSrc = nextIsSpanish ? "assets/flag-es.svg" : "assets/flag-en.svg";
    const flagTitle = nextIsSpanish ? "Español" : "English";
    const flagLabel = nextIsSpanish ? "Cambiar a español" : "Switch to English";

    const desktopToggle = $("#langToggle");
    const mobileToggle = $("#mobileLangToggle");
    const desktopFlag = $("#langFlag");
    const mobileFlag = $("#mobileLangFlag");

    if(desktopFlag) desktopFlag.src = flagSrc;
    if(mobileFlag) mobileFlag.src = flagSrc;

    if(desktopToggle){
      desktopToggle.setAttribute("aria-label", flagLabel);
      desktopToggle.setAttribute("title", flagTitle);
    }
    if(mobileToggle){
      mobileToggle.setAttribute("aria-label", flagLabel);
      mobileToggle.setAttribute("title", flagTitle);
    }
    updateDownloadUI(); updateAssetLabels();
  }

  function detectPlatform(){
    const ua=navigator.userAgent.toLowerCase();
    const p=(navigator.userAgentData?.platform||navigator.platform||"").toLowerCase();
    const ipad=p.includes("mac")&&navigator.maxTouchPoints>1;
    if(/iphone|ipad|ipod|android|mobile/.test(ua)||ipad)return"mobile";
    if(p.includes("win")||ua.includes("windows"))return"windows";
    if(p.includes("mac")||ua.includes("mac os"))return"mac";
    if(p.includes("linux")||ua.includes("linux"))return"linux";
    return"unknown";
  }

  async function detectArch(){
    if(state.platform!=="mac")return"unknown";
    try{
      if(navigator.userAgentData?.getHighEntropyValues){
        const v=await navigator.userAgentData.getHighEntropyValues(["architecture"]);
        const a=(v.architecture||"").toLowerCase();
        if(["arm","arm64","aarch64"].includes(a))return"arm";
        if(["x86","x86_64","x64","amd64"].includes(a))return"intel";
      }
    }catch(_){}
    return"unknown";
  }

  function setRecommended(keys=[]){
    $$("[data-download-card]").forEach(el=>el.classList.remove("recommended"));
    keys.forEach(k=>$(`[data-download-card="${k}"]`)?.classList.add("recommended"));
  }

  function updateDownloadUI(){
    let label=tr("dlMoleku");
    let compact=tr("compactDownload");
    let status=tr("unknown");
    setRecommended();

    if(state.platform==="windows"){
      label=tr("dlWin");
      compact=tr("compactWin");
      status=tr("win");
      setRecommended(["windows"]);
    }
    else if(state.platform==="linux"){
      label=tr("dlLinux");
      compact=tr("compactLinux");
      status=tr("linux");
      setRecommended(["linux"]);
    }
    else if(state.platform==="mac"){
      label=tr("dlMac");
      compact=tr("compactMac");

      if(state.arch==="arm"){
        compact=tr("compactMacArm");
        status=tr("macArm");
        setRecommended(["mac-arm"]);
      }
      else if(state.arch==="intel"){
        compact=tr("compactMacIntel");
        status=tr("macIntel");
        setRecommended(["mac-intel"]);
      }
      else{
        status=tr("macUnknown");
        setRecommended(["mac-arm","mac-intel"]);
      }
    }
    else if(state.platform==="mobile"){
      label=tr("dlDesktop");
      compact=tr("compactDesktop");
      status=tr("mobile");
    }

    $$("[data-download-label]").forEach(el=>el.textContent=label);
    $$("[data-download-label-compact]").forEach(el=>el.textContent=compact);

    const railButton=$("#railDownload");
    if(railButton){
      railButton.setAttribute("title",label);
      railButton.setAttribute("aria-label",label);
    }

    const platformStatus=$("#platformStatus");
    if(platformStatus) platformStatus.textContent=status;
  }

  function releasePlatform(rel){
    const txt=`${rel.name||""} ${rel.tag_name||""}`.toLowerCase(),tag=(rel.tag_name||"").toLowerCase();
    if(tag==="windows"||/\bwindows?\b|win64|win32/.test(txt))return"windows";
    if(tag==="linux"||/\blinux\b|appimage/.test(txt))return"linux";
    if(tag==="release-intel")return"mac-intel";
    if(tag==="releases")return"mac-arm";
    if(/apple silicon|arm64|aarch64|\bm1\b|\bm2\b|\bm3\b|\bm4\b|\bm5\b/.test(txt))return"mac-arm";
    if(/\bintel\b|x86_64/.test(txt)&&/mac|apple|darwin/.test(txt))return"mac-intel";
    return null;
  }

  function sourceLike(n){n=n.toLowerCase();return n.includes("source")||n.includes("checksum")||n.includes("sha256")||n.endsWith(".txt")||n.endsWith(".json")}
  function pickAsset(assets,p){
    const valid=(assets||[]).filter(a=>a?.browser_download_url&&!sourceLike(a.name||""));if(!valid.length)return null;
    const exts={windows:[".exe",".msi",".zip"],linux:[".appimage",".deb",".rpm",".zip",".tar.gz"],"mac-arm":[".dmg",".pkg",".zip"],"mac-intel":[".dmg",".pkg",".zip"]}[p]||[];
    const hints={windows:["windows","win","x64","amd64"],linux:["linux","appimage","x86_64","amd64"],"mac-arm":["apple","silicon","arm64","aarch64","macos","mac"],"mac-intel":["intel","x86_64","x64","macos","mac"]}[p]||[];
    const bad={windows:["linux","mac","darwin","arm64"],linux:["windows","win32","mac","darwin"],"mac-arm":["windows","linux","intel","x86_64","x64"],"mac-intel":["windows","linux","arm64","aarch64","silicon"]}[p]||[];
    const ranked=valid.map(a=>{const n=(a.name||"").toLowerCase();let s=0;exts.forEach((e,i)=>{if(n.endsWith(e))s+=(exts.length-i)*20});hints.forEach(h=>{if(n.includes(h))s+=8});bad.forEach(h=>{if(n.includes(h))s-=25});return{a,s}}).sort((x,y)=>y.s-x.s);
    return ranked[0]?.s>0?ranked[0].a:null;
  }

  async function loadReleases(){
    try{
      const r=await fetch(API,{headers:{Accept:"application/vnd.github+json"}});if(!r.ok)throw new Error(r.status);
      const releases=await r.json();
      releases.forEach(rel=>{
        if(rel.draft)return;const p=releasePlatform(rel);if(!p)return;const a=pickAsset(rel.assets,p);
        state.downloads[p]={url:a?.browser_download_url||rel.html_url||FALLBACK[p],asset:a?.name||null};
      });
      for(const rel of releases){
        if(rel.draft)continue;
        for(const p of ["windows","linux","mac-arm","mac-intel"]){
          if(state.downloads[p].asset)continue;
          const a=pickAsset(rel.assets,p);if(a)state.downloads[p]={url:a.browser_download_url,asset:a.name};
        }
      }
    }catch(err){console.info("Using GitHub release fallbacks.",err)}
    updateAssetLabels();
  }

  function updateAssetLabels(){
    for(const p of ["windows","linux","mac-arm","mac-intel"]){
      const el=$(`[data-asset="${p}"]`);if(!el)continue;const a=state.downloads[p].asset;
      el.textContent=a?tr("ready").replace("{asset}",a.length>52?a.slice(0,49)+"…":a):tr("fallback");
      if(a)el.title=a;
    }
  }

  function openDownload(p){window.location.href=state.downloads[p]?.url||FALLBACK[p]||RELEASES}
  function openMac(){const d=$("#macDialog");if(typeof d?.showModal==="function")d.showModal();else window.location.href=RELEASES}
  function smartDownload(){
    if(state.platform==="windows")return openDownload("windows");
    if(state.platform==="linux")return openDownload("linux");
    if(state.platform==="mac"){
      if(state.arch==="arm")return openDownload("mac-arm");
      if(state.arch==="intel")return openDownload("mac-intel");
      return openMac();
    }
    $("#download")?.scrollIntoView({behavior:"smooth"});
  }

  /* Active rail section — stable viewport-center tracking */
  function initSectionObserver(){
    const links=new Map($$("[data-section-link]").map(a=>[a.dataset.sectionLink,a]));
    const sections=$$("[data-section]");
    let ticking=false;

    function update(){
      ticking=false;
      const marker=window.innerHeight*.44;
      let active=sections[0]?.dataset.section || "home";

      for(const section of sections){
        const rect=section.getBoundingClientRect();
        if(rect.top<=marker && rect.bottom>marker){
          active=section.dataset.section;
          break;
        }
        if(rect.top<=marker) active=section.dataset.section;
      }

      links.forEach((link,key)=>link.classList.toggle("active",key===active));
    }

    function requestUpdate(){
      if(ticking) return;
      ticking=true;
      requestAnimationFrame(update);
    }

    addEventListener("scroll",requestUpdate,{passive:true});
    addEventListener("resize",requestUpdate,{passive:true});
    requestUpdate();
  }

  function initReveal(){
    document.documentElement.classList.add("reveal-ready");
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){$$(".reveal").forEach(e=>e.classList.add("visible"));return}
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
    $$(".reveal").forEach(e=>io.observe(e));
  }

  /* Restrained luminous field — optimized for 30fps and paused off-screen */
  class RibbonCanvas{
    constructor(canvas){
      if(!canvas) return;
      this.c=canvas;
      this.ctx=canvas.getContext("2d",{alpha:true});
      this.dpr=Math.min(devicePixelRatio||1,1.35);
      this.reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.visible=true;
      this.running=false;
      this.lastFrame=0;
      this.frameInterval=1000/30;
      this.resize=this.resize.bind(this);
      this.loop=this.loop.bind(this);

      addEventListener("resize",this.resize,{passive:true});
      this.resize();

      this.visibilityObserver=new IntersectionObserver(entries=>{
        this.visible=entries[0]?.isIntersecting ?? true;
        if(this.visible && !this.reduce && !this.running){
          this.running=true;
          requestAnimationFrame(this.loop);
        }
      },{threshold:0.01});
      this.visibilityObserver.observe(this.c);

      if(this.reduce){
        this.draw(0);
      }else{
        this.running=true;
        requestAnimationFrame(this.loop);
      }
    }

    resize(){
      const r=this.c.getBoundingClientRect();
      this.w=Math.max(1,r.width);
      this.h=Math.max(1,r.height);
      this.c.width=Math.floor(this.w*this.dpr);
      this.c.height=Math.floor(this.h*this.dpr);
      this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    }

    curve(t,line){
      const c=this.ctx;
      const amp=this.h*(.076+line*.008);
      const base=this.h*(.34+line*.041);
      c.beginPath();
      for(let x=-40;x<=this.w+40;x+=14){
        const nx=x/this.w;
        const y=base
          + Math.sin(nx*5.2+t*.62+line*.57)*amp
          + Math.sin(nx*10.6-t*.31+line*.25)*amp*.29;
        if(x===-40)c.moveTo(x,y);else c.lineTo(x,y);
      }
    }

    draw(ms){
      const c=this.ctx,t=ms*.001;
      c.clearRect(0,0,this.w,this.h);
      c.save();
      c.globalCompositeOperation="screen";

      // Six ribbons are enough visually and considerably cheaper than
      // the previous ten glow-heavy paths.
      for(let i=0;i<6;i++){
        const g=c.createLinearGradient(0,0,this.w,0);
        g.addColorStop(0,"rgba(34,30,255,0)");
        g.addColorStop(.24,`rgba(34,60,255,${.105+i*.009})`);
        g.addColorStop(.57,`rgba(93,58,255,${.13+i*.008})`);
        g.addColorStop(.8,`rgba(255,116,23,${.05+i*.006})`);
        g.addColorStop(1,"rgba(255,116,23,0)");
        c.strokeStyle=g;
        c.lineWidth=1+i*.24;
        this.curve(t,i);
        c.stroke();
      }
      c.restore();
    }

    loop(ms){
      if(!this.visible){
        this.running=false;
        return;
      }
      if(ms-this.lastFrame>=this.frameInterval){
        this.lastFrame=ms;
        this.draw(ms);
      }
      requestAnimationFrame(this.loop);
    }
  }

  function bind(){
    $("#langToggle")?.addEventListener("click",()=>applyLang(state.lang==="en"?"es":"en"));
    $("#mobileLangToggle")?.addEventListener("click",()=>applyLang(state.lang==="en"?"es":"en"));
    $("#railDownload")?.addEventListener("click",smartDownload);
    $("#heroDownload")?.addEventListener("click",smartDownload);
    $$("[data-download]").forEach(b=>b.addEventListener("click",()=>openDownload(b.dataset.download)));
    $$("[data-dialog-download]").forEach(b=>b.addEventListener("click",()=>{$("#macDialog")?.close();openDownload(b.dataset.dialogDownload)}));

    const btn=$("#mobileMenuButton"),menu=$("#mobileMenu");
    btn?.addEventListener("click",()=>{const open=menu.classList.toggle("open");btn.setAttribute("aria-expanded",String(open))});
    $$("#mobileMenu a").forEach(a=>a.addEventListener("click",()=>{menu?.classList.remove("open");btn?.setAttribute("aria-expanded","false")}));
  }

  async function init(){
    const yearEl=$("#year"); if(yearEl) yearEl.textContent=new Date().getFullYear();
    state.platform=detectPlatform();
    state.lang=localStorage.getItem("moleku-lang")||(navigator.language?.toLowerCase().startsWith("es")?"es":"en");
    applyLang(state.lang);bind();initSectionObserver();initReveal();
    new RibbonCanvas($("#heroCanvas"),0);
    state.arch=await detectArch();updateDownloadUI();loadReleases();
  }
  init();
})();
