/* eslint-disable @next/next/no-img-element */
import Header from "../components/Header";

import { useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { fetchLogin } from "../redux/features/loginSlice";
import { RootState, useAppDispatch } from "../redux/app/store";
import Footer from "../components/Footer";


export default function Login() {
    const dispatch = useAppDispatch();
    const access_token = useSelector((state: RootState) => state.login.access_token)
    const data: any = useSelector((state: RootState) => state.login.data)

    const router = useRouter();

    const inputCCCD: any = useRef();
    const inputPass: any = useRef();

    const handleLogin = () => {
        let dataSend: any = {
            cccd: inputCCCD.current.value,
            password: inputPass.current.value
        }
        dispatch(fetchLogin(dataSend)).unwrap()
            .then(() => {
                if (router.query.referer === "capnhat") {
                    router.push('/capnhat')
                } else if (router.query.referer === "hoso") {
                    router.push('/hoso')
                } else {
                    router.push('/')
                }
            })
            .catch(() => {
                alert("Đăng Nhập Thất Bại")
            })
    }
    useEffect(() => {
        if (access_token != "") {
            localStorage.setItem("access_token", access_token);
        }
    }, [access_token])

    useEffect(() => {
        if (data != "") {
            if (router.query.referer === "capnhat") {
                router.push('/capnhat')
            } else if (router.query.referer === "hoso") {
                router.push('/hoso')
            } else {
                router.push('/')
            }
        }
    }, [data, router])




    return (
        <div className="position-relative">
            <Header></Header>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"
                                alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <h5 style={{ color: "#0d6efd" }}>Đăng Nhập</h5>
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">CCCD/CMND:</label>
                                    <input type="text" id="form3Example3" className="form-control form-control"
                                        ref={inputCCCD} />
                                </div>


                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Mật Khẩu:</label>
                                    <input type="password" id="form3Example4" className="form-control form-control"
                                        ref={inputPass} />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <a href="#!" className="text-body">Forgot password?</a>
                                    <button type="button" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: " 2.5rem", paddingRight: "2.5rem" }} onClick={() => handleLogin()}>Đăng nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
         <Footer></Footer>
        </div>
    )
}