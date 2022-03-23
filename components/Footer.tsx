
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
export default function Footer() {
    return (
        <>
            <footer className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-3 px-3 px-xl-3 " style={{ backgroundColor: "#B0C4DE",marginTop:"5rem" }}>
                <div className="text-dark mb-3 mb-md-0">
                    Đại Học Thủy Lợi
                </div>
                <a href="https://www.facebook.com/phanhieuthuyloi" target="_blank" className="me-4" rel="noreferrer">
                    <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
                </a>
            </footer>
        </>
    )
}