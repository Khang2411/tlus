/* eslint-disable @next/next/no-img-element */
import styles from '../styles/header.module.scss'
import clsx from 'clsx';
import Link from 'next/link';

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeLg } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../redux/app/store';
import { fetchJWT, fetchLogout } from '../redux/features/loginSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'

export default function Header() {
    const dispatch = useAppDispatch();
    const data: any = useSelector((state: RootState) => state.login.data)

    const router = useRouter();

    useEffect(() => {
        let access_token: any = localStorage.getItem("access_token");
        // Đk để không call api nhiều lần
        if (data === "") {
            dispatch(fetchJWT(access_token)).unwrap().then((response) => {
                console.log(response)
            });
            return
        }
    }, [data, dispatch])

    const handleLogout = () => {
        let access_token: any = localStorage.getItem("access_token");
        dispatch(fetchLogout(access_token)).unwrap().then(() => {
            router.push("/login")
        })
    }


    return (
        <section className={styles.section_header}>
            <Navbar expand="lg" className={styles.section_header__nav}>
                <Container>
                    <Navbar.Brand href="/"><FontAwesomeIcon className="mx-2" icon={faHomeLg} size="lg" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Giới thiệu</Nav.Link>
                            <Nav.Link href="#link">Tin tức</Nav.Link>

                            <NavDropdown title="Tuyển sinh" id="basic-nav-dropdown">
                                <NavDropdown.Item><Link href="/hoso">Nộp hồ sơ nhập học</Link></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Đăng ký tuyển sinh</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Tuyển thạc sĩ</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Sinh viên" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Hỗ trợ sinh viên</NavDropdown.Item>
                                <NavDropdown.Item><Link href="/dieukhien">Đăng ký học</Link></NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
               
                    {data != "" ? <NavDropdown title={data.name} id="basic-nav-dropdown">
                        <NavDropdown.Item><Link href="/dieukhien">Đăng ký học</Link></NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleLogout()}>Thoát</NavDropdown.Item>
                    </NavDropdown> : <Link href='/login'><a className='btn btn-light text-primary'>Đăng nhập</a></Link>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className={clsx(styles.section_header__container)}>
                <img src='/img/logo.png' alt='logo'></img>
            </div>
        </section>
    )
}