import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RootState } from '../redux/app/store';
import { createCV, paymentVnp } from '../redux/features/ipnVnpSlice';

import Link from 'next/link';

export default function VnpayReturn(this: any, props: any) {
    const router = useRouter();
    const dispatch = useDispatch()
    const rspCode = useSelector((state: RootState) => state.vnp)
    useEffect(() => {
        console.log(router);

    }, [router])

    useEffect(() => {
        if (router.isReady) {
            dispatch(paymentVnp(router.query));
        }

    }, [dispatch, router.isReady, router.query]);

    useEffect(() => {
        if (router.isReady) {
            if ((Object.keys(router.query).length === 0)) {
                router.push("/404")
            }
        }
    }, [router, rspCode.code])
    useEffect(() => {
        if (rspCode.code === "00") {
            let dataLocal: any = JSON.parse(localStorage.getItem("infor") as any);
            if (router.isReady) {
                dataLocal["vnp_TxnRef"] = router.query.vnp_TxnRef;
            }
            dispatch(createCV(dataLocal));
        }
    }, [dispatch, router.isReady, router.query.vnp_TxnRef, rspCode.code])

    const success = () => {
        return (
            <>
                <div>
                    <div className="card" style={{ height: "65vh", justifyContent: "center" }}>
                        <div style={{ borderRadius: "200px", height: "200px", "width": "200px", background: "#F8FAF5", margin: "0 auto", position: "relative" }}>
                            <i className="checkmark" style={{ position: "absolute", right: "55px", bottom: "5px", fontSize: "150px", color: "green" }}>✓</i>
                        </div>
                        <h1 style={{ textAlign: "center" }}>Thanh Toán Thành Công</h1>
                        <p style={{ textAlign: "center" }}>Nhà trường sẽ thông báo kêt quả cho bạn trước ngày 9/9/2022 !</p>
                        <Link href="/tracuu"><a style={{ textAlign: "center" }}><p style={{ color: "#0000FF" }}>Tra cứu tại đây</p></a></Link>


                    </div>
                </div>
            </>)
    }
    const error = () => {
        return (
            <>
                <div>
                    <div className="card" style={{ height: "65vh", justifyContent: "center" }}>
                        <div style={{ borderRadius: "200px", height: "200px", "width": "200px", background: "#F8FAF5", margin: "0 auto", position: "relative" }}>
                            <i className="checkmark" style={{ position: "absolute", right: "60px", bottom: "5px", fontSize: "155px", color: "red" }}>X</i>
                        </div>
                        <h1 style={{ textAlign: "center" }}>Thanh Toán Thất Bại</h1>
                        <p style={{ textAlign: "center" }}>Vui lòng kiểm tra lại</p>
                    </div></div>
            </>)

    }
    return (
        <>
            <Header></Header>
            {rspCode.code === "00" ? success() : ""}
            {rspCode.code === "97" ? error() : ""}
            {rspCode.code === "99" ? error() : ""}
            {rspCode.code === "11" ? error() : ""}
            <Footer></Footer>

        </>
    )
}