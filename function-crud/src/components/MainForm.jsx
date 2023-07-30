import { Fragment, useEffect, useState } from "react"
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import MainTable from "./MainTable"

const MainForm = () => {
    let [reference, setreference] = useState(null)
    let [count, setcount] = useState(JSON.parse(localStorage.getItem('count')) || 0)
    let [obj, setobj] = useState({
        language: []
    })
    let [editobj, seteditobj] = useState({})
    let [array, setarray] = useState(JSON.parse(localStorage.getItem('array')) || [])

    const mainData = async (e) => {
        if (e.target.name === 'language') {
            if (e.target.checked) {
                // obj[e.target.name] = [...obj.language, e.target.value]
                obj.language.push(e.target.value)
            }
            else {
                // obj.language.splice(obj.language.findIndex((x) => x === e.target.value), 1)
                obj.language = obj.language?.filter((x, i) => x !== e.target.value)
            }
        }
        else if (e.target.name === 'profile') {
            reference = e.target.value
            setreference(reference)
            obj[e.target.name] = await toBase64(e.target.files[0])
        }
        else {
            obj[e.target.name] = e.target.value
        }
        setobj({ ...obj })
    }
    const submitFunction = (e) => {
        e.preventDefault()
        if (obj.id === undefined) {
            count++
            obj['id'] = count
            setobj({ ...obj })
            setcount(count)
            array.push(obj)
        }
        else {
            array.splice(array.findIndex((x) => x.id === obj.id), 1, obj)
            setarray([...array])
        }
        setarray([...array])
        setreference(null)
        localStorage.setItem('array', JSON.stringify(array))
        localStorage.setItem('count', count)
        obj = {
            username: '',
            email: '',
            phoneno: '',
            pincode: '',
            gender: '',
            language: []
        }
        setobj({ ...obj })
        reference = ''
        setreference(reference)
    }

    function editfun(id) {
        editobj = array.find(x => x.id === id)
        setobj({ ...editobj })
    }
    function deletefun(id) {
        array.splice(array.findIndex((x) => x.id === id), 1)
        setarray([...array])
        localStorage.setItem('array', JSON.stringify(array))
    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject
    })
    return (
        <Fragment>
            <Row>
                <Col xs={6} className="offset-3">
                    <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">
                        <h1 className="text-center py-3">Employee Form</h1>
                        <Form onSubmit={(e) => { submitFunction(e) }}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="username" className="fw-600 fs-5">
                                            User Name
                                        </Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            value={obj.username}
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email" className="fw-600 fs-5">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder=""
                                            type="email"
                                            value={obj.email}
                                            className="main"
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="pincode" className="fw-600 fs-5">
                                            Pincode
                                        </Label>
                                        <Input
                                            id="pincode"
                                            name="pincode"
                                            placeholder=""
                                            type="number"
                                            value={obj.pincode}
                                            className="main"
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phoneno" className="fw-600 fs-5">
                                            Number
                                        </Label>
                                        <Input
                                            id="phoneno"
                                            name="phoneno"
                                            placeholder=""
                                            value={obj.phoneno}
                                            type="number"
                                            className="main"
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="">
                                    <Label
                                        check
                                        for="example"
                                        className="fw-600 fs-5
                                my-2"
                                    >
                                        Language
                                    </Label>
                                    <div className="d-flex justify-content-start">
                                        <div>
                                            <Input
                                                id="exampleCheck"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value="html"
                                                onChange={mainData}
                                                checked={obj.language.includes('html')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck"
                                                className="px-2"
                                            >
                                                HTML
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck1"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value="css"
                                                onChange={mainData}
                                                checked={obj.language.includes('css')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck1"
                                                className="px-2"
                                            >
                                                CSS
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck2"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value="javascript"
                                                onChange={mainData}
                                                checked={obj.language.includes('javascript')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck2"
                                                className="px-2"
                                            >
                                                JAVASCRIPT
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value='react'
                                                onChange={mainData}
                                                checked={obj.language.includes('react')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck3"
                                                className="px-2"
                                            >
                                                REACT
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Label for="example" className="fw-600 fs-5">
                                        Gender
                                    </Label>
                                    <div className="d-flex">
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                value='male'
                                                onChange={mainData}
                                                checked={obj.gender === 'male'}
                                            />
                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Male
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                value='female'
                                                onChange={mainData}
                                                checked={obj.gender === 'female'}
                                            />
                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Female
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="imgheight">
                                    <Label
                                        check
                                        for=""
                                        className="py-2 fs-5"
                                    >
                                        Profile
                                    </Label>
                                    <div>
                                        <input type="file" value={reference} id="profile" name="profile" onChange={mainData} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="my-2">
                                        {(obj.profile) && < img src={obj.profile} alt="img" className="object-fit-cover" width={200} height={200} />}
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <button className="my-2 btn btn-secondary submit fs-4">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>
            <Container>
                <MainTable mainArray={array} editfun={editfun} deletefun={deletefun} />
            </Container>
        </Fragment >
    )
}
export default MainForm