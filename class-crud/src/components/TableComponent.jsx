import React, { Component, Fragment } from 'react'
import { Table } from 'reactstrap'

class TableComponent extends Component {
    render() {
        return (
            <Fragment>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Profile</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Pin Code</th>
                            <th>Gender</th>
                            <th>Hobby</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.array?.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img src={x.profile} alt="" width={100} height={100} />
                                    </td>
                                    <td>{x.userName}</td>
                                    <td>{x.email}</td>
                                    <td>{x.phoneno}</td>
                                    <td>{x.pincode}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.hobby?.join(",")}</td>
                                    <td>
                                        <button className='me-2 px-2 text-white bg-warning fs-5' onClick={() => { this.props.editFun(x.id) }}>Edit</button>
                                        <button className='text-bg-danger px-2 fs-5'
                                            onClick={() => { this.props.deleteFun(x.id) }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}
export default TableComponent