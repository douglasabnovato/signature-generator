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
} from "@material-ui/core";
import Signature from "./Signature";
import {
    CheckOutlined,
    FileCopyOutlined
} from "@material-ui/icons";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";
import "./App.css";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
            },
            "& .label-root": {
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
        customColor: {
            backgroundColor: green[500]
        },
        customHeight: {
            minHeight: 220
        },
    })
);

export interface PhotoSignatureProps {
    fullName: string;
    position: string;
    site: string;
    phone: string;
    photo: string;
}

interface State extends PhotoSignatureProps {
    withPhoto: boolean;
    copied: boolean;
}

const initialState: State = {
    fullName: "",
    position: "",
    site: "",
    phone: "",
    photo: "",
    withPhoto: false,
    copied: false,
};

function App() {
    const classes = useStyles();
    const [state, setState] = React.useState<State>(initialState);
    const [example] = useState("primary");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "withPhoto") {
            setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.checked,
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }));
        }
    };

    const enoughData = () => {
        let progress = 100;
        if (state.withPhoto) {
            if (
                state.fullName &&
                state.phone &&
                state.position &&
                state.site &&
                state.photo
            ) {
                return (
                    <React.Fragment>
                        <Signature
                            fullName={state.fullName}
                            position={state.position}
                            site={state.site}
                            phone={state.phone}
                            photo={state.photo}
                        />
                        <br />
                        <Button
                            disabled={state.photo.length > photoUrlMaxLength}
                            onClick={copyToClipboard}
                            endIcon={state.copied ? <CheckOutlined /> : <FileCopyOutlined />}
                        >
                            {state.copied ? "Copied." : "Copy to clipboard."}
                        </Button>
                    </React.Fragment>
                );
            } else {
                Object.entries(state).forEach(([key, value]) => {
                    if (
                        ["fullName", "phone", "position", "site", "photo"].includes(key)
                    ) {
                        if (value.length === 0) {
                            progress = progress - 20;
                        }
                    }
                });
            }
        } else {
            if (state.fullName && state.phone && state.position && state.site) {
                return (
                    <React.Fragment>
                        <Signature
                            fullName={state.fullName}
                            position={state.position}
                            site={state.site}
                            phone={state.phone}
                            photo={"no-photo"}
                        />
                        <br />
                        <Button
                            onClick={copyToClipboard}
                            endIcon={state.copied ? <CheckOutlined /> : <FileCopyOutlined />}
                        >
                            {state.copied ? "Copied" : "Copy to clipboard"}
                        </Button>
                    </React.Fragment>
                );
            } else {
                Object.entries(state).forEach(([key, value]) => {
                    if (["fullName", "phone", "position", "site"].includes(key)) {
                        if (value.length === 0) {
                            progress = progress - 25;
                        }
                    }
                });
            }
        }
        if (progress > 0) {
            return (
                <div className={classes.centeredText}>
                    <CircularProgressWithLabel variant="determinate" value={progress} />
                </div>
            );
        } else {
            return <div>Please, input your data</div>;
        }
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
            let successful = document.execCommand("copy");
            console.log(successful ? "Success" : "Fail");
            setState((prevState) => ({
                ...prevState,
                copied: true,
            }));
        } catch (err) {
            console.log("Fail");
        }
    };

    const isStateChanged = () => {
        return JSON.stringify(state) === JSON.stringify(initialState);
    };

    const clearState = () => {
        setState(initialState);
    };

    const photoUrlMaxLength = 1000;

    return (
        <Container>
            <AppBar
                className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight}`}
            >
                <Toolbar>
                    <Typography variant="h5">Signature Generator App</Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off">
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
                                label="Position"
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
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.withPhoto}
                                        onChange={handleChange}
                                        name="withPhoto"
                                        color="primary"
                                    />
                                }
                                label={state.withPhoto ? "Photo" : "No photo"}
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
                                        "It's not an image url, but, probably, image in base64 form. Please, choose appropriate data."
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
                <Grid item xs={6}>
                    <Paper className={classes.paper}>{enoughData()}</Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
