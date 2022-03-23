import Footer from "../components/Footer";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/app/store";
import { fetchCv } from "../redux/features/checkCvSlice";

export default function TraCuu() {
    const [state, setState] = useState({ cccd: "" })
    const [errors, setErrors] = useState({
        fields: {
            cccd: ""
        }
    });
    const dispatch = useDispatch();
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const cv: any = useSelector((state: RootState) => state.cv.check);
 
    const handleSearch = () => {
        const isValid = validate();
        if (isValid === true) {
            dispatch(fetchCv(state.cccd));
        }
    }

    const validate = () => {
        var fields: any = {};
        var isValid = true;
        if (state.cccd === "") {
            fields["cccd"] = "Không được trống";
            isValid = false;
        }
        setErrors({ ...errors, fields: fields })
        return isValid;
    }

    const handleCheckProfile = () => {

        if (cv === 0 && state.cccd != "") {
            return (
                <span style={{ color: "red" }}>Không có hồ sơ</span>

            )
        } if (errors.fields.cccd != "" && state.cccd === "") {
            return (
                <span style={{ color: "red" }}>{errors.fields.cccd}</span>
            )
        }

    }

    return (
        <div style={{ backgroundColor: "white", backgroundImage: "url('img/background.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Header></Header>
            <div className="container" style={{ height: "65vh" }}>
                <div style={{ textAlign: "center", color: "#4169E1" }}> <h3>Tra Cứu Hồ Sơ</h3></div>
                <div style={{ height: "25vh" }}>
                    <form style={{ position: "relative", margin: "auto" }}>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="cccd" placeholder="Nhập CCCD hoặc CMND"
                                onChange={(e) => handleOnChange(e)}
                                style={{
                                    borderRadius: "10px"
                                }} />
                        </div>
                        <FontAwesomeIcon className="mx-2" icon={faSearch} size="lg"
                            onClick={() => handleSearch()}
                            style={{ position: "absolute", right: "10", bottom: "10px", }}
                        />
                    </form>
                    {handleCheckProfile()}
                    {cv != 0 && state.cccd != "" ? <> <span className="profile">Hồ Sơ : {cv[0].surname} {cv[0].name}</span>
                        <a href={"http://localhost:8080/admintlus/" + cv[0].slug_pdf} target="_blank" style={{ marginLeft: "1.5rem" }} rel="noreferrer">
                            <span style={{ color: "rgb(0, 0, 255)" }}>Xem tại đây</span></a>
                        <a href="/capnhat" target="_blank"><span style={{ color: "rgb(0, 0, 255)", marginLeft: "1rem" }}>Cập nhật</span></a></> : ""}

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}