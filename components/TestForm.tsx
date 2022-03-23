import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/app/store";
import { fetchShowRegion } from "../redux/features/regionSlice";
import validator from 'validator';

export default function TestFrom() {
    const count = useSelector((state: RootState) => state.region)
    let dispatch = useDispatch();
    const rspCode = useSelector((state: RootState) => state.vnp)
    useEffect(() => {
        console.log(rspCode);
    }, [rspCode]);


    useEffect(() => {
        dispatch(fetchShowRegion());
    }, [dispatch]);

    useEffect(() => {
        console.log(count);
    }, [count]);

    const [state, setState] = useState({ "thumbnail": "" });
    const [input, setInput] = useState({ name: "" });
    const [errors, setErrors] = useState({ fields: { name: "" }, isValid: true });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target: any = event.target;
        const name: string = target.name;
        const value: any = target.value;
        setInput({ ...input, [name]: value });
        handleValidate();
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target: any = event.target;
        const files: any = target.files[0];
        setState({ ...state, "thumbnail": files });

    }
    const handleValidate = () => {
        let fields: any = { name: "" };
        if (!input.name || input.name === null || input.name === "") {
            setErrors({ ...errors, isValid: false });
            fields['name'] = "Không được trống";
        }
        setErrors({ ...errors, fields: fields })
        return;
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleValidate();
        const formData = new FormData();
        formData.append("thumbnail", state.thumbnail);
        //////
        var file: any = state.thumbnail;
        var reader = new FileReader();
        reader.onload = async function () {
            // The file's text will be printed here
            console.log(reader.result)
            try {
                const response: any = await axios({
                    method: "post",
                    url: "http://localhost:8080/admintlus/api/admissions/register",
                    data: { "thumbnail": reader.result },
                    headers: { 'Content-Type': 'application/json'},
                });
            } catch (error) {
                console.log(error)
            }
        };
        reader.readAsDataURL(file);


    }

    useEffect(() => {
        console.log(validator.isEmail('foo@bar.com')); //=> true
        console.log(validator.isMobilePhone("0702511205", ['vi-VN']));
    }, [])

    return (
        <>
            <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-6">
                    <label htmlFor="formFileMultiple" className="form-label">Thumbnail</label>
                    <input className="form-control" type="file" id="file" name="thumbnail" accept="image/*" onChange={(e) => handleChange(e)} />
                </div>


                <div className="mb-12">
                    <label htmlFor="formFileMultiple" className="form-label">Tên</label>
                    <input className="form-control" type="text" name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
                </div>
                <span style={{ color: "red" }}>{errors.fields.name}</span>

                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Gửi</button>
                </div>
            </form>
        </>
    )
}



