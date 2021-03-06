import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import isMobilePhone from 'validator/lib/isMobilePhone';
import isNumeric from 'validator/lib/isNumeric';

import styles from '../styles/admissionsRegister.module.scss'

import { fa1 } from '@fortawesome/free-solid-svg-icons'
import { fa2 } from '@fortawesome/free-solid-svg-icons'
import { fa3 } from '@fortawesome/free-solid-svg-icons'

import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchShowDistrictByID, fetchShowRegion, fetchShowTemDistrictByID, fetchShowTemWardByID, fetchShowWardByID } from "../redux/features/regionSlice"
import { RootState, useAppDispatch } from "../redux/app/store"

import Header from "../components/Header"
import Footer from "../components/Footer"

import { useRouter } from 'next/router'
import { Typeahead } from "react-bootstrap-typeahead";
import { fetchHighSchool } from "../redux/features/highSchoolSlice";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { fetchCv, fetchUpdateCv } from "../redux/features/checkCvSlice";
import { fetchShowAspiration, fetchShowSubjectsById } from "../redux/features/aspirationSlice";


export default function UpdateCV(this: any) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const highSchool = useSelector((state: RootState) => state.highSchool);
    const data: any = useSelector((state: RootState) => state.login.data)
    const selectDistrictEL = useRef(null);
    const selectWardEL = useRef(null);
    const selectTemDistrictEL = useRef(null);
    const selectTemWardEL = useRef(null);
    const selectSubjects = useRef(null);

    const regions = useSelector((state: RootState) => state.region.regions);
    const districts = useSelector((state: RootState) => state.region.districts)
    const wards = useSelector((state: RootState) => state.region.wards)
    const temDistricts = useSelector((state: RootState) => state.region.temDistricts)
    const temWards = useSelector((state: RootState) => state.region.temWards)
    const aspirations: any = useSelector((state: RootState) => state.aspirations.aspiration)
    const cv: any = useSelector((state: RootState) => state.cv.check);

    const combinateSubjects: any = useSelector((state: RootState) => state.aspirations.subjects)
    // T???o input Datalist = Typeahead
    useEffect(() => {
        // ??K ????? kh??ng call api nhi???u l???n
        if (highSchool.length === 0) {
            dispatch(fetchHighSchool());
        }
    }, [dispatch, highSchool.length]);

    useEffect(() => {

        setStateSchoolName(highSchool)

    }, [highSchool])

    const [stateSchoolName, setStateSchoolName] = useState([]);
    const options = stateSchoolName.map((o: any) => `${o.name + " " + o.address + " " + o.code}`);

    /* **************************************** */
    const [state, setState] = useState({
        surname: "", name: "", birthday: "", cccd: "", gender: "", phone: "",
        region: "", district: "", ward: "", apartment_number: "", tem_region: null,
        tem_district: null, tem_ward: null, tem_apartment_number: null, school_name: "",
        aspiration: "", subjects: "", imgFrontCCCD: "", imgBackCCCD: "", graduate: "", "3x4": ""
    });
    const [errors, setErrors] = useState({
        fields: {
            surname: "", name: "", birthday: "", gender: "", phone: "",
            region: "", district: "", ward: "", apartment_number: "", tem_region: "",
            tem_district: "", tem_ward: "", tem_apartment_number: "", school_name: "",
            aspiration: "", subjects: "", imgFrontCCCD: "", imgBackCCCD: "", graduate: "", "3x4": ""
        }
    });
    useEffect(() => {
        document.title = "TLUS - C???p Nh???t H??? S??"
    }, [])

    useEffect(() => {
        if (data != "") {
            dispatch(fetchCv(data.cccd))
        }
    }, [data, dispatch])

    useEffect(() => {
        if (cv != 0) {
            setState({
                ...state,
                cccd: data.cccd, surname: cv[0].surname, name: cv[0].name,
                birthday: cv[0].birthday, gender: cv[0].gender, phone: cv[0].phone,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.cccd, cv]);

    useEffect(() => {
        console.log(state)
    }, [state])

    useEffect(() => {
        if (regions.length === 0)
            dispatch(fetchShowRegion());
    }, [dispatch, regions.length]);

    useEffect(() => {
        if (aspirations.length === 0) {
            dispatch(fetchShowAspiration());
        }
    }, [aspirations.length, dispatch]);

    useEffect(() => {
        if (data === "") {
            router.push("/login?referrer=capnhat")
        }
    }, [data, router])

    // OnChange Input
    const handleOnChange = (event: any) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
        if (name === "region") {
            dispatch(fetchShowDistrictByID(value));
            (selectDistrictEL as any).current.value = "";
            (selectWardEL as any).current.value = "";
        }
        if (name === "district") {
            dispatch(fetchShowWardByID(value));
            (selectWardEL as any).current.value = "";
        }
        if (name === "tem_region") {
            dispatch(fetchShowTemDistrictByID(value));
            (selectTemDistrictEL as any).current.value = "";
            (selectTemWardEL as any).current.value = "";
        }
        if (name === "tem_district") {
            dispatch(fetchShowTemWardByID(value));
            (selectTemWardEL as any).current.value = "";
        }
        if (name === "aspiration") {
            dispatch(fetchShowSubjectsById(value));
            (selectSubjects.current as any).value = ""
        }

    }

    // OnChange Img
    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target: any = event.target;
        const files: any = target.files[0];

        var file: any = files;
        var reader = new FileReader();
        reader.onload = function () {
            console.log(reader.result)
            setState({ ...state, [target.name]: reader.result });
        };

        reader.readAsDataURL(file);
    }
    // Submit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = validate();
        if (isValid === true) {

            dispatch(fetchCv(state.cccd))
            console.log(cv);
            if (cv === 0) { // ch??a c?? d??? li???u th?? qua hoso de tao
                router.push("/hoso" );
            } else { // ng?????c l???i th??? c???p nh???t
                dispatch(fetchUpdateCv(state)).unwrap().then(() => {
                    alert("C???p Nh???t Th??nh C??ng")
                }).catch(() => {
                    alert("C???p Nh???t Th???t B???i")
                });
            }
        }
    }
    useEffect(() => {
    },[])

    // Validate
    const validate = () => {
        var fields: any = {};
        var isValid = true;
        // Duy???t
        console.log(state.school_name);
        if (state.school_name.length === 0) {
            fields["school_name"] = "Kh??ng h???p l???";
            isValid = false;
        }
        Object.keys(state).map(function (key, index) {
            if ((state as any)[key] === "") {
                fields[key] = "Kh??ng ???????c tr???ng";
                isValid = false;
            }
            if (isMobilePhone(state.phone, ['vi-VN']) === false) {
                fields["phone"] = "S??? ??i???n tho???i kh??ng h???p l???";
                isValid = false;
            }
            if (isNumeric(state.cccd) === false) {
                fields["cccd"] = "CCCD ph???i l?? chu???i s???";
                isValid = false;
            }
        });
        setErrors({ ...errors, fields: fields })
        return isValid;
    }
    const handleLoadRegion = () => {
        return regions.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }
    const handleLoadDistrict = () => {
        return districts.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }
    const handleLoadWard = () => {
        return wards.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }
    const handleLoadTemDistrict = () => {
        return temDistricts.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }
    const handleLoadTemWard = () => {
        return temWards.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }
    const handleLoadAspirations = () => {
        return aspirations.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }
    const handleLoadSubjects = () => {
        return combinateSubjects.map((item: any, index: number) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }


    return (
        <>
            <Header></Header>

            <form className={clsx("row g-4", styles.form)} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.form_title}>
                    <h4 className="fw-bold fs-3" style={{ textAlign: "center" }}>C???p Nh???t</h4>
                    <h4 className="fw-bold fs-3">X??T H???C B??? L???P 12 THEO T??? H???P 3 M??N ?????T 1 N??M 2022</h4>
                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold fs-5">  <FontAwesomeIcon icon={fa1} className=" mx-2" />TH??NG TIN TH?? SINH</h6>
                </div>
                <div className="col-md-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">H??? l??t:</label>
                    <input type="text" className="form-control" name="surname" placeholder="H??? l??t *" value={state.surname || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.surname}</span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">T??n:</label>

                    <input type="text" className="form-control" name="name" placeholder="T??n *" value={state.name || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.name}</span>
                </div>
                <div className="col-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ng??y sinh:</label>

                    <input type="date" className="form-control" name="birthday" id="inputAddress" value={state.birthday || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.birthday}</span>
                </div>
                <div className="col-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">CMND/CCCD:</label>

                    <input type="text" className="form-control" name="cccd" id="inputAddress2" placeholder="CCCD, CMND *" value={state.cccd || ""} readOnly onChange={(e) => handleOnChange(e)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Gi???i t??nh:</label>

                    <select className="form-select" name="gender" defaultValue={""} value={state.gender} onChange={(e) => handleOnChange(e)}>
                        <option disabled value="">Ch???n gi???i t??nh</option>
                        <option value="1">Nam</option>
                        <option value="2">N???</option>
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.gender}</span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="phone" className="form-label">S??T:</label>

                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="S??T *" value={state.phone || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.phone}</span>

                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold">?????a ch??? th?????ng tr??</h6>
                </div>
                <div className="col-md-4">
                    <select className="form-select" defaultValue={""} name="region" onChange={(e) => handleOnChange(e)}>
                        <option disabled value="">T???nh/Th??nh th?????ng tr?? *</option>
                        {handleLoadRegion()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.region}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="district" defaultValue={""} ref={selectDistrictEL} onChange={(e) => handleOnChange(e)}>
                        <option value="">Qu???n/Huy???n th?????ng tr?? *</option>
                        {handleLoadDistrict()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.district}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="ward" ref={selectWardEL} defaultValue={""} onChange={(e) => handleOnChange(e)}>
                        <option value="">Ph?????ng/X?? th?????ng tr?? *</option>
                        {handleLoadWard()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.ward}</span>

                </div>
                <div className="col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">S??? nh??:</label>

                    <input type="text" className="form-control" id="inputAddress2" name="apartment_number" placeholder="?????a ch??? th?????ng tr?? *" onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.apartment_number}</span>

                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold">?????a ch??? t???m tr?? (N???u c??)</h6>
                </div>
                <div className="col-md-4">
                    <select className="form-select" defaultValue="" name="tem_region" onChange={(e) => handleOnChange(e)}>
                        <option value="">T???nh/Th??nh t???m tr?? </option>
                        {handleLoadRegion()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.tem_region}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="tem_district" defaultValue="" ref={selectTemDistrictEL} onChange={(e) => handleOnChange(e)}>
                        <option value="">Qu???n/Huy???n t???m tr?? </option>
                        {handleLoadTemDistrict()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.tem_district}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="tem_ward" ref={selectTemWardEL} defaultValue="" onChange={(e) => handleOnChange(e)}>
                        <option value="">Ph?????ng/X?? t???m tr?? </option>
                        {handleLoadTemWard()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.tem_ward}</span>

                </div>
                <div className="col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">S??? nh??:</label>

                    <input type="text" className="form-control" id="inputAddress2" name="tem_apartment_number" placeholder="?????a ch??? t???m tr?? " onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.tem_apartment_number}</span>

                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold">T??n tr?????ng h???c l???p 12</h6>
                </div>
                <div className="col-md-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tr?????ng l???p 12:</label>
                    <Fragment>
                        <Typeahead
                            onChange={(selected: any) => setState({ ...state, "school_name": selected })}
                            id="pagination-example"
                            onPaginate={(e) => console.log('Results paginated')}
                            options={options}
                            maxResults={6}
                            paginate={true}
                            paginationText="Nh???n T???i Th??m"
                            placeholder="T??n Tr?????ng"
                            inputProps={{
                                name: "school-name",
                            }}
                        />
                    </Fragment>
                    <span style={{ color: "red" }}>{errors.fields.school_name}</span>

                </div>

                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold fs-5">  <FontAwesomeIcon icon={fa2} className="mx-2" />TH??NG TIN ????NG K??</h6>
                </div>
                <div id="aspirations">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="aspirations" className="form-label">STT:</label>
                            <input type="number" min={1} className="form-control" id="sttAspiration" placeholder="STT" defaultValue={1} disabled />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="aspirations" className="form-label">Nguy???n v???ng:</label>
                            <select className="form-select" id="aspiration" defaultValue={""} name="aspiration" onChange={(e) => handleOnChange(e)}>
                                <option disabled value="">Nguy???n v???ng *</option>
                                {handleLoadAspirations()}
                            </select>
                            <span style={{ color: "red" }}>{errors.fields.aspiration}</span>

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="subject" className="form-label">T??? h???p m??n:</label>
                            <select className="form-select" defaultValue={""} name="subjects" ref={selectSubjects} onChange={(e) => handleOnChange(e)}>
                                <option disabled value="">T??? h???p m??n</option>
                                {handleLoadSubjects()}
                            </select>
                            <span style={{ color: "red" }}>{errors.fields.subjects}</span>

                        </div>
                    </div>
                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold"> <FontAwesomeIcon icon={fa3} className="mx-2" />TH??NG TIN KH???O S??T</h6>
                </div>
                <div className="col-md-12">
                    <label htmlFor="cccd" className="form-label">???nh Tr?????c CMND/CCCD:</label>
                    <input className="form-control" type="file" id="cccd" name="imgFrontCCCD" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">T???i file l??n ?????nh d???ng .jpg, dung l?????ng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields.imgFrontCCCD}</span>

                </div>
                <div className="col-md-12">
                    <label htmlFor="cccd" className="form-label">???nh Sau CMND/CCCD:</label>
                    <input className="form-control" type="file" id="cccd" name="imgBackCCCD" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">T???i file l??n ?????nh d???ng .jpg, dung l?????ng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields.imgBackCCCD}</span>

                </div>
                <div className="col-md-12">
                    <label htmlFor="graduate" className="form-label">Gi???y ch???ng nh???n t???t nghi???p t???m th???i:</label>
                    <input className="form-control" type="file" id="cccd" name="graduate" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">T???i file l??n ?????nh d???ng .jpg, dung l?????ng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields.graduate}</span>
                </div>
                <div className="col-md-12">
                    <label htmlFor="3x4" className="form-label">H??nh ???nh 3x4:</label>
                    <input className="form-control" type="file" id="3x4" name="3x4" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">T???i file l??n ?????nh d???ng .jpg, dung l?????ng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields["3x4"]}</span>
                </div>
                <div className="col-md-12">
                    <p>T??i xin cam ??oan nh???ng l???i khai trong ????n ????ng k?? x??t tuy???n n??y l?? ????ng s??? th???t. N???u sai t??i xin ch???u x??? l?? theo quy ch??? Tuy???n sinh c???a B??? GD & ??T.</p>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary" >????ng k??</button>
                </div>

            </form>
            <Footer></Footer>
        </>
    )
}