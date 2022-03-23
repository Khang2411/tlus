/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import styles from "../styles/homePage.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import clsx from "clsx";
import { Nav } from "react-bootstrap";
import Footer from "./Footer";
import Link from "next/link";
import TestFrom from "./TestForm";

export default function HomePage() {
    return (
        <>
            <div className={clsx(styles.section_main)}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >

                    <SwiperSlide><img src="/img/slide3.jpg"></img></SwiperSlide>
                    <SwiperSlide><img src="/img/slide2.jpg"></img></SwiperSlide>
                </Swiper>

                <Nav className={clsx(styles.container_icon)}
                    activeKey="/home"
                    style={{ backgroundColor: "#fff" }}
                >
                    <Nav.Item className={clsx(styles.container_icon__item)} style={{ textAlign: "center" }}>
                        <Nav.Link href="/home"><img src="https://tlus.edu.vn/wp-content/uploads/2021/09/cam-ket-dam-bao-chat-luong-2.png" width={120} height={120}></img></Nav.Link>
                        <b>Cam Kết</b>
                    </Nav.Item>
                    <Nav.Item className={clsx(styles.container_icon__item)} style={{ textAlign: "center" }}>
                        <Nav.Link eventKey="link-1"><img src="https://tlus.edu.vn/wp-content/uploads/2021/09/sinh-vien-dang-ky-hoc.png" width={120} height={120}></img></Nav.Link>
                        <b>Đăng Ký Học</b>
                    </Nav.Item >
                    <Nav.Item className={clsx(styles.container_icon__item)} style={{ textAlign: "center" }}>
                        <Nav.Link>  <Link href="/hoso"><img src="https://tlus.edu.vn/wp-content/uploads/2021/09/Thu-vien-so.png" width={120} height={120}></img></Link></Nav.Link>
                        <b>Nộp Hồ Sơ Nhập Học</b>
                    </Nav.Item>
                    <Nav.Item className={clsx(styles.container_icon__item)} style={{ textAlign: "center"}}>
                        <Nav.Link eventKey="link-2"><img src="https://tlus.edu.vn/wp-content/uploads/2021/09/Lich-cong-tac-2.png" width={120} height={120}></img></Nav.Link>
                        <b>Lịch Công Tác</b>
                    </Nav.Item>
                </Nav>

                <div className={styles.section_main__content}>
                    <div className={styles.section_main__container_news}>
                        <h5 className={styles.container_news__title}>Tin Tức</h5>
                        <div className={styles.container_news__wrapper}>
                            <div className={styles.container_news__card} style={{ width: "18rem" }}>
                                <img src="https://tlus.edu.vn/wp-content/uploads/2022/03/Toan-canh-cong-cai-lon-va-khu-vuc-le-khanh-thanh-310x165.jpg" className="card-img-top" alt="news1"></img>
                                <div className="card-body">
                                    <p className="card-text"><b>Đại diện Phân hiệu Trường Đại học Thủy Lợi tham dự Lễ khánh thành Dự án thủy lợi Cái lớn – Cái bé</b></p>
                                </div>
                            </div>

                            <div className={styles.container_news__card} style={{ width: "18rem" }}>
                                <img src="https://tlus.edu.vn/wp-content/uploads/2021/09/success-quotes-924171000-x-563-1588301474099-310x165.jpg" className="card-img-top" alt="news1"></img>
                                <div className="card-body">
                                    <p className="card-text"><b>Điểm chuẩn trình độ đại học hệ chính quy theo phương thức xét điểm thi THPT năm 2021</b></p>
                                </div>
                            </div>

                            <div className={styles.container_news__card} style={{ width: "18rem" }}>
                                <img src="https://tlus.edu.vn/wp-content/uploads/2019/09/Tan-Sinh-Vien-K61-TLS-Nhap-hoc-15-310x165.jpg" className="card-img-top" alt="news1"></img>
                                <div className="card-body">
                                    <p className="card-text"><b>Đại diện Phân hiệu Trường Đại học Thủy Lợi tham dự Lễ khánh thành Dự án thủy lợi Cái lớn – Cái bé</b></p>
                                </div>
                            </div>

                            <div className={styles.container_news__card} style={{ width: "18rem" }}>
                                <img src="https://tlus.edu.vn/wp-content/uploads/2020/08/KQ-X%C3%A9t-tuyen-hoc-ba-THPT-TLS-1-310x165.jpg" className="card-img-top" alt="news1"></img>
                                <div className="card-body">
                                    <p className="card-text"><b>Điểm chuẩn trình độ đại học hệ chính quy theo phương thức xét điểm thi THPT năm 2021</b></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.section_main__container_notification}>
                        <h5 className={styles.container_notification__title}>Thông Báo</h5>
                        <div className="card">
                            <div className="card-header">
                                Mới Nhất
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
                </div>

            </div>
            <Footer></Footer>
        </>
    );
}
