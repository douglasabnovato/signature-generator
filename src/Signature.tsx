import {PhotoSignatureProps} from "./App";
import Profile from "./assets/steve-jobs.jpg";

const Signature = (props: PhotoSignatureProps) => {
    return (
        <table cellPadding={0} cellSpacing={0} className={"signature"}>
            <tbody>
            <tr>
                <td rowSpan={5}>
                    <img
                        className={"main-image"}
                        src={props.photo === "no-photo" ? Profile : props.photo}
                        alt={""}
                    />
                </td>
                <td rowSpan={5}>
                    <div
                        className={"vertical-line"}
                    />
                </td>
                <td>{props.fullName}</td>
            </tr>
            <tr>
                <td colSpan={3}>{props.position}</td>
            </tr>
            <tr>
                <td colSpan={3}>Cell Phone: {props.phone}</td>
            </tr>
            <tr>
                <td colSpan={3}>Site: {props.site}</td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <div className={"social-logos-frame"}>
                        <a href={"https://www.instagram.com/"} target="_blank">
                            <img src={"https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-5.png"} width={"32px"} height={"32px"} alt={""}/>
                        </a>
                        <a href={"https://www.linkedin.com/"} target="_blank">
                            <img src={"https://www.freepnglogos.com/uploads/linkedin-social-media-logo-7.png"} width={"32px"} height={"32px"} alt={""}/>
                        </a>
                        <a href={"https://www.github.com/"} target="_blank">
                            <img src={"https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"} width={"32px"} height={"32px"} alt={""}/>
                        </a>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default Signature;
