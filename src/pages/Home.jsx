import { useState, useEffect } from "react";
import "../Styles/home.css";
import logoUrl from "../assets/img/img2.png";

const LINKS = [
	{ label: "Sitio Web", sublabel: "imaginenationfilms.com", url: "https://imaginenationfilms.com/", tag: "01" },
	{ label: "WhatsApp", sublabel: "Escríbenos directo", url: "https://wa.me/573173820560", tag: "02" },
	{ label: "Instagram", sublabel: "@imaginenation.films", url: "https://www.instagram.com/imaginenation.films/", tag: "03" },
	{ label: "YouTube", sublabel: "Nuestros proyectos", url: "https://www.youtube.com/", tag: "04" },
];

const SOCIALS = [
	{ label: "IG", url: "https://www.instagram.com/imaginenation.films/" },
	{ label: "WA", url: "https://wa.me/573173820560" },
	{ label: "WEB", url: "https://imaginenationfilms.com/" },
];

export const Home = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const onMove = (e) => {
		const t = e.currentTarget;
		const r = t.getBoundingClientRect();
		t.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
		t.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
	};

	return (
		<div className={`inf-wrap ${mounted ? "inf-ready" : ""}`}>
			<div className="inf-noise" />
			<div className="inf-vignette" />

			<div className="inf-frames">
				<span className="inf-frame f1" />
				<span className="inf-frame f2" />
				<span className="inf-frame f3" />
			</div>

			<div className="inf-corner tl" />
			<div className="inf-corner tr" />
			<div className="inf-corner bl" />
			<div className="inf-corner br" />

			<main className="inf-card">
				<div className="inf-viewfinder">
					<span className="vf-corner c1" />
					<span className="vf-corner c2" />
					<span className="vf-corner c3" />
					<span className="vf-corner c4" />
					<span className="vf-scan" />
					<span className="vf-rec">
						<span className="vf-dot" /> REC
					</span>
					<div className="inf-logo-box">
						<img src={logoUrl} alt="Imagine Nation Films" className="inf-logo" />
					</div>
				</div>

				<p className="inf-tag">
					<span className="inf-line" />
					Historias que se sienten · Bogotá, CO
					<span className="inf-line" />
				</p>

				<div className="inf-links">
					{LINKS.map((l, i) => (
						<a
							key={l.label}
							href={l.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inf-link"
							onMouseMove={onMove}
							style={{ "--d": `${i * 0.09 + 0.35}s` }}
						>
							<span className="inf-link-glow" />
							<span className="inf-link-tag">{l.tag}</span>
							<span className="inf-link-text">
								<strong>{l.label}</strong>
								<small>{l.sublabel}</small>
							</span>
							<span className="inf-arrow">
								<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
						</a>
					))}
				</div>

				<div className="inf-socials">
					{SOCIALS.map((s, i) => (
						<a
							key={s.label}
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inf-social"
							style={{ "--d": `${i * 0.1 + 0.8}s` }}
						>
							{s.label}
						</a>
					))}
				</div>

				<p className="inf-foot">© {new Date().getFullYear()} · IMAGINE NATION FILMS</p>
			</main>
		</div>
	);
};

export default Home;