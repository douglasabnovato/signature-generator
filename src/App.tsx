import React, { useState } from "react";
import {
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
    Button,
    Container,
    FormControlLabel,
    Switch,
    TextField,
    MenuItem,
    Snackbar,
    ButtonGroup,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Signature from "./components/Signature";
import {
    CheckOutlined,
    FileCopyOutlined,
    GetAppOutlined,
    Brightness4Outlined,
    Brightness7Outlined,
} from "@material-ui/icons";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";
import { SignatureData } from "./types/signature";
import { calculateProgress } from "./utils/signatureHelpers";
import { toPng } from "html-to-image";
import "./App.css";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
            },
        },
        paper: {
            marginTop: 75,
            padding: theme.spacing(3),
            textAlign: "left",
            color: theme.palette.text.secondary,
        },
        centeredText: {
            textAlign: "center",
        },
        previewContainerDark: {
            backgroundColor: "#0b0f19",
            padding: "24px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "220px",
        },
        previewContainerLight: {
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "220px",
            border: "1px solid #e2e8f0",
        },
        customColor: {
            backgroundColor: green[500]
        },
        customHeight: {
            minHeight: 220
        },
    })
);

const initialState: SignatureData = {
    productType: "email-signature",
    template: "classic",
    fullName: "",
    position: "",
    site: "",
    phone: "",
    email: "",
    photo: "",
    withPhoto: false,
    copied: false,
    linkedinUrl: "",
    githubUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    whatsappNumber: "",
    twitterUrl: "",
    youtubeUrl: "",
    badgeId: "",
    badgeExpiration: "",
    department: "",
    specialties: ["PREDIAL", "INDUSTRIAL", "RESIDENCIAL", "MANUTENÇÃO"],
};

function App() {
    const classes = useStyles();
    const [state, setState] = useState<SignatureData>(initialState);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("Conteúdo copiado com sucesso!");
    const [isDarkModePreview, setIsDarkModePreview] = useState(true);
    const [example] = useState("primary");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const target = event.target as HTMLInputElement;
        const name = target.name as keyof SignatureData;
        const value = target.type === "checkbox" ? target.checked : target.value;

        setState(prevState => {
            let newState = { ...prevState, [name]: value };

            if (name === "productType") {
                if (value === "email-signature") newState.template = "classic";
                if (value === "digital-badge") newState.template = "tech";
                if (value === "digital-business-card") newState.template = "mobile-app";
            }

            return newState;
        });
    };

    const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setToastOpen(false);
    };

    const renderSignatureContent = () => {
        const progress = calculateProgress(state);

        const hasRequiredData = state.withPhoto
            ? Boolean(state.fullName && state.phone && state.position && state.site && state.photo)
            : Boolean(state.fullName && state.phone && state.position && state.site);

        if (hasRequiredData) {
            return (
                <React.Fragment>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#64748b", textTransform: "uppercase" }}>
                            Preview [{state.productType}]
                        </span>
                        <ButtonGroup size="small" variant="outlined">
                            <Button 
                                onClick={() => setIsDarkModePreview(true)}
                                color={isDarkModePreview ? "primary" : "default"}
                                startIcon={<Brightness4Outlined />}
                            >
                                Dark
                            </Button>
                            <Button 
                                onClick={() => setIsDarkModePreview(false)}
                                color={!isDarkModePreview ? "primary" : "default"}
                                startIcon={<Brightness7Outlined />}
                            >
                                Light
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className={isDarkModePreview ? classes.previewContainerDark : classes.previewContainerLight}>
                        <Signature
                            {...state}
                            photo={state.withPhoto ? state.photo : "no-photo"}
                        />
                    </div>

                    <br />
                    
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={copyToClipboard}
                            endIcon={state.copied ? <CheckOutlined /> : <FileCopyOutlined />}
                        >
                            {state.copied ? "Copiado" : "Copiar HTML"}
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={downloadAsImage}
                            startIcon={<GetAppOutlined />}
                        >
                            Baixar como Imagem (PNG)
                        </Button>
                    </div>
                </React.Fragment>
            );
        }

        if (progress > 0) {
            return (
                <div className={classes.centeredText}>
                    <CircularProgressWithLabel variant="determinate" value={progress} />
                </div>
            );
        }

        return <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>Preencha os dados obrigatórios no formulário para gerar sua identidade digital em tempo real.</div>;
    };

    const copyToClipboard = () => {
        let copyText = document.querySelector(".signature");
        const range = document.createRange();

        if (copyText) {
            range.selectNode(copyText);
        }
        
        const windowSelection = window.getSelection();
        if (windowSelection) {
            windowSelection.removeAllRanges();
            windowSelection.addRange(range);
        }
        try {
            document.execCommand("copy");
            setState((prevState) => ({ ...prevState, copied: true }));
            setToastMessage("Assinatura copiada com sucesso para o clipboard!");
            setToastOpen(true);
        } catch (err) {
            console.log("Fail to copy");
        }
    };

    const downloadAsImage = () => {
        const node = document.querySelector(".signature") as HTMLElement;
        if (!node) return;

        toPng(node, { cacheBust: true, quality: 0.95, fontEmbedCSS: '' })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = `${state.productType}-${state.fullName || "identidade"}.png`;
                link.href = dataUrl;
                link.click();
                setToastMessage("Card baixado como imagem PNG com sucesso!");
                setToastOpen(true);
            })
            .catch((err) => {
                console.error("Erro ao gerar imagem:", err);
            });
    };

    const isStateChanged = () => {
        return JSON.stringify(state) === JSON.stringify(initialState);
    };

    const clearState = () => {
        setState(initialState);
    };

    const photoUrlMaxLength = 1000;

    return (
        <Container maxWidth="lg" style={{ marginTop: "24px", marginBottom: "40px" }}>
            <AppBar position="static" style={{ borderRadius: "8px", marginBottom: "24px" }}
                className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight}`}
            >
                <Toolbar>
                    <Typography variant="h6">Digital Identity Suite v5.0 — Gerador Profissional</Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                select
                                fullWidth={true}
                                label="Identity Product"
                                value={state.productType}
                                name="productType"
                                onChange={handleChange}
                            >
                                <MenuItem value="email-signature">📧 Assinatura de E-mail</MenuItem>
                                <MenuItem value="digital-badge">🪪 Crachá Digital (ID Card)</MenuItem>
                                <MenuItem value="digital-business-card">📱 Cartão de Visitas Digital</MenuItem>
                            </TextField>

                            <TextField
                                select
                                fullWidth={true}
                                label="Design Variation (Template)"
                                value={state.template}
                                name="template"
                                onChange={handleChange}
                            >
                                {state.productType === "email-signature" && (
                                    [
                                        <MenuItem key="classic" value="classic">Classic (Divisor Vertical)</MenuItem>,
                                        <MenuItem key="modern" value="modern">Modern (Card Destaque)</MenuItem>,
                                        <MenuItem key="minimalist" value="minimalist">Minimalist (Barra Lateral)</MenuItem>
                                    ]
                                )}
                                {state.productType === "digital-badge" && (
                                    [
                                        <MenuItem key="tech" value="tech">Tech Cyber (Frente/Verso com QR)</MenuItem>,
                                        <MenuItem key="corporate" value="corporate">Corporate Clean (Executivo)</MenuItem>,
                                        <MenuItem key="creative" value="creative">Creative Neon (Estilo Moderno)</MenuItem>
                                    ]
                                )}
                                {state.productType === "digital-business-card" && (
                                    [
                                        <MenuItem key="mobile-app" value="mobile-app">Mobile App (Estilo Smartphone)</MenuItem>,
                                        <MenuItem key="horizontal-banner" value="horizontal-banner">Horizontal Banner (Corporativo)</MenuItem>,
                                        <MenuItem key="sleek-dark" value="sleek-dark">Sleek Dark (Minimalista Escuro)</MenuItem>
                                    ]
                                )}
                            </TextField>

                            <TextField
                                fullWidth={true}
                                required
                                label="Full Name"
                                value={state.fullName}
                                name={"fullName"}
                                onChange={handleChange}
                                autoFocus={true}
                            />
                            <TextField
                                fullWidth={true}
                                required
                                label="Position / Title"
                                value={state.position}
                                name={"position"}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth={true}
                                required
                                label="Site"
                                value={state.site}
                                name={"site"}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth={true}
                                required
                                label="Telephone"
                                value={state.phone}
                                name={"phone"}
                                onChange={handleChange}
                            />

                            {state.productType === "digital-badge" && (
                                <React.Fragment>
                                    <TextField
                                        fullWidth={true}
                                        label="Badge ID (ex: 324553)"
                                        value={state.badgeId}
                                        name={"badgeId"}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth={true}
                                        label="Expiration Date (ex: 21-12-28)"
                                        value={state.badgeExpiration}
                                        name={"badgeExpiration"}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth={true}
                                        label="Department"
                                        value={state.department}
                                        name={"department"}
                                        onChange={handleChange}
                                    />
                                </React.Fragment>
                            )}

                            <TextField
                                fullWidth={true}
                                label="LinkedIn URL"
                                value={state.linkedinUrl}
                                name={"linkedinUrl"}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth={true}
                                label="GitHub URL"
                                value={state.githubUrl}
                                name={"githubUrl"}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth={true}
                                label="Instagram URL"
                                value={state.instagramUrl}
                                name={"instagramUrl"}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth={true}
                                label="WhatsApp Number (com DDI/DDD)"
                                value={state.whatsappNumber}
                                name={"whatsappNumber"}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth={true}
                                label="YouTube URL"
                                value={state.youtubeUrl}
                                name={"youtubeUrl"}
                                onChange={handleChange}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.withPhoto}
                                        onChange={handleChange}
                                        name="withPhoto"
                                        color="primary"
                                    />
                                }
                                label={state.withPhoto ? "Photo Enabled" : "No photo"}
                            />
                            {state.withPhoto && (
                                <TextField
                                    error={state.photo.length > photoUrlMaxLength}
                                    fullWidth={true}
                                    required
                                    label="Link to image"
                                    value={state.photo}
                                    name={"photo"}
                                    onChange={handleChange}
                                    helperText={
                                        state.photo.length > photoUrlMaxLength &&
                                        "It's not an image url, but image in base64 form."
                                    }
                                />
                            )}
                            <br />
                            <Button
                                disabled={isStateChanged()}
                                onClick={clearState}
                                color={"secondary"}
                            >
                                Clear
                            </Button>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        {renderSignatureContent()}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={toastOpen}
                autoHideDuration={4000}
                onClose={handleToastClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleToastClose} severity="success">
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default App;