import moment from "moment"
import { FormEvent, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import callAPI from "./api/callAPI";

import { useRouter } from 'next/router'
export default function Payment() {

    const router = useRouter();
    useEffect(() => {
        console.log(moment(Date()).format("YYYYMMDDHHmmss"));
        console.log(moment(Date()).add(15, 'minutes').format('YYYYMMDDHHmmss'));
    }, [])
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     let dataSend = {
    //         name: "Khang"
    //     }
    //     callAPI("POST", "http://localhost:8080/admintlus/api/vnpay_payment", dataSend, null).then(function (response) {
    //         console.log(response.data);
    //         // router.push("http://localhost:8080/admintlus/vnpay_php/vnpay_create_payment.php");
    //     });;
    // }
    return (
        <>
            <Header></Header>
            <form className="mx-auto"action="http://localhost:8080/admintlus/vnpay_php/vnpay_create_payment.php" id="create_form" method="post" style={{ width: "55%" }}>
                <h4 style={{ color: "green" }}>Thanh Toán Hồ Sơ</h4>
                <div className="form-group">
                    <label htmlFor="language">Loại hàng hóa </label>
                    <select name="order_type" id="order_type" className="form-control">
                        <option value="topup">Nạp tiền điện thoại</option>
                        <option value="billpayment">Thanh toán hóa đơn</option>
                        <option value="fashion">Thời trang</option>
                        <option value="other">Khác - Xem thêm tại VNPAY</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="order_id">Mã hóa đơn</label>
                    <input className="form-control" id="order_id" name="order_id" type="text" value={moment(Date()).format("YYYYMMDDHHmmss")} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Số tiền</label>

                    <input className="form-control" id="amount"
                        name="amount" type="number" value="10000"  readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="order_desc">Nội dung thanh toán</label>
                    <textarea className="form-control" id="order_desc" name="order_desc" placeholder="Không dấu ...">Noi dung thanh toan</textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="bank_code">Ngân hàng</label>
                    <select name="bank_code" id="bank_code" className="form-control">
                        <option value="">Không chọn</option>
                        <option value="NCB"> Ngan hang NCB</option>
                        <option value="AGRIBANK"> Ngan hang Agribank</option>
                        <option value="SCB"> Ngan hang SCB</option>
                        <option value="SACOMBANK">Ngan hang SacomBank</option>
                        <option value="EXIMBANK"> Ngan hang EximBank</option>
                        <option value="MSBANK"> Ngan hang MSBANK</option>
                        <option value="NAMABANK"> Ngan hang NamABank</option>
                        <option value="VNMART"> Vi dien tu VnMart</option>
                        <option value="VIETINBANK">Ngan hang Vietinbank</option>
                        <option value="VIETCOMBANK"> Ngan hang VCB</option>
                        <option value="HDBANK">Ngan hang HDBank</option>
                        <option value="DONGABANK"> Ngan hang Dong A</option>
                        <option value="TPBANK"> Ngân hàng TPBank</option>
                        <option value="OJB"> Ngân hàng OceanBank</option>
                        <option value="BIDV"> Ngân hàng BIDV</option>
                        <option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
                        <option value="VPBANK"> Ngan hang VPBank</option>
                        <option value="MBBANK"> Ngan hang MBBank</option>
                        <option value="ACB"> Ngan hang ACB</option>
                        <option value="OCB"> Ngan hang OCB</option>
                        <option value="IVB"> Ngan hang IVB</option>
                        <option value="VISA"> Thanh toan qua VISA/MASTER</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="language">Ngôn ngữ</label>
                    <select name="language" id="language" className="form-control">
                        <option value="vn">Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Thời hạn thanh toán</label>
                    <input className="form-control" id="txtexpire"
                        name="txtexpire" type="text" value={moment(Date()).add(15, 'minutes').format('YYYYMMDDHHmmss')} readOnly/>
                </div>

                {/* <button type="submit" className="btn btn-primary" id="btnPopup">Thanh toán Post</button> */}

                <button type="submit" name="redirect" id="redirect" className="btn btn-primary mt-2">Thanh toán</button>

            </form>
            <Footer></Footer>
        </>

    )


}
