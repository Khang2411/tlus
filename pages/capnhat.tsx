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
import context from "react-bootstrap/esm/AccordionContext";



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
    // Tạo input Datalist = Typeahead
    useEffect(() => {
        // ĐK để không call api nhiều lần
        if (highSchool.length === 0) {
            dispatch(fetchHighSchool());
        }
    }, [dispatch, highSchool.length]);

    useEffect(() => {

        setStateSchoolName(highSchool)

    }, [highSchool])

    const [stateSchoolName, setStateSchoolName] = useState([]);
    const options = stateSchoolName.map((o: any) => `${o.Ten + " " + o.DiaChi + " " + o.MaTinh}`);

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
        document.title = "TLUS - Cập Nhật Hồ Sơ"
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
            router.push("/login?referer=capnhat" ,"/login")
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
            if (cv === 0) { // chưa có dữ liệu thì qua hoso de tao
                router.push("/hoso" );
            } else { // ngược lại thỉ cập nhật
                dispatch(fetchUpdateCv(state)).unwrap().then(() => {
                    alert("Cập Nhật Thành Công")
                }).catch(() => {
                    alert("Cập Nhật Thất Bại")
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
        // Duyệt
        console.log(state.school_name);
        if (state.school_name.length === 0) {
            fields["school_name"] = "Không hợp lệ";
            isValid = false;
        }
        Object.keys(state).map(function (key, index) {
            if ((state as any)[key] === "") {
                fields[key] = "Không được trống";
                isValid = false;
            }
            if (isMobilePhone(state.phone, ['vi-VN']) === false) {
                fields["phone"] = "Số điện thoại không hợp lệ";
                isValid = false;
            }
            if (isNumeric(state.cccd) === false) {
                fields["cccd"] = "CCCD phải là chuỗi số";
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
                    <h4 className="fw-bold fs-3" style={{ textAlign: "center" }}>Cập Nhật</h4>
                    <h4 className="fw-bold fs-3">XÉT HỌC BẠ LỚP 12 THEO TỔ HỢP 3 MÔN ĐỢT 1 NĂM 2022</h4>
                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold fs-5">  <FontAwesomeIcon icon={fa1} className=" mx-2" />THÔNG TIN THÍ SINH</h6>
                </div>
                <div className="col-md-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Họ lót:</label>
                    <input type="text" className="form-control" name="surname" placeholder="Họ lót *" value={state.surname || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.surname}</span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tên:</label>

                    <input type="text" className="form-control" name="name" placeholder="Tên *" value={state.name || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.name}</span>
                </div>
                <div className="col-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ngày sinh:</label>

                    <input type="date" className="form-control" name="birthday" id="inputAddress" value={state.birthday || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.birthday}</span>
                </div>
                <div className="col-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">CMND/CCCD:</label>

                    <input type="text" className="form-control" name="cccd" id="inputAddress2" placeholder="CCCD, CMND *" value={state.cccd || ""} readOnly onChange={(e) => handleOnChange(e)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Giới tính:</label>

                    <select className="form-select" name="gender" defaultValue={""} value={state.gender} onChange={(e) => handleOnChange(e)}>
                        <option disabled value="">Chọn giới tính</option>
                        <option value="1">Nam</option>
                        <option value="2">Nữ</option>
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.gender}</span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="phone" className="form-label">SĐT:</label>

                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="SĐT *" value={state.phone || ""} onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.phone}</span>

                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold">Địa chỉ thường trú</h6>
                </div>
                <div className="col-md-4">
                    <select className="form-select" defaultValue={""} name="region" onChange={(e) => handleOnChange(e)}>
                        <option disabled value="">Tỉnh/Thành thường trú *</option>
                        {handleLoadRegion()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.region}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="district" defaultValue={""} ref={selectDistrictEL} onChange={(e) => handleOnChange(e)}>
                        <option value="">Quận/Huyện thường trú *</option>
                        {handleLoadDistrict()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.district}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="ward" ref={selectWardEL} defaultValue={""} onChange={(e) => handleOnChange(e)}>
                        <option value="">Phường/Xã thường trú *</option>
                        {handleLoadWard()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.ward}</span>

                </div>
                <div className="col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Số nhà:</label>

                    <input type="text" className="form-control" id="inputAddress2" name="apartment_number" placeholder="Địa chỉ thường trú *" onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.apartment_number}</span>

                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold">Địa chỉ tạm trú (Nếu có)</h6>
                </div>
                <div className="col-md-4">
                    <select className="form-select" defaultValue="" name="tem_region" onChange={(e) => handleOnChange(e)}>
                        <option value="">Tỉnh/Thành tạm trú </option>
                        {handleLoadRegion()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.tem_region}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="tem_district" defaultValue="" ref={selectTemDistrictEL} onChange={(e) => handleOnChange(e)}>
                        <option value="">Quận/Huyện tạm trú </option>
                        {handleLoadTemDistrict()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.tem_district}</span>

                </div>
                <div className="col-md-4">
                    <select className="form-select" name="tem_ward" ref={selectTemWardEL} defaultValue="" onChange={(e) => handleOnChange(e)}>
                        <option value="">Phường/Xã tạm trú </option>
                        {handleLoadTemWard()}
                    </select>
                    <span style={{ color: "red" }}>{errors.fields.tem_ward}</span>

                </div>
                <div className="col-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Số nhà:</label>

                    <input type="text" className="form-control" id="inputAddress2" name="tem_apartment_number" placeholder="Địa chỉ tạm trú " onChange={(e) => handleOnChange(e)} />
                    <span style={{ color: "red" }}>{errors.fields.tem_apartment_number}</span>

                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold">Tên trường học lớp 12</h6>
                </div>
                <div className="col-md-12">
                    <label htmlFor="exampleInputEmail1" className="form-label">Trường lớp 12:</label>
                    <Fragment>
                        <Typeahead
                            onChange={(selected: any) => setState({ ...state, "school_name": selected })}
                            id="pagination-example"
                            onPaginate={(e) => console.log('Results paginated')}
                            options={options}
                            maxResults={6}
                            paginate={true}
                            paginationText="Nhấn Tải Thêm"
                            placeholder="Tên Trường"
                            inputProps={{
                                name: "school-name",
                            }}
                        />
                    </Fragment>
                    <span style={{ color: "red" }}>{errors.fields.school_name}</span>

                </div>

                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold fs-5">  <FontAwesomeIcon icon={fa2} className="mx-2" />THÔNG TIN ĐĂNG KÝ</h6>
                </div>
                <div id="aspirations">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="aspirations" className="form-label">STT:</label>
                            <input type="number" min={1} className="form-control" id="sttAspiration" placeholder="STT" defaultValue={1} disabled />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="aspirations" className="form-label">Nguyện vọng:</label>
                            <select className="form-select" id="aspiration" defaultValue={""} name="aspiration" onChange={(e) => handleOnChange(e)}>
                                <option disabled value="">Nguyện vọng *</option>
                                {handleLoadAspirations()}
                            </select>
                            <span style={{ color: "red" }}>{errors.fields.aspiration}</span>

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="subject" className="form-label">Tổ hợp môn:</label>
                            <select className="form-select" defaultValue={""} name="subjects" ref={selectSubjects} onChange={(e) => handleOnChange(e)}>
                                <option disabled value="">Tổ hợp môn</option>
                                {handleLoadSubjects()}
                            </select>
                            <span style={{ color: "red" }}>{errors.fields.subjects}</span>

                        </div>
                    </div>
                </div>
                <div className={clsx("col-md-12", styles.form_title__header)}>
                    <h6 className="fw-bold"> <FontAwesomeIcon icon={fa3} className="mx-2" />THÔNG TIN KHẢO SÁT</h6>
                </div>
                <div className="col-md-12">
                    <label htmlFor="cccd" className="form-label">Ảnh Trước CMND/CCCD:</label>
                    <input className="form-control" type="file" id="cccd" name="imgFrontCCCD" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">Tải file lên định dạng .jpg, dung lượng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields.imgFrontCCCD}</span>

                </div>
                <div className="col-md-12">
                    <label htmlFor="cccd" className="form-label">Ảnh Sau CMND/CCCD:</label>
                    <input className="form-control" type="file" id="cccd" name="imgBackCCCD" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">Tải file lên định dạng .jpg, dung lượng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields.imgBackCCCD}</span>

                </div>
                <div className="col-md-12">
                    <label htmlFor="graduate" className="form-label">Giấy chứng nhận tốt nghiệp tạm thời:</label>
                    <input className="form-control" type="file" id="cccd" name="graduate" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">Tải file lên định dạng .jpg, dung lượng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields.graduate}</span>
                </div>
                <div className="col-md-12">
                    <label htmlFor="3x4" className="form-label">Hình ảnh 3x4:</label>
                    <input className="form-control" type="file" id="3x4" name="3x4" accept="image/* " onChange={(e) => handleImgChange(e)} />
                    <div id="emailHelp" className="form-text">Tải file lên định dạng .jpg, dung lượng {'<'} 2MB</div>
                    <span style={{ color: "red" }}>{errors.fields["3x4"]}</span>
                </div>
                <div className="col-md-12">
                    <p>Tôi xin cam đoan những lời khai trong đơn đăng ký xét tuyển này là đúng sự thật. Nếu sai tôi xin chịu xử lý theo quy chế Tuyển sinh của Bộ GD & ĐT.</p>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary" >Đăng ký</button>
                </div>

            </form>
            <Footer></Footer>
        </>
    )
}