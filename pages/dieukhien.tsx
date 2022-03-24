import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { RootState } from "../redux/app/store";

export default function Control() {
    const router = useRouter();
    const data: any = useSelector((state: RootState) => state.login.data)

    useEffect(() => {
        if (data === "") {
            router.push("/login")
        }
    }, [data, router])

    return (
        <>
            <Header></Header>
            <section className="section_control container mt-3">
                <div>
                    <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header ><p style={{ fontSize: "20px" }}>Đăng ký học</p></Accordion.Header>
                            <Accordion.Body>
                                <li style={{ fontSize: "20px" }}>Sinh viên đăng ký</li><br></br>
                                <li style={{ fontSize: "20px" }}>Sinh viên tra cứu lịch học</li><br></br>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><p style={{ fontSize: "20px" }}>Nộp hồ sơ</p></Accordion.Header>
                            <Accordion.Body>
                                <li style={{ fontSize: "20px" }}><Link href="/hoso">Sinh viên nôp hồ sơ</Link></li><br></br>
                                <li style={{ fontSize: "20px" }}><Link href="/tracuu">Sinh viên tra cứu hồ sơ</Link></li><br></br>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header><p style={{ fontSize: "20px" }}>Chương trình đào tạo</p></Accordion.Header>
                            <Accordion.Body>
                                <li style={{ fontSize: "20px" }}>Danh sách đào tạo</li><br></br>
                                <li style={{ fontSize: "20px" }}>Sinh viên tra cứu lịch học</li><br></br>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header><p style={{ fontSize: "20px" }}>Cảnh báo</p></Accordion.Header>
                            <Accordion.Body>
                                <li style={{ fontSize: "20px" }}>Sinh viên đăng ký</li><br></br>
                                <li style={{ fontSize: "20px" }}>Sinh viên tra cứu lịch học</li><br></br>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="">
                            <Accordion.Header><p style={{ fontSize: "20px" }}>Đóng tiền học</p></Accordion.Header>
                            <Accordion.Body>
                                <li style={{ fontSize: "20px" }}>Sinh viên đóng tiền học</li><br></br>
                                <li style={{ fontSize: "20px" }}>Sinh viên xem nợ tiền học</li><br></br>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

                <div>
                    <div className="card mt-4 text-white bg-secondary mb-3">
                        <div className="card-header">
                            <h5>Thông Báo</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Viện Đào tạo và Khoa học Ứng dụng Miền trung thông báo tuyển dụng</li>
                            <li className="list-group-item">Đại diện Phân hiệu Trường Đại học Thủy Lợi tham dự Lễ khánh thành Dự án thủy lợi Cái lớn – Cái bé</li>
                            <li className="list-group-item">Lễ hội Xuân hồng – Hiến máu tình nguyện lần thứ XV năm 2022</li>
                            <li className="list-group-item">Đại diện Phân hiệu tới thăm hỏi và trao 52 triệu đồng ủng hộ sinh viên Trần Thị Minh Hiếu lớp S21-60KT</li>
                            <li className="list-group-item">Thông báo tổ chức thi chuẩn Tiếng Anh đầu ra cho trình độ đại học hệ chính quy đợt 1 năm 2022 tại Phân hiệu</li>
                            <li className="list-group-item">Công ty MiTek thông báo tuyển dụng</li>
                            <li className="list-group-item">Thông báo tuyển sinh sau dịch</li>
                        </ul>
                    </div>
                </div>

            </section>
            <Footer></Footer>
        </>
    )
}