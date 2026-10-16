import { useState, useEffect, useRef, useCallback } from "react";
import "../Styles/home.css";
import logoUrl from "../assets/img/Imagen_1-removebg-preview (1).png";

/* ================== DATA ================== */
const WA = "573209407738";
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const LINKS = [
	{
		label: "WhatsApp",
		sublabel: "Cuéntanos tu idea y cotiza",
		url: waLink("¡Hola Imagine Nation! Quiero cotizar un proyecto 🎬"),
		tag: "01",
		icon: "wa",
		featured: true,
	},
	{ label: "Sitio Web", sublabel: "imaginenationfilms.com", url: "https://imaginenationfilms.com/", tag: "02", icon: "web" },
	{ label: "Instagram", sublabel: "@imaginenation.films", url: "https://www.instagram.com/imaginenation.films/", tag: "03", icon: "ig" },
	{ label: "YouTube", sublabel: "Nuestros proyectos", url: "https://www.youtube.com/@ImagineNationFilmsCo", tag: "04", icon: "yt" },
];

const SERVICES = [
	{ n: "01A", label: "Publicidad", msg: "una campaña de publicidad" },
	{ n: "02A", label: "Marketing digital", msg: "marketing digital para mi marca" },
	{ n: "03A", label: "Fotografía", msg: "una sesión de fotografía" },
	{ n: "04A", label: "Contenido para redes", msg: "creación de contenido para redes" },
	{ n: "05A", label: "Producción de video", msg: "producción de video" },
	{ n: "06A", label: "Estrategia de marca", msg: "estrategia de marca" },
];

const TAPE = ["Publicidad", "Marketing", "Fotografía", "Contenido", "Producción audiovisual", "Campañas", "Redes sociales"];

const SOCIALS = [
	{ label: "Instagram", icon: "ig", url: "https://www.instagram.com/imaginenation.films/" },
	{ label: "WhatsApp", icon: "wa", url: waLink("¡Hola Imagine Nation! 👋") },
	{ label: "YouTube", icon: "yt", url: "https://www.youtube.com/@ImagineNationFilmsCo" },
	{ label: "Sitio web", icon: "web", url: "https://imaginenationfilms.com/" },
];

const WORDS = ["historias", "campañas", "marcas", "contenidos"];

/* ================== ICONS ================== */
const Icon = ({ name, size = 20 }) => {
	const p = {
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": true,
	};
	switch (name) {
		case "web":
			return (
				<svg {...p}>
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
				</svg>
			);
		case "wa":
			return (
				<svg {...p}>
					<path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8 19z" />
					<path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z" />
				</svg>
			);
		case "ig":
			return (
				<svg {...p}>
					<rect x="3" y="3" width="18" height="18" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
				</svg>
			);
		case "yt":
			return (
				<svg {...p}>
					<rect x="2.5" y="5.5" width="19" height="13" rx="4" />
					<path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
				</svg>
			);
		case "arrow":
			return (
				<svg {...p} strokeWidth={2.2}>
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			);
		default:
			return null;
	}
};

/* ================== INTRO: claqueta / film leader ================== */
function Intro({ onOpen, onDone }) {
	const [n, setN] = useState(3);
	const [leaving, setLeaving] = useState(false);

	useEffect(() => {
		if (n > 0) {
			const t = setTimeout(() => setN(n - 1), 620);
			return () => clearTimeout(t);
		}
		setLeaving(true);
		onOpen();
		const t = setTimeout(onDone, 1000);
		return () => clearTimeout(t);
	}, [n, onOpen, onDone]);

	return (
		<div className={`inf-intro ${leaving ? "is-leaving" : ""}`} onClick={() => setN(0)} aria-hidden="true">
			<div className="intro-shutter top" />
			<div className="intro-shutter bottom" />
			<div className="intro-leader">
				<svg className="intro-ring" viewBox="0 0 200 200">
					<circle cx="100" cy="100" r="92" />
					<circle cx="100" cy="100" r="74" />
					<line x1="0" y1="100" x2="200" y2="100" />
					<line x1="100" y1="0" x2="100" y2="200" />
				</svg>
				{n > 0 && <span key={`s${n}`} className="intro-sweep" />}
				<span key={n} className="intro-num">
					{n > 0 ? n : ""}
				</span>
			</div>
			<p className="intro-label">
				<span className="rec-dot" /> IMAGINE NATION FILMS · TOMA 01 · ACCIÓN
			</p>
		</div>
	);
}

/* ================== HUD pieces ================== */
function Timecode() {
	const ref = useRef(null);
	useEffect(() => {
		const start = performance.now();
		const pad = (v) => String(v).padStart(2, "0");
		let last = -1;
		let raf;
		const tick = (now) => {
			const f = Math.floor((now - start) / (1000 / 24));
			if (f !== last && ref.current) {
				last = f;
				const s = Math.floor(f / 24);
				ref.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 24)}`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);
	return (
		<span ref={ref} className="hud-tc">
			00:00:00:00
		</span>
	);
}

function BogotaClock() {
	const fmt = () =>
		new Intl.DateTimeFormat("es-CO", {
			timeZone: "America/Bogota",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		}).format(new Date());
	const [t, setT] = useState(fmt);
	useEffect(() => {
		const id = setInterval(() => setT(fmt()), 10000);
		return () => clearInterval(id);
	}, []);
	return <span>{t}</span>;
}

/* ================== Rotating headline word ================== */
function RotatingWord({ words, reduce }) {
	const [i, setI] = useState(0);
	useEffect(() => {
		if (reduce) return;
		const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
		return () => clearInterval(id);
	}, [words.length, reduce]);
	return (
		<span className="hl-rotator">
			<span key={i} className="hl-word">
				{words[i]}
			</span>
		</span>
	);
}

/* ================== Lens / iris behind the logo ================== */
function Iris() {
	return (
		<svg className="vf-iris" viewBox="0 0 200 200" aria-hidden="true">
			<defs>
				<path id="infLensPath" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
			</defs>
			<g className="iris-outer">
				<circle cx="100" cy="100" r="97" className="iris-dash" />
				<text className="iris-text">
					<textPath href="#infLensPath">
						∞ · 10 · 5 · 3 · 2 · 1.5 · 1 · 0.7m · IMAGINE NATION FILMS · 35mm f/1.4 ·
					</textPath>
				</text>
			</g>
			<g className="iris-blades">
				{Array.from({ length: 6 }).map((_, i) => (
					<line key={i} x1="100" y1="24" x2="150" y2="116" transform={`rotate(${i * 60} 100 100)`} />
				))}
				<circle cx="100" cy="100" r="76" />
			</g>
		</svg>
	);
}

/* ================== Custom focus cursor (solo desktop) ================== */
function FocusCursor() {
	const ring = useRef(null);
	const dot = useRef(null);
	const [enabled] = useState(
		() => typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches
	);

	useEffect(() => {
		if (!enabled) return;
		let x = window.innerWidth / 2;
		let y = window.innerHeight / 2;
		let rx = x;
		let ry = y;
		let raf;
		const move = (e) => {
			x = e.clientX;
			y = e.clientY;
			const hot = e.target.closest?.("a, button");
			ring.current?.classList.toggle("is-hot", !!hot);
			ring.current?.classList.add("is-on");
			dot.current?.classList.add("is-on");
		};
		const down = () => ring.current?.classList.add("is-down");
		const up = () => ring.current?.classList.remove("is-down");
		const loop = () => {
			rx += (x - rx) * 0.18;
			ry += (y - ry) * 0.18;
			if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
			if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
			raf = requestAnimationFrame(loop);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerdown", down);
		window.addEventListener("pointerup", up);
		document.documentElement.classList.add("inf-has-cursor");
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerdown", down);
			window.removeEventListener("pointerup", up);
			document.documentElement.classList.remove("inf-has-cursor");
		};
	}, [enabled]);

	if (!enabled) return null;
	return (
		<>
			<div ref={ring} className="cur-ring" aria-hidden="true">
				<i />
			</div>
			<div ref={dot} className="cur-dot" aria-hidden="true" />
		</>
	);
}

/* ================== Hoja de contactos (servicios) ================== */
function ContactSheet({ onShoot, reduce }) {
	const [active, setActive] = useState(0);
	const paused = useRef(false);

	useEffect(() => {
		if (reduce) return;
		const id = setInterval(() => {
			if (!paused.current) setActive((a) => (a + 1) % SERVICES.length);
		}, 1900);
		return () => clearInterval(id);
	}, [reduce]);

	return (
		<div
			className="sheet rv"
			style={{ "--d": "1.15s" }}
			onMouseLeave={() => {
				paused.current = false;
			}}
		>
			<div className="sheet-edge" aria-hidden="true">
				<span>INF 400</span>
				<span>▸ 24</span>
				<span>▸ 25</span>
				<span>▸ 26</span>
			</div>
			<div className="sheet-grid">
				{SERVICES.map((s, i) => (
					<a
						key={s.n}
						href={waLink(`¡Hola Imagine Nation! Me interesa ${s.msg}.`)}
						target="_blank"
						rel="noopener noreferrer"
						className={`frame ${i === active ? "is-picked" : ""}`}
						onMouseEnter={() => {
							paused.current = true;
							setActive(i);
						}}
						onClick={onShoot}
					>
						<span className="frame-n">{s.n}</span>
						<span className="frame-l">{s.label}</span>
						<svg className="frame-mark" viewBox="0 0 100 75" aria-hidden="true">
							<path
								pathLength="1"
								d="M52 6 C 84 4, 97 22, 95 38 C 93 58, 70 70, 46 68 C 20 66, 4 54, 5 37 C 6 18, 26 8, 58 9"
							/>
						</svg>
					</a>
				))}
			</div>
			<p className="sheet-hint">Toca un cuadro y cotiza ese servicio</p>
		</div>
	);
}

const SectionLabel = ({ children, d }) => (
	<p className="sec-label rv" style={{ "--d": d }}>
		<span className="sec-line" />
		{children}
		<span className="sec-line" />
	</p>
);

/* ================== HOME ================== */
export const Home = () => {
	const [reduce] = useState(
		() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
	);
	const [showIntro, setShowIntro] = useState(() => {
		if (reduce) return false;
		try {
			return !sessionStorage.getItem("inf-intro-seen");
		} catch {
			return true;
		}
	});
	const [ready, setReady] = useState(false);
	const [flash, setFlash] = useState(0);

	const openStage = useCallback(() => setReady(true), []);
	const endIntro = useCallback(() => {
		try {
			sessionStorage.setItem("inf-intro-seen", "1");
		} catch {
			/* noop */
		}
		setShowIntro(false);
	}, []);

	useEffect(() => {
		if (showIntro) return;
		const id = requestAnimationFrame(() => setReady(true));
		return () => cancelAnimationFrame(id);
	}, [showIntro]);

	const shoot = () => {
		if (!reduce) setFlash((f) => f + 1);
	};

	const onCardMove = (e) => {
		const el = e.currentTarget;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		el.style.setProperty("--mx", `${px * 100}%`);
		el.style.setProperty("--my", `${py * 100}%`);
		if (!reduce) {
			el.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
			el.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
		}
	};
	const onCardLeave = (e) => {
		e.currentTarget.style.setProperty("--rx", "0deg");
		e.currentTarget.style.setProperty("--ry", "0deg");
	};

	const onMag = (e) => {
		if (reduce) return;
		const el = e.currentTarget;
		const r = el.getBoundingClientRect();
		el.style.setProperty("--tx", `${(e.clientX - r.left - r.width / 2) * 0.4}px`);
		el.style.setProperty("--ty", `${(e.clientY - r.top - r.height / 2) * 0.4}px`);
	};
	const onMagLeave = (e) => {
		e.currentTarget.style.setProperty("--tx", "0px");
		e.currentTarget.style.setProperty("--ty", "0px");
	};

	const tapeItems = [...TAPE, ...TAPE];

	return (
		<div className={`inf-wrap ${ready ? "inf-ready" : ""}`}>
			{showIntro && <Intro onOpen={openStage} onDone={endIntro} />}
			{flash > 0 && <div key={flash} className="inf-flash" aria-hidden="true" />}
			<FocusCursor />

			{/* ---------- Atmósfera ---------- */}
			<div className="bg-grid" aria-hidden="true" />
			<span className="leak leak-1" aria-hidden="true" />
			<span className="leak leak-2" aria-hidden="true" />
			<div className="strip strip-l" aria-hidden="true" />
			<div className="strip strip-r" aria-hidden="true" />
			<div className="inf-noise" aria-hidden="true" />
			<div className="inf-vignette" aria-hidden="true" />
			<div className="inf-frames" aria-hidden="true">
				<span className="inf-frame f1" />
				<span className="inf-frame f2" />
				<span className="inf-frame f3" />
			</div>

			<div className="inf-corner tl" aria-hidden="true" />
			<div className="inf-corner tr" aria-hidden="true" />
			<div className="inf-corner bl" aria-hidden="true" />
			<div className="inf-corner br" aria-hidden="true" />

			{/* ---------- HUD de cámara ---------- */}
			<div className="hud hud-top" aria-hidden="true">
				<span className="hud-rec">
					<span className="rec-dot" /> REC <Timecode />
				</span>
				<span className="hud-right">
					<span className="hud-hide-sm">4K · 24FPS ·</span> BOG <BogotaClock />
				</span>
			</div>
			<div className="hud hud-bottom" aria-hidden="true">
				<span>
					ISO 800 <b>·</b> f/1.8 <b>·</b> 1/50
				</span>
				<span className="hud-batt">
					<i />
					<i />
					<i />
					<i />
					<i className="off" />
				</span>
			</div>

			{/* ---------- Contenido ---------- */}
			<main className="inf-card">
				<div className="vf rv rv-pop" style={{ "--d": "0.05s" }}>
					<Iris />
					<span className="vf-corner c1" />
					<span className="vf-corner c2" />
					<span className="vf-corner c3" />
					<span className="vf-corner c4" />
					<span className="vf-scan" />
					<span className="vf-label vf-label-tl">AF-C</span>
					<span className="vf-label vf-label-br">RAW</span>
					<div className="inf-logo-box">
						<img src={logoUrl} alt="Imagine Nation Films" className="inf-logo" />
					</div>
				</div>

				<p className="eyebrow rv" style={{ "--d": "0.25s" }}>
					<span className="eyebrow-dot" /> Agencia creativa · Bogotá, CO
				</p>

				<h1 className="hl rv" style={{ "--d": "0.35s" }}>
					<span className="sr-only">Creamos historias, campañas, marcas y contenidos que se sienten.</span>
					<span aria-hidden="true">
						Creamos <RotatingWord words={WORDS} reduce={reduce} />
						<br />
						que se sienten.
					</span>
				</h1>

				<p className="sub rv" style={{ "--d": "0.45s" }}>
					Publicidad, marketing, fotografía y creación de contenido para marcas que quieren que las miren dos veces.
				</p>

				<div className="tapes" aria-hidden="true">
					<div className="tape tape-b">
						<div className="tape-track">
							{[0, 1].map((k) => (
								<span className="tape-half" key={k}>
									{tapeItems.map((t, i) => (
										<span className="tape-item" key={`${k}-${i}`}>
											{t} <em>✦</em>
										</span>
									))}
								</span>
							))}
						</div>
					</div>
					<div className="tape tape-a">
						<div className="tape-track">
							{[0, 1].map((k) => (
								<span className="tape-half" key={k}>
									{tapeItems.map((t, i) => (
										<span className="tape-item" key={`${k}-${i}`}>
											{t} <em>●</em>
										</span>
									))}
								</span>
							))}
						</div>
					</div>
				</div>

				<SectionLabel d="0.6s">Conecta con nosotros</SectionLabel>

				<nav className="links" aria-label="Enlaces de Imagine Nation Films">
					{LINKS.map((l, i) => (
						<div key={l.label} className="lk-slot rv rv-left" style={{ "--d": `${0.7 + i * 0.09}s` }}>
							<a
								href={l.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`lk ${l.featured ? "is-featured" : ""}`}
								onMouseMove={onCardMove}
								onMouseLeave={onCardLeave}
								onClick={shoot}
							>
								<span className="lk-wipe" />
								<span className="lk-glow" />
								{l.featured && <span className="lk-shine" />}
								<span className="lk-tag">{l.tag}</span>
								<span className="lk-icon">
									<Icon name={l.icon} />
								</span>
								<span className="lk-text">
									<strong>
										{l.label}
										{l.featured && <em className="lk-badge">Cotiza aquí</em>}
									</strong>
									<small>{l.sublabel}</small>
								</span>
								<span className="lk-arrow">
									<Icon name="arrow" size={18} />
								</span>
							</a>
						</div>
					))}
				</nav>

				<SectionLabel d="1.05s">Lo que hacemos</SectionLabel>
				<ContactSheet onShoot={shoot} reduce={reduce} />

				<div className="socials">
					{SOCIALS.map((s, i) => (
						<div key={s.label} className="soc-slot rv rv-pop" style={{ "--d": `${1.3 + i * 0.08}s` }}>
							<a
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								className="soc"
								aria-label={s.label}
								onMouseMove={onMag}
								onMouseLeave={onMagLeave}
								onClick={shoot}
							>
								<Icon name={s.icon} size={20} />
								<span className="soc-tip">{s.label}</span>
							</a>
						</div>
					))}
				</div>

				<p className="inf-foot rv" style={{ "--d": "1.6s" }}>
					© {new Date().getFullYear()} · IMAGINE NATION FILMS
					<span>Hecho con luz en Bogotá</span>
				</p>
			</main>
		</div>
	);
};

export default Home;