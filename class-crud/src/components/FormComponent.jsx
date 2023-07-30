import React, { Component, Fragment, useContext } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import TableComponent from './TableComponent'

class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            obj: {},
            array: JSON.parse(localStorage.getItem('array')) || [],
            count: JSON.parse(localStorage.getItem('count')) || 0,
            editobj: {},
            FileRef: {}
        }
    }
    inputChange = async (e) => {
        if (e.target.name === "hobby") {
            if (e.target.checked === true) {
                this.state.obj.hobby = [
                    ...this.state.obj.hobby ? [...this.state.obj.hobby] : [], e.target.value
                ]
            }
            else {
                this.state.obj.hobby = this.state.obj.hobby.filter((x) => {
                    return x !== e.target.value
                })
            }
        }
        else if (e.target.name === "profile") {
            this.state.profile = await this.toBase64(e.target.files[0])
            this.state.obj = {
                ...this.state.obj, [e.target.name]: this.state.profile
            }
        }
        else {
            this.state.obj = {
                ...this.state.obj,
                [e.target.name]: e.target.value
            }
        }
        this.setState({
            obj: this.state.obj
        })
    }
    toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
    submiFunction = (e) => {
        e.preventDefault()
        if (this.state.obj.id === undefined) {
            this.state.count++
            this.state.obj.id = this.state.count
            this.state.array?.push(this.state.obj)
        }
        else {
            this.state.array.splice(this.state.array.findIndex((x) => x.id === this.state.obj.id), 1, this.state.obj)
        }
        this.setState({
            array: this.state.array,
            obj: {}
        })
        localStorage.setItem('array', JSON.stringify(this.state.array))
        localStorage.setItem('count', JSON.stringify(this.state.count))
        this.state.FileRef.current.value = ""
    }
    editFun = (id) => {
        this.state.obj = this.state.array.find((x) => x.id === id)
        this.setState({ obj: this.state.obj })
    }
    deleteFun = (id) => {
        this.state.count--
        this.state.array.splice(this.state.array.findIndex((x) => x.id === id), 1)
        this.setState({
            array: this.state.array
        })
        localStorage.setItem('array', JSON.stringify(this.state.array) || [])
        localStorage.setItem('count', JSON.stringify(this.state.count) || 0)
    }
    render() {
        return (
            <Fragment>
                <Container className='my-5'>
                    <Form className='border border-1 rounded-2 py-3' onSubmit={this.submiFunction}>
                        <h1 className='text-center'>Empolyee Form</h1>
                        <Row>
                            <Col xs={6} className='offset-3 border border-1 rounded-2 py-3'>
                                <Row>
                                    <Col xs={12}>
                                        <FormGroup floating  >
                                            <Input
                                                id="userName"
                                                name="userName"
                                                placeholder="User Name"
                                                type="text"
                                                value={this.state.obj.userName ? this.state.obj.userName : ''}
                                                onChange={this.inputChange}
                                            />
                                            <Label for="userName">
                                                User Name
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        <FormGroup floating>
                                            <Input
                                                id="email"
                                                name="email"
                                                placeholder="email"
                                                type="email"
                                                value={this.state.obj.email ? this.state.obj.email : ''}
                                                onChange={this.inputChange}
                                            />
                                            <Label for="email">
                                                Email
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup floating>
                                            <Input
                                                id="phoneno"
                                                name="phoneno"
                                                placeholder=" Phone No"
                                                type="number"
                                                value={this.state.obj.phoneno ? this.state.obj.phoneno : ''}
                                                onChange={this.inputChange}
                                            />
                                            <Label for="phoneno">
                                                Phone No
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup floating>
                                            <Input
                                                id="pincode"
                                                name="pincode"
                                                placeholder="Pin Code"
                                                type="number"
                                                value={this.state.obj.pincode ? this.state.obj.pincode : ''}
                                                onChange={this.inputChange}
                                            />
                                            <Label for="pincode">
                                                Pin Code
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8}>
                                        <Label for="hobbies">
                                            Hobbies
                                        </Label>
                                        <div>
                                            <Input
                                                id="programming"
                                                name="hobby"
                                                type="checkbox"
                                                onChange={this.inputChange}
                                                value='programming'
                                                checked={this.state.obj.hobby?.includes("programming") ? true : false}
                                            />
                                            <Label for="programming" className='px-2'>
                                                Programming
                                            </Label>
                                            <Input
                                                id="travelling"
                                                name="hobby"
                                                type="checkbox"
                                                onChange={this.inputChange}
                                                value="travelling"
                                                checked={this.state.obj.hobby?.includes("travelling") ? true : false}
                                            />
                                            <Label for="travelling" className='px-2'>
                                                Travelling
                                            </Label>
                                            <Input
                                                id="dancing"
                                                name="hobby"
                                                type="checkbox"
                                                onChange={this.inputChange}
                                                value="dancing"
                                                checked={this.state.obj.hobby?.includes("dancing") ? true : false}
                                            />
                                            <Label for="dancing" className='px-2'>
                                                Dancing
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <img src={this.state.obj.profile} alt="" style={{ width: "100%" }} />
                                    </Col>
                                    <Col xs={6}>
                                        <Label for="gender">
                                            Gender
                                        </Label>
                                        <div>
                                            <Input
                                                id="Male"
                                                name="gender"
                                                type="radio"
                                                value='Male'
                                                onChange={this.inputChange}
                                                checked={this.state.obj.gender === "Male"}
                                            />
                                            <Label for="Male" className='px-2'>
                                                Male
                                            </Label>
                                            <Input
                                                id="Female"
                                                name="gender"
                                                type="radio"
                                                value='Female'
                                                onChange={this.inputChange}
                                                checked={this.state.obj.gender === "Female"}
                                            />
                                            <Label for="Female" className='px-2'>
                                                Female
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <Label for="image" className='px-2'>
                                            Upload Image
                                        </Label>
                                        <input
                                            type='file'
                                            name='profile'
                                            id="image"
                                            onChange={this.inputChange}
                                            ref={this.state.FileRef}
                                        >
                                        </input>
                                    </Col>
                                    <Col className='text-center'>
                                        <Button>Submit</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Container>
                    <TableComponent array={this.state.array} deleteFun={this.deleteFun} editFun={this.editFun} />
                </Container>
            </Fragment >
        )
    }
}

export default FormComponent
