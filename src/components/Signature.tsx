import React from "react";
import { SignatureData } from "../types/signature";
import Profile from "../assets/steve-jobs.jpg";

type SignatureProps = SignatureData;

const Signature: React.FC<SignatureProps> = (props) => {
    const avatarSrc = props.photo === "no-photo" || !props.photo ? Profile : props.photo;

    // SVGs Inline para Redes Sociais (Zero dependência externa = Zero erros de CORS)
    const renderSocialIcons = (size = "20px") => {
        const iconStyle = { width: size, height: size, display: "block" };

        const socials = [
            {
                url: props.linkedinUrl,
                icon: (
                    <svg viewBox="0 0 24 24" style={iconStyle} fill="#0a66c2">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                )
            },
            {
                url: props.githubUrl,
                icon: (
                    <svg viewBox="0 0 24 24" style={iconStyle} fill="#333333">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                )
            },
            {
                url: props.instagramUrl,
                icon: (
                    <svg viewBox="0 0 24 24" style={iconStyle} fill="#e1306c">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                )
            },
            {
                url: props.whatsappNumber ? `https://wa.me/${props.whatsappNumber}` : "",
                icon: (
                    <svg viewBox="0 0 24 24" style={iconStyle} fill="#25d366">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m0 1.83c2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.6 2.4 5.8 0 4.53-3.69 8.22-8.22 8.22-1.42 0-2.8-.38-4-1.1l-.29-.17-3.03.8.81-2.95-.19-.31C3.89 15.35 3.42 13.7 3.42 11.91c0-4.53 3.69-8.22 8.22-8.22m5.07 10.66c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.47.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.28-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.27.18 1.75.11.54-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
                    </svg>
                )
            },
            {
                url: props.youtubeUrl,
                icon: (
                    <svg viewBox="0 0 24 24" style={iconStyle} fill="#ff0000">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                )
            }
        ].filter(s => s.url && s.url.trim() !== "");

        if (socials.length === 0) return null;

        return (
            <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                {socials.map((s, index) => (
                    <a key={index} href={s.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: 0 }}>
                        {s.icon}
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
                        <tr><td style={{ paddingLeft: "12px", paddingTop: "4px" }}>{renderSocialIcons("20px")}</td></tr>
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
                        <tr><td style={{ paddingTop: "6px" }}>{renderSocialIcons("18px")}</td></tr>
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
                            <div>{renderSocialIcons("18px")}</div>
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
                {renderSocialIcons("20px")}
            </div>
        </div>
    );
};

export default Signature;