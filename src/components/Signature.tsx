import React from "react";
import { SignatureData } from "../types/signature";
import Profile from "../assets/steve-jobs.jpg";

type SignatureProps = SignatureData;

const Signature: React.FC<SignatureProps> = (props) => {
    const avatarSrc = props.photo === "no-photo" || !props.photo ? Profile : props.photo;

    // Renderizador dinâmico de ícones sociais
    const renderSocialIcons = (size = "24px") => {
        const socials = [
            { url: props.linkedinUrl, img: "https://www.freepnglogos.com/uploads/linkedin-social-media-logo-7.png", alt: "LinkedIn" },
            { url: props.githubUrl, img: "https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png", alt: "GitHub" },
            { url: props.instagramUrl, img: "https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-5.png", alt: "Instagram" },
            { url: props.whatsappNumber ? `https://wa.me/${props.whatsappNumber}` : "", img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", alt: "WhatsApp" },
            { url: props.youtubeUrl, img: "https://www.freepnglogos.com/uploads/youtube-logo-png-transparent-image-5.png", alt: "YouTube" },
        ].filter(s => s.url && s.url.trim() !== "");

        if (socials.length === 0) return null;

        return (
            <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                {socials.map((s, index) => (
                    <a key={index} href={s.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <img src={s.img} width={size} height={size} alt={s.alt} style={{ display: "block" }} />
                    </a>
                ))}
            </div>
        );
    };

    // ==========================================
    // GRUPO 1: ASSINATURAS DE E-MAIL
    // ==========================================
    if (props.productType === "email-signature") {
        if (props.template === "classic") {
            return (
                <table cellPadding={0} cellSpacing={0} className={"signature"} style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#333" }}>
                    <tbody>
                        <tr>
                            <td rowSpan={5} style={{ paddingRight: "12px" }}>
                                <img className={"main-image"} src={avatarSrc} alt={""} width={"110px"} height={"110px"} style={{ borderRadius: "8px", objectFit: "cover" }} />
                            </td>
                            <td rowSpan={5} style={{ borderRight: "2px solid #e5e7eb", paddingRight: "12px" }}></td>
                            <td style={{ paddingLeft: "12px", fontWeight: "bold", fontSize: "16px", color: "#111827" }}>{props.fullName || "Seu Nome"}</td>
                        </tr>
                        <tr><td style={{ paddingLeft: "12px", color: "#4b5563", paddingBottom: "4px" }}>{props.position || "Seu Cargo"}</td></tr>
                        <tr><td style={{ paddingLeft: "12px", color: "#6b7280", fontSize: "13px" }}>Tel: {props.phone || "(00) 00000-0000"}</td></tr>
                        <tr><td style={{ paddingLeft: "12px", color: "#2563eb", fontSize: "13px" }}><a href={props.site} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>{props.site || "www.site.com"}</a></td></tr>
                        <tr><td style={{ paddingLeft: "12px", paddingTop: "4px" }}>{renderSocialIcons("22px")}</td></tr>
                    </tbody>
                </table>
            );
        }

        if (props.template === "modern") {
            return (
                <table cellPadding={0} cellSpacing={0} className={"signature"} style={{ fontFamily: "sans-serif", fontSize: "14px", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px" }}>
                    <tbody>
                        <tr>
                            <td style={{ paddingBottom: "8px", borderBottom: "1px solid #e5e7eb" }}>
                                <table cellPadding={0} cellSpacing={0}>
                                    <tbody>
                                        <tr>
                                            {props.photo !== "no-photo" && (
                                                <td style={{ paddingRight: "10px" }}>
                                                    <img src={avatarSrc} alt="" width={"45px"} height={"45px"} style={{ borderRadius: "50%", objectFit: "cover" }} />
                                                </td>
                                            )}
                                            <td>
                                                <div style={{ fontWeight: "bold", fontSize: "15px", color: "#111827" }}>{props.fullName || "Seu Nome"}</div>
                                                <div style={{ color: "#4b5563", fontSize: "12px" }}>{props.position || "Seu Cargo"}</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr><td style={{ paddingTop: "8px", fontSize: "13px", color: "#4b5563" }}>📱 {props.phone} &nbsp;|&nbsp; 🌐 <a href={props.site} style={{ color: "#2563eb", textDecoration: "none" }}>{props.site}</a></td></tr>
                        <tr><td style={{ paddingTop: "6px" }}>{renderSocialIcons("20px")}</td></tr>
                    </tbody>
                </table>
            );
        }

        // Minimalist
        return (
            <table cellPadding={0} cellSpacing={0} className={"signature"} style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "4px", backgroundColor: "#2563eb", borderRadius: "2px" }} />
                        <td style={{ paddingLeft: "12px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "16px", color: "#111827" }}>{props.fullName || "Seu Nome"}</div>
                            <div style={{ color: "#4b5563", fontSize: "13px", marginBottom: "4px" }}>{props.position} — <span style={{ color: "#2563eb" }}>{props.site}</span></div>
                            <div style={{ color: "#6b7280", fontSize: "12px", marginBottom: "4px" }}>Tel: {props.phone}</div>
                            <div>{renderSocialIcons("20px")}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    // ==========================================
    // GRUPO 2: CRACHÁS DIGITAIS (ID CARDS)
    // ==========================================
    if (props.productType === "digital-badge") {
        return (
            <div className="signature" style={{ width: "280px", background: "#0b0f19", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px", fontFamily: "sans-serif", color: "#fff", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "1px", color: "#38bdf8", fontWeight: "bold" }}>DIGITAL ID CARD</span>
                    <span style={{ fontSize: "10px", color: "#94a3b8" }}>{props.department || "CORE TEAM"}</span>
                </div>
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                    <img src={avatarSrc} alt="" style={{ width: "75px", height: "75px", borderRadius: "50%", objectFit: "cover", border: "2px solid #38bdf8", margin: "0 auto" }} />
                    <div style={{ fontWeight: "bold", fontSize: "16px", marginTop: "8px" }}>{props.fullName || "Nome do Profissional"}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>{props.position || "Cargo / Função"}</div>
                </div>
                <div style={{ background: "#111827", padding: "8px", borderRadius: "6px", fontSize: "11px", display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}>
                    <span>ID: <b>{props.badgeId || "000000"}</b></span>
                    <span>EXP: <b>{props.badgeExpiration || "31-12-28"}</b></span>
                </div>
            </div>
        );
    }

   // ==========================================
    // GRUPO 3: CARTÕES DE VISITA DIGITAIS (MOBILE)
    // ==========================================
    return (
        <div className="signature" style={{ width: "260px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "16px", fontFamily: "sans-serif", color: "#1e293b", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <div style={{ height: "45px", background: "linear-gradient(135deg, #f97316 0%, #ea580c 100% )", borderRadius: "10px 10px 0 0", margin: "-16px -16px 12px -16px", width: "calc(100% + 32px)" }}></div>
            <img src={avatarSrc} alt="" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", marginTop: "-38px", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", position: "relative" }} />
            <div style={{ fontWeight: "bold", fontSize: "15px", marginTop: "4px", color: "#0f172a" }}>{props.fullName || "Seu Nome"}</div>
            <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "10px" }}>{props.position || "Especialista"}</div>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center", marginBottom: "12px" }}>
                {props.specialties.map((spec, i) => (
                    <span key={i} style={{ fontSize: "9px", background: "#ffedd5", color: "#c2410c", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>{spec}</span>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", paddingTop: "6px", borderTop: "1px solid #f1f5f9" }}>
                {renderSocialIcons("22px")}
            </div>
        </div>
    );
};

export default Signature;