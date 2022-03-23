export default function TTT(){
    function handle(e: any) {
        console.log(e.currentTarget);
    }
    return (
        <div className="row">
            <div className="col-md-2">
                <label htmlFor="aspirations" className="form-label">STT:</label>
                <input type="number" className="form-control" id="sttAspiration" placeholder="STT" />
            </div>

            <div className="col-md-4">
                <label htmlFor="aspirations" className="form-label">Nguyện vọng:</label>
                <select className="form-select" id="aspiration" defaultValue="" name="aspiration[]">
                    <option disabled value="">Nguyện vọng *</option>
                    <option value="7480">7480 - Công nghệ thông tin</option>
                    <option value="7481">7481 - Công nghệ sinh học</option>
                    <option value="7482">7482 - Kế toán</option>
                    <option value="7483">7483 - Công trình</option>
                </select>
            </div>

            <div className="col-md-4">
                <label htmlFor="subject" className="form-label">Tổ hợp môn:</label>
                <select className="form-select" name="subjects[]">
                    <option selected disabled value="">Tổ hợp môn</option>
                </select>
            </div>
            <div className="col-md-2 position-relative">
                <button type="button" id="btn-close" className="btn-close position-absolute top-50" aria-label="Close" onClick={(e) => handle(e)}></button>
            </div>
        </div>
    )
}